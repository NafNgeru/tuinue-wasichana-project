from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Donation(db.Model):
    __tablename__ = 'donations'

    id = db.Column(db.Integer, primary_key=True)
    amount = db.Column(db.Float, nullable=False)
    anonymous = db.Column(db.Boolean, nullable=False)
    frequency = db.Column(db.String(20), nullable=False)

    def __repr__(self):
        return f"<Donation id={self.id}, amount={self.amount}, frequency={self.frequency}, anonymous={self.anonymous}>"
