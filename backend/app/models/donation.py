from datetime import datetime
from app import db

class Donation(db.Model):
    __tablename__ = 'donations'

    id = db.Column(db.Integer, primary_key=True)
    donor_id = db.Column(db.Integer, db.ForeignKey('donors.id'), nullable=True)
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    date = db.Column(db.DateTime, default=datetime.utcnow)
    anonymous = db.Column(db.Boolean, default=False)
    repeat_donation = db.Column(db.Boolean, default=False)
    reminder_set = db.Column(db.Boolean, default=False)
    frequency = db.Column(db.String(20), nullable=False)

    #relationship links
    donor = db.relationship("Donor", back_populates="donations", overlaps="charities_donated_to")
    charity = db.relationship("Charity", back_populates="donations", overlaps="donors")

    def to_dict(self):
        return {
            'id': self.id,
            'donor_id': self.donor_id,
            'charity_id': self.charity_id,
            'amount': self.amount,
            'date': self.date.isoformat() if self.date else None,
            'frequency': self.frequency,
            'donor_name': self.donor.full_name if self.donor and not self.anonymous else 'Anonymous'
        }
    
    def __repr__(self):
        return f"<Donation id={self.id}, amount={self.amount}, frequency={self.frequency}, anonymous={self.anonymous}>"

    def __repr__(self):
        charity_name = self.charity.full_name if self.charity else 'Unknown Charity'
        return f'<Donation {self.amount} to {charity_name}>'








