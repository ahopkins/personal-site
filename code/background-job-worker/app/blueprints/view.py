from sanic import Blueprint
from app.blueprints.info.view import bp as info_bp
from app.blueprints.job.view import bp as job_bp

bp = Blueprint.group(info_bp, job_bp, version=1)
