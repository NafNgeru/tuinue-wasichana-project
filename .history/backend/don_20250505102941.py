from flask import Flask
from flask_cors import CORS
from donations.models import db
from donations.routes import donations_bp

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///your_database.db'  # Or PostgreSQL URI
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
CORS(app)

# Register the donations blueprint
app.register_blueprint(donations_bp)

@app.route("/")
def index():
    return {"message": "Tuinue WasichanaCCI API is running"}

if __name__ == "__main__":
    app.run(debug=True)
