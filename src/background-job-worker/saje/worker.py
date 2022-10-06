import asyncio
import logging
from multiprocessing import Queue
from os import environ, getpid

from sanic.log import logger, LOGGING_CONFIG_DEFAULTS
from .scheduler import Scheduler
from .backend import FileBackend

TIMEOUT = 3


def worker(saje_queue: Queue) -> None:
    logging.config.dictConfig(LOGGING_CONFIG_DEFAULTS)
    pid = getpid()
    worker_name = environ.get("SANIC_WORKER_NAME")
    logger.info("SAJE reporting for duty: %s [%s]", worker_name, pid)

    loop = asyncio.new_event_loop()
    backend = FileBackend("./db")
    scheduler = Scheduler(saje_queue, loop, backend)
    try:
        loop.create_task(scheduler.run())
        loop.run_forever()
    except KeyboardInterrupt:
        logger.info("Shutting down")
    finally:
        if scheduler.tasks:
            drain = asyncio.wait_for(
                asyncio.gather(*scheduler.tasks),
                timeout=TIMEOUT,
            )
            loop.run_until_complete(drain)
        logger.info("Stopping SAJE worker [%s]. Goodbye", pid)
