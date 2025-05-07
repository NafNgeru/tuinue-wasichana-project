from flask import Flask
from flask_cors import CORS
from donations.models import db
from donations.routes import donations_bp

app = Flask(__name__)

# PostgreSQL connection configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:%40kiplaa8018@localhost:5432/tuinue_donations'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db.init_app(app)
CORS(app)

# Register donation blueprint
app.register_blueprint(donations_bp)

# Root route
@app.route("/")
def index():
    return {"message": "Tuinue WasichanaCCI API is running"}

# Run the server
if __name__ == "__main__":
    app.run(debug=True)
