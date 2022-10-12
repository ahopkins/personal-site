from uuid import UUID, uuid4
from sanic import Blueprint, Request, HTTPResponse, json, text
from saje.client import SajeClient
from saje.backend import FileBackend

bp = Blueprint("Job", url_prefix="/job")


@bp.get("/<uid:uuid>")
async def handler(
    request: Request, uid: UUID, file_backend: FileBackend
) -> HTTPResponse:
    data = await file_backend.fetch(uid)
    return json(data)


@bp.post("/")
async def start_job(request: Request, saje: SajeClient) -> HTTPResponse:
    uid = str(uuid4())
    saje.send(
        {
            "task": "hello",
            "uid": uid,
            "kwargs": {"name": "Adam"},
        }
    )
    return text(uid)
