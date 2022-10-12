from multiprocessing import Queue
from typing import Any
import ujson


class SajeClient:
    def __init__(self, queue: Queue) -> None:
        self.queue = queue

    def send(self, job_definition: dict[str, Any] | str) -> None:
        if not isinstance(job_definition, str):
            message = ujson.dumps(job_definition)
        self.queue.put_nowait(message)
