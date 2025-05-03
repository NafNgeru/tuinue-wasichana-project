# __init__.py

from flask import Flask
from .db import db
from flask_cors import CORS
from flask_migrate import Migrate
from .extensions import bcrypt
from .config import Config


from .routes.story_routes import story_bp
from .routes.charity_routes import charity_bp
from .routes.donation_routes import donation_bp
from .routes.auth_routes import auth_bp


migrate = Migrate()


def create_app():
    app = Flask(__name__, static_folder='static', static_url_path='')

    app.config.from_object(Config)

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)

    bcrypt.init_app(app)

    # Register blueprints with /api prefix
    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(donation_bp, url_prefix='/api/donations')
    app.register_blueprint(charity_bp, url_prefix='/api/charities')
    app.register_blueprint(story_bp, url_prefix='/api/stories')

    @app.route('/')
    def index():
        return 'API is working!'

    return app
