from .donor_routes import donor_bp
from .charity_routes import charity_bp
from .donation_routes import donation_bp
from .inventory_routes import inventory_bp
from .story_routes import story_bp
from .auth_routes import auth_bp
from .admin_routes import admin_bp

def register_routes(app):
    app.register_blueprint(donor_bp, url_prefix='/donors')
    app.register_blueprint(charity_bp, url_prefix='/charities')
    app.register_blueprint(donation_bp, url_prefix='/donations')
    app.register_blueprint(inventory_bp, url_prefix='/inventory')
    app.register_blueprint(story_bp, url_prefix='/stories')
    app.register_blueprint(auth_bp, url_prefix='/auth')
    app.register_blueprint(admin_bp, url_prefix='/admin')
