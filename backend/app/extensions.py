from flask_bcrypt import Bcrypt
from flask_login import LoginManager

bcrypt = Bcrypt()
login_manager = LoginManager()
login_manager.login_view = 'auth.login'  # Optional: Set the default login view for Flask-Login