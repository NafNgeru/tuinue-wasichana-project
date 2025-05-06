import os

class Config:
    SQLALCHEMY_DATABASE_URI = 'postgresql://hydan:hydan@localhost:5432/postgres'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
