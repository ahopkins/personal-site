from multiprocessing import Manager
from sanic import Sanic
from saje.worker import worker
from .backend import FileBackend
from .client import SajeClient


def create_saje(app: Sanic) -> None:
    @app.main_process_start
    async def start(app: Sanic):
        manager = Manager()
        app.shared_ctx.saje_queue = manager.Queue()

    @app.main_process_ready
    async def ready(app: Sanic):
        app.manager.manage(
            "SajeWorker",
            worker,
            {"saje_queue": app.shared_ctx.saje_queue},
            True,
        )

    @app.after_server_start
    async def setup_saje(app: Sanic):
        app.ext.dependency(SajeClient(app.shared_ctx.saje_queue))
        app.ext.dependency(FileBackend("./db"))
