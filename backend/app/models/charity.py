from app.db import db


class Charity(db.Model):
    __tablename__ = 'charities'

    id = db.Column(db.Integer, primary_key = True)
    full_name =  db.Column(db.String(150), nullable=False)
    contact = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String(150))
    description = db.Column(db.Text)
    website_url = db.Column(db.String, nullable = True)
    image = db.Column(db.String)
    approved = db.Column(db.Boolean, default=False)

    donations = db.relationship('Donation', back_populates='charity', cascade="all, delete-orphan")
    stories = db.relationship('Story', back_populates = 'charity', cascade="all, delete-orphan")
    inventory = db.relationship('Inventory', back_populates = 'charity', cascade="all, delete-orphan")


    def __repr__(self):
        return f'<Charity {self.full_name}>'


