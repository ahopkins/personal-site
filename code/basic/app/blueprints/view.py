from sanic import Blueprint
from app.blueprints.info.view import bp as info_bp

bp = Blueprint.group(info_bp, version=1)
