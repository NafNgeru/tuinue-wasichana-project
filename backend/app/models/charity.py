from datetime import datetime
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import User, Story, Beneficiary

class Charity(db.Model):
    __tablename__ = 'charities'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.String(500))
    website = db.Column(db.String(255))
    logo = db.Column(db.String(255))
    beneficiary_story = db.Column(db.String(500))
    application_status = db.Column(db.String(20), default='pending')  # pending, approved, rejected
    verified = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    user = db.relationship('User', backref='charity', uselist=False)

    def __repr__(self):
        return f'<Charity {self.name}>'


charity_bp = Blueprint('charity', __name__)


@charity_bp.route('/apply', methods=['POST'])
@jwt_required()
def apply_charity():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role != 'charity':
        return jsonify({'error': 'Only charity users can apply'}), 403

    data = request.get_json()

    charity = Charity.query.filter_by(user_id=user_id).first()
    if charity:
        charity.name = data.get('name')
        charity.description = data.get('description')
        charity.website = data.get('website')
        charity.application_status = 'pending'
    else:
        charity = Charity(
            user_id=user_id,
            name=data.get('name'),
            description=data.get('description'),
            website=data.get('website'),
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
        'name': charity.name,
        'description': charity.description,
        'logo': charity.logo,
        'website': charity.website,
        'verified': charity.verified
    }), 200


@charity_bp.route('/stories', methods=['POST'])
@jwt_required()
def create_story():
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
