# __init__.py
from flask import Flask
from .db import db
from .routes.story_routes import story_bp
from .routes.charity_routes import charity_bp
from flask_cors import CORS
from flask_migrate import Migrate

migrate = Migrate()

def create_app(config_class=Config):
    app = Flask(__name__)

    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.secret_key = os.environ.get('SECRET_KEY', 'default_secret_key')

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    blueprints = [charity_bp, story_bp]
    for bp in blueprints:
        app.register_blueprint(bp)

    return app
