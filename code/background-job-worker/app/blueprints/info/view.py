from sanic import Blueprint, Request, HTTPResponse, json, __version__

bp = Blueprint("Info", url_prefix="/info")


@bp.get("")
async def info(request: Request) -> HTTPResponse:
    return json({"sanic_version": __version__})
