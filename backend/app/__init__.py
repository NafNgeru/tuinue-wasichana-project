# __init__.py


import os

from flask import Flask
from .db import db
from .routes.story_routes import story_bp
from .routes.charity_routes import charity_bp
from flask_cors import CORS
from flask_migrate import Migrate

migrate = Migrate()

def create_app():
    app = Flask(__name__, static_folder='static', static_url_path='')

    app.config[
        'SQLALCHEMY_DATABASE_URI'
    ] = os.environ.get('DATABASE_URL') or 'sqlite:///tuinue_wasichana.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.secret_key = os.environ.get('SECRET_KEY', 'default_secret_key')

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    blueprints = [charity_bp, story_bp]
    for bp in blueprints:
        app.register_blueprint(bp)

    @app.route('/', defaults={'path': ''})
    @app.route('/<path:path>')
    def serve_frontend(path):
        if path != "" and (app.static_folder / path).exists():
            return app.send_static_file(path)
        else:
            return app.send_static_file('index.html')

    return app
