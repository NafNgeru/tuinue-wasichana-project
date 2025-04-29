from app.db import db
from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity


class Charity(db.Model):
    __tablename__ = 'charities'  

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)  # Change 'users' to 'user'
    full_name = db.Column(db.String(150), nullable=False)
    contact = db.Column(db.String(20), nullable=False)
    email = db.Column(db.String, nullable=False)
    password = db.Column(db.String(150))
    description = db.Column(db.Text)
    website_url = db.Column(db.String, nullable=True)
    image = db.Column(db.String)
    approved = db.Column(db.Boolean, default=False)
    beneficiary_story = db.Column(db.String(500), nullable=True)
    application_status = db.Column(db.String(20), default='pending')
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref='charity', uselist=False)

    donations = db.relationship('Donation', back_populates='charity', cascade="all, delete-orphan")
    stories = db.relationship('Story', back_populates='charity', cascade="all, delete-orphan")
    inventory = db.relationship('Inventory', back_populates='charity', cascade="all, delete-orphan")

    def __repr__(self):
        return f'<Charity {self.full_name}>' 


charity_bp = Blueprint('charity', __name__)  



@charity_bp.route('/apply', methods=['POST'])
@jwt_required()
def apply_charity():
    from app.models import User 
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role != 'charity':
        return jsonify({'error': 'Only charity users can apply'}), 403

    data = request.get_json()

    charity = Charity.query.filter_by(user_id=user_id).first()
    if charity:
        charity.full_name = data.get('full_name')  
        charity.description = data.get('description')
        charity.website_url = data.get('website_url')  
        charity.application_status = 'pending'
    else:
        charity = Charity(
            user_id=user_id,
            full_name=data.get('full_name'),
            contact=data.get('contact'),
            email=data.get('email'),
            password=data.get('password'),
            description=data.get('description'),
            website_url=data.get('website_url'),
            application_status='pending'
        )
        db.session.add(charity)

    db.session.commit()

    return jsonify({'message': 'Charity application submitted successfully'}), 200


@charity_bp.route('/<int:charity_id>', methods=['GET'])
def get_charity(charity_id):
    charity = Charity.query.get_or_404(charity_id)

    return jsonify({
        'id': charity.id,
        'full_name': charity.full_name,
        'description': charity.description,
        'image': charity.image,
        'website_url': charity.website_url,
        'approved': charity.approved
    }), 200


@charity_bp.route('/stories', methods=['POST'])
@jwt_required()
def create_story():
    from app.models import User, Story 
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role != 'charity':
        return jsonify({'error': 'Only charities can create stories'}), 403

    charity = Charity.query.filter_by(user_id=user_id).first()

    data = request.get_json()

    story = Story(
        charity_id=charity.id,
        title=data.get('title'),
        content=data.get('content')
    )

    db.session.add(story)
    db.session.commit()

    return jsonify({'message': 'Story created successfully'}), 201


@charity_bp.route('/beneficiaries', methods=['POST'])
@jwt_required()
def add_beneficiary():
    from app.models import User, Beneficiary  # ✅ import inside the route
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role != 'charity':
        return jsonify({'error': 'Only charities can add beneficiaries'}), 403

    charity = Charity.query.filter_by(user_id=user_id).first()

    data = request.get_json()

    beneficiary = Beneficiary(
        charity_id=charity.id,
        name=data.get('name'),
        location=data.get('location'),
        items_received=data.get('items_received')
    )

    db.session.add(beneficiary)
    db.session.commit()

    return jsonify({'message': 'Beneficiary added successfully'}), 201
