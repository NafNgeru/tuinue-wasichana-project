from flask import Flask
from .db import db
from .routes.inventory_routes import inventory_bp

def create_app():
    app = Flask(__name__)

    # Setup config, database, and CORS (if needed)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/your_db_name'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    # Register the donor routes
    app.register_blueprint(inventory_bp)

    return app
