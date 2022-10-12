from sanic import Sanic
from app.blueprints.view import bp
from saje.creator import create_saje


def create_app() -> Sanic:
    app = Sanic(__name__)
    app.blueprint(bp)
    create_saje(app)
    return app
