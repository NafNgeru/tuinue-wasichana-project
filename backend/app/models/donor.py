from datetime import datetime
from app import db


class Donor(db.Model):
    __tablename__ = 'donors'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)  # Hashed password
    is_anonymous = db.Column(db.Boolean, default=False)  # Anonymous donations
    repeat_donation = db.Column(db.Boolean, default=False)  # Repeat donations
    donation_interval = db.Column(db.String(20), nullable=True)  # Frequency of donation: weekly, monthly, etc.
    reminder_set = db.Column(db.Boolean, default=False)  # Reminder for donation
    contact = db.Column(db.String(20), nullable=False)
    profile_pic = db.Column(db.String(20), nullable=True)

    charities_donated_to = db.relationship('Charity', secondary='donations', back_populates='donors', overlaps="donations,charity")
    donations = db.relationship('Donation', back_populates='donor', cascade='all, delete-orphan')
    user=db.relationship('User', back_populates='donor', uselist=False)
    # charity = db.relationship('Charity', back_populates='donors')
    
    def __repr__(self):
        return f'<Donor {self.full_name}, {self.email}>'

    def set_password(self, password):
        from flask_bcrypt import generate_password_hash
        self.password_hash = generate_password_hash(password).decode('utf-8')

    def check_password(self, password):
        from flask_bcrypt import check_password_hash
        return check_password_hash(self.password_hash, password)
    
    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'email': self.email,
            'donation_history': [
            {
                    'charity_name': d.charity.full_name,
                    'amount': d.amount,
                    'date': d.date.isoformat()
            }
            for d in self.donations
        ]
    }


