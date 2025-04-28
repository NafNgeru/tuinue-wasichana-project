from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_login import LoginManager
from flask_jwt_extended import JWTManager
from config import Config

# Create extensions
db = SQLAlchemy()
migrate = Migrate()
login_manager = LoginManager()
jwt = JWTManager()

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    # Initialize extensions
    db.init_app(app)
    migrate.init_app(app, db)
    login_manager.init_app(app)
    jwt.init_app(app)

    # Import models here so Alembic sees them during migrations
    from app.models import Donor, Charity, Donation, Inventory, Story, User

    # Register blueprints
    from app.routes.auth_routes import auth_bp
    from app.routes.charity_routes import charity_bp
    from app.routes.donation_routes import donation_bp
    from app.routes.admin_routes import admin_bp

    app.register_blueprint(auth_bp, url_prefix='/api/auth')
    app.register_blueprint(charity_bp, url_prefix='/api/charities')
    app.register_blueprint(donation_bp, url_prefix='/api/donations')
    app.register_blueprint(admin_bp, url_prefix='/api/admin')

    return app
