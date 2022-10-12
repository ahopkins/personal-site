from sanic import Sanic
from app.blueprints.view import bp


def create_app() -> Sanic:
    app = Sanic(__name__)
    app.blueprint(bp)
    return app
