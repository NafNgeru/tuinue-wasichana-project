from app.db import db

class Inventory(db.Model):
    __tablename__ = 'inventory'

    id = db.Column(db.Integer, primary_key = True)
    item_name = db.Column(db.String(100), nullable = False) 
    quantity = db.Column(db.String(100), nullable = False)
    beneficiary_name = db.Column(db.String(100), nullable = True)

    charity_id = db.Column(db.Integer, db.ForeignKey('charities.id'), nullable=False)
    charity = db.relationship('Charity', back_populates = 'inventory')

