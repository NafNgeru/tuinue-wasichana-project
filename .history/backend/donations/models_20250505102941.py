from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Donation(db.Model):
    __tablename__ = "donations"

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    frequency = db.Column(db.String(20), nullable=False)
    anonymous = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "amount": self.amount,
            "frequency": self.frequency,
            "anonymous": self.anonymous,
        }
