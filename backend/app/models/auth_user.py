from datetime import datetime
from flask_login import UserMixin
from flask_bcrypt import Bcrypt
from app.db import db
from itsdangerous import URLSafeTimedSerializer as Serializer
from flask import current_app
from flask_login import UserMixin 
from app import db

bcrypt = Bcrypt()

class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False, unique=True)
    password = db.Column(db.String(200), nullable=False)
    is_admin = db.Column(db.Boolean, default=False)
    role=db.Column(db.String(200), nullable=False, default="donor")
    contact=db.Column(db.String(200), nullable=True)  
    full_name = db.Column(db.String(100), nullable=True)

    donor=db.relationship("Donor", back_populates="user", uselist=False, cascade="all, delete-orphan", single_parent=True)
    charity=db.relationship("Charity", back_populates="user", uselist=False, cascade="all, delete-orphan", single_parent=True)

    def __repr__(self):
        return f'<User {self.username}>'

    def get_reset_token(self, expires_sec=1800):
        s = Serializer(current_app.config['SECRET_KEY'], expires_sec)
        return s.dumps({'user_id': self.id}).decode('utf-8')

    @staticmethod
    def verify_reset_token(token):
        s = Serializer('SECRET_KEY')
        try:
            data = s.loads(token, max_age=3600, salt='reset-password')
            user_id = data['user_id']
        except Exception:
            return None
        return User.query.get(user_id)