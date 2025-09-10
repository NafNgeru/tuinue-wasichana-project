from dotenv import load_dotenv
import os
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from .db import db
from .extensions import bcrypt, login_manager
from config import TestConfig

# Dynamically load the appropriate .env file based on the FLASK_ENV environment variable
env_file = '.env.test' if os.environ.get('FLASK_ENV') == 'testing' else '.env'
load_dotenv(dotenv_path=os.path.join(os.path.dirname(os.path.dirname(__file__)), env_file))

from .routes.story_routes import story_bp
from .routes.charity_routes import charity_bp
from .routes.donation_routes import donation_bp
from .routes.auth_routes import auth_bp
from .routes.donor_routes import donor_bp
from .routes.inventory_routes import inventory_bp
from .routes.beneficiary_routes import beneficiary_bp
from .routes.admin_routes import admin_bp


from .models import Donor, Donation, User, Charity, Story, Inventory

migrate = Migrate()

def create_app(config_class=None):
    app = Flask(__name__, static_folder='static', static_url_path='/static')

    
    if os.environ.get('FLASK_ENV') == 'testing':
        config_class = 'config.TestConfig'

    # Load configuration based on the environment
    if config_class:
        app.config.from_object(config_class)
    else:
        app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        app.secret_key = os.environ.get('SECRET_KEY', 'default_secret_key')
        app.config['ENV'] = 'development'
        app.config['DEBUG'] = True

    print("Using DB URI:", app.config['SQLALCHEMY_DATABASE_URI'])

    db.init_app(app)
    migrate.init_app(app, db)
    CORS(app)
    bcrypt.init_app(app)
    login_manager.login_view = 'auth.login'
    login_manager.init_app(app)

    @login_manager.user_loader
    def load_user(user_id):
        return User.query.get(int(user_id))

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(donor_bp, url_prefix='/donors')
    app.register_blueprint(donation_bp, url_prefix='/donations')
    app.register_blueprint(charity_bp, url_prefix='/charities')
    app.register_blueprint(admin_bp, url_prefix='/admin')
    app.register_blueprint(story_bp)
    app.register_blueprint(inventory_bp)
    app.register_blueprint(beneficiary_bp)

    @app.route('/')
    def index():
        return 'API is working!'

    return app

app = create_app()
