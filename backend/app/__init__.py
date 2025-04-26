from flask import Flask
from .db import db
from .routes.inventory_routes import inventory_bp

def create_app():
    app = Flask(__name__)

    # Database configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/your_db_name'  # <-- Replace 'your_db_name' with your real database name
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Security key for session management
    app.secret_key = 'your_secret_key'  # <-- Replace 'your_secret_key' with a strong secret key in production

    # Initialize extensions
    db.init_app(app)

    # Register blueprints (routes)
    app.register_blueprint(donor_bp)
    # Register the donor routes
    app.register_blueprint(inventory_bp)

    return app
