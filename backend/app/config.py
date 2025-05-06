import os


class Config:
    SECRET_KEY = os.getenv('SECRET_KEY', 'your-secret-key-here')
    SQLALCHEMY_DATABASE_URI = os.getenv(
        'DATABASE_URL', 'postgresql://hydan:hydan@localhost:5432/hydan'
    )
    SQLALCHEMY_TRACK_MODIFICATIONS = False
