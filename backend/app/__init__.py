# __init__.py
from dotenv import load_dotenv
load_dotenv()

import os
from dotenv import load_dotenv
from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate
from .db import db
from .extensions import bcrypt, login_manager

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))


from .routes.story_routes import story_bp
from .routes.charity_routes import charity_bp
from .routes.donation_routes import donation_bp
from .routes.auth_routes import auth_bp
from .routes.donor_routes import donor_bp
from .routes.inventory_routes import inventory_bp
from .routes.beneficiary_routes import beneficiary_bp

from .models import Donor, Donation, User, Charity, Story, Inventory

migrate = Migrate()

def create_app():
    app = Flask(__name__, static_folder='static', static_url_path='')

    # Configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL')
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.secret_key = os.environ.get('SECRET_KEY', 'default_secret_key')

    print("Using DB URI:", app.config['SQLALCHEMY_DATABASE_URI'])


    app.config['ENV']   = 'development'
    app.config['DEBUG'] = True
    # app.config["JWT_TOKEN_LOCATION"] = ["headers"]
    # app.config["JWT_SECRET_KEY"] = "tuinue-secret-key"

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
    app.register_blueprint(donation_bp)
    app.register_blueprint(charity_bp, url_prefix='/charities')
    app.register_blueprint(story_bp)
    app.register_blueprint(inventory_bp)
    app.register_blueprint(beneficiary_bp)

    for rule in app.url_map.iter_rules():
        print(rule)

    @app.route('/')
    def index():
        return 'API is working!'

    return app

app = create_app()
