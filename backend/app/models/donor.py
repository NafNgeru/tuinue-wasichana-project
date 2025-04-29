from datetime import datetime
from ..db import db


class Donor(db.Model):
    __tablename__ = 'donors'

    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)  # Hashed password
    is_anonymous = db.Column(db.Boolean, default=False)  # Anonymous donations
    repeat_donation = db.Column(db.Boolean, default=False)  # Repeat donations
    donation_interval = db.Column(db.String(20), nullable=True)  # Frequency of donation: weekly, monthly, etc.
    reminder_set = db.Column(db.Boolean, default=False)  # Reminder for donation
    charities_donated_to = db.relationship('Charity', secondary='donations', backref='donors')

    def __repr__(self):
        return f'<Donor {self.full_name}, {self.email}>'

    def set_password(self, password):
        from flask_bcrypt import generate_password_hash
        self.password_hash = generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        from flask_bcrypt import check_password_hash
        return check_password_hash(self.password_hash, password)


