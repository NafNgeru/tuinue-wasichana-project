from app.db import db

class Story(db.Model):
    __tablename__ = 'stories'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    beneficiary_name = db.Column(db.String(100), nullable = False)
    content = db.Column(db.Text, nullable=False)
    image = db.Column(db.String, nullable=True)

    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)
    charity = db.relationship('Charity', back_populates='stories')
