from app import create_app
from app.db import db
from flask_migrate import Migrate

app = create_app()

if __name__ == '__main__':
    app.run(debug=True)
