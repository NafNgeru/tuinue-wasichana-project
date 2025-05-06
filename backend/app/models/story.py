from app.db import db
from datetime import datetime


class Story(db.Model):
    __tablename__ = 'stories'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(150), nullable=False)
    beneficiary_name = db.Column(db.String(100), nullable = True)
    content = db.Column(db.Text, nullable=False)
    image = db.Column(db.String, nullable=True)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'))
    charity = db.relationship('Charity', back_populates='stories')

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "beneficiary_name": self.beneficiary_name,
            "content": self.content,
            "image": self.image,
            "charity_id": self.charity_id, 
            "created_at": self.created_at.isoformat() if self.created_at else None
        }
