from app.db import db


class Inventory(db.Model):
    __tablename__ = 'inventory'

    id = db.Column(db.Integer, primary_key=True)
    item_name = db.Column(db.String(100), nullable=False) 
    quantity = db.Column(db.Integer, nullable=False)  
    beneficiary_name = db.Column(db.String(100), nullable=True)


    beneficiary_id=db.Column(db.Integer, db.ForeignKey('beneficiary.id'), nullable=False)
    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)
    
    charity = db.relationship('Charity', back_populates='inventory')
    beneficiary = db.relationship('Beneficiary', back_populates='inventory')



    def serialize(self):
        return {
            'id': self.id,
            'charity_id': self.charity_id,
            'beneficiary': self.beneficiary.name if self.beneficiary else None,
            'item_name': self.item_name,
            'quantity': self.quantity
        }
