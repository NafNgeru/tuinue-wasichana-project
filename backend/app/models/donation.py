from datetime import datetime
from ..db import db

# Define the Donation table
class Donation(db.Model):
    __tablename__ = 'donations'  # Set the table name in the database

    # Columns for the Donation table
    id = db.Column(db.Integer, primary_key=True)  # Unique ID for each donation
    donor_id = db.Column(db.Integer, db.ForeignKey('donors.id'), nullable=False)  # Link to the donor who made the donation
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)  # Link to the charity receiving the donation
    amount = db.Column(db.Float, nullable=False)  # Amount of money donated
    date = db.Column(db.DateTime, default=datetime.utcnow)  # Date and time of donation (default is now)
    anonymous = db.Column(db.Boolean, default=False)  # Whether the donor chose to stay anonymous
    repeat_donation = db.Column(db.Boolean, default=False)  # Whether this donation should repeat automatically
    reminder_set = db.Column(db.Boolean, default=False)  # Whether a reminder is set for the donation

    # Relationships
    donor = db.relationship('Donor', backref='donations')  # Relationship to the Donor model
    charity = db.relationship('Charity', backref='donations')  # Relationship to the Charity model

    # String representation of a Donation object
    def __repr__(self):
        return f'<Donation {self.amount} to {self.charity.name}>'
