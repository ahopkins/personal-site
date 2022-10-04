from sanic import Sanic, response
from asyncio.subprocess import create_subprocess_shell, PIPE
from pathlib import Path
from sanic.log import logger
import ujson

app = Sanic("MainApp")
app.config.FRONTEND_DIR = Path(__file__).parent
app.config.AUTO_EXTEND = False

livereload = Sanic("livereload")
livereload.static("/livereload.js", app.config.FRONTEND_DIR / "livereload.js")
livereload.config.AUTO_EXTEND = False

SRC_DIR = app.config.FRONTEND_DIR / "src"
INDEX_HTML = app.config.FRONTEND_DIR / "public" / "index.html"
HELLO = {
    "command": "hello",
    "protocols": [
        "http://livereload.com/protocols/official-7",
    ],
    "serverName": app.name,
}
RELOAD = {"command": "reload", "path": str(INDEX_HTML)}

app.static("/", app.config.FRONTEND_DIR / "public")


@app.get("/")
async def index(_):
    return await response.file(INDEX_HTML)


@app.signal("watchdog.file.reload")
async def file_reloaded():
    print("...")


@app.before_server_start
async def check_reloads(app, _):
    do_rebuild = False
    if reloaded := app.config.get("RELOADED_FILES"):
        reloaded = reloaded.split(",")

        do_rebuild = any(
            ext in ("svelte", "js")
            for filename in reloaded
            if (ext := filename.rsplit(".", 1)[-1])
        )

    print(f">>>> {do_rebuild=}")
    if do_rebuild:
        rebuild = await create_subprocess_shell(
            "yarn run build",
            stdout=PIPE,
            stderr=PIPE,
            cwd=app.config.FRONTEND_DIR,
        )

        while True:
            message = await rebuild.stdout.readline()
            if not message:
                break
            output = message.decode("ascii").rstrip()
            logger.info(f"[reload] {output}")

        await app.dispatch("watchdog.file.reload")


@livereload.websocket("/livereload")
async def livereload_handler(request, ws):
    global app
    logger.info("Connected")
    msg = await ws.recv()
    logger.info(msg)
    await ws.send(ujson.dumps(HELLO))

    while True:
        await app.event("watchdog.file.reload")
        await ws.send(ujson.dumps(RELOAD))


@app.before_server_start
async def start(app, _):
    app.ctx.livereload_server = await livereload.create_server(
        port=35729, return_asyncio_server=True
    )
    app.add_task(runner(livereload, app.ctx.livereload_server))


async def runner(app, app_server):
    try:
        app.signalize()
        app.finalize()
        app.state.is_started = True
        await app_server.serve_forever()
    finally:
        app.state.is_started = False


@app.before_server_stop
async def stop(app, _):
    await app.ctx.livereload_server.close()


if __name__ == "__main__":
    app.prepare(port=8080, dev=True, reload_dir=[SRC_DIR])
    Sanic.serve()
