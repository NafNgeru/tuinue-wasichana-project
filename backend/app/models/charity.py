from app.db import db
from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity


class Charity(db.Model):
    __tablename__ = 'charities'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    full_name = db.Column(db.String(150), nullable=False)
    contact = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)
    description = db.Column(db.Text, nullable=True)
    website_url = db.Column(db.String, nullable=True)
    image = db.Column(db.String, nullable=True)
    approved = db.Column(db.Boolean, default=False)
    beneficiary_story = db.Column(db.String(500), nullable=True)
    application_status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', back_populates='charity', uselist=False)
    donations = db.relationship('Donation', back_populates='charity', cascade='all, delete-orphan')
    stories = db.relationship('Story', back_populates='charity', cascade="all, delete-orphan")
    inventory = db.relationship('Inventory', back_populates='charity', cascade="all, delete-orphan")
    donors = db.relationship('Donor', secondary='donations', back_populates='charities_donated_to', overlaps="donations,donor")
    beneficiaries = db.relationship("Beneficiary", back_populates="charity")



    def __repr__(self):
        return f'<Charity {self.full_name}>'
    
    def to_dict(self):
        return {
            'id': self.id,
            'full_name': self.full_name,
            'description': self.description,
            'email': self.email,
            'website_url': self.website_url,
            'image': self.image,
            'total_donations': sum(d.amount for d in self.donations),
            'approved': self.approved,
            'application_status': self.application_status
        }