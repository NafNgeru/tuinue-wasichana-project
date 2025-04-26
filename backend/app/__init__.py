from flask import Flask
from .db import db
from .routes.donor_routes import donor_bp

def create_app():
    app = Flask(__name__)

    # Setup config, database, and CORS (if needed)
    app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://localhost/your_db_name'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.secret_key = 'your_secret_key'

    db.init_app(app)

    # Register the donor routes
    app.register_blueprint(donor_bp)

    return app
