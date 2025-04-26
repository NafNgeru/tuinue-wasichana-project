from flask import Flask
from .db import db
from .routes.story_routes import story_bp
from .routes.charity_routes import charity_bp
from flask_cors import CORS
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

    app.register_blueprint(charity_bp)
    app.register_blueprint(story_bp)


    with app.app_context():
        db.create_all()
    # Register blueprints (routes)
    app.register_blueprint(donor_bp)
    # Register the donor routes
    app.register_blueprint(inventory_bp)

    return app
