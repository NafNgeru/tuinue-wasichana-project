from datetime import datetime
from ..db import db

class Donation(db.Model):
    __tablename__ = 'donations'

    id = db.Column(db.Integer, primary_key=True)
    donor_id = db.Column(db.Integer, db.ForeignKey('donors.id'),nullable=False)
    charity_id = db.column(db.integer, db.foreignKey('charities.id'), nullable=False)
    donor_id = db.Column(db.Integer, db.ForeignKey('donors.id'), nullable=False)
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    anonymous = db.Column(db.Boolean, default=False)
    repeat_donation = db.Column(db.Boolean, default=False)
    reminder_set = db.Column(db.Boolean, default=False)

    donor = db.relationship('Donor', backref='donations')
    charity = db.relationship('Charity', backref='donations')

    def __repr__(self):
        return f'<Donation {self.amount} to {self.charity.name}>'