from app.db import db

class Beneficiary(db.Model):
    __tablename__ = 'beneficiary'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    number_of_people = db.Column(db.Integer, nullable=True)
    location = db.Column(db.String(150), nullable=False)
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)

    charity = db.relationship('Charity', back_populates='beneficiaries')
    inventory = db.relationship('Inventory', back_populates='beneficiary', cascade="all, delete") 


    def serialize(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'number_of_people': self.number_of_people,
            'charity_id': self.charity_id
        }
