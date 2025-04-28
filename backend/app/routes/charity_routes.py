from flask import Blueprint, request, jsonify
from app.models.charity import Charity
from app import db

charity_bp = Blueprint('charity', __name__, url_prefix='/api/charities')

@charity_bp.route('/', methods=['GET'])
def get_charities():
    charities = Charity.query.all()
    return jsonify([charity.to_dict() for charity in charities]), 200

@charity_bp.route('/<int:charity_id>', methods=['GET'])
def get_charity(charity_id):
    charity = Charity.query.get_or_404(charity_id)
    return jsonify(charity.to_dict()), 200

@charity_bp.route('/', methods=['POST'])
def create_charity():
    data = request.get_json()
    charity = Charity(
        name=data.get('name'),
        description=data.get('description'),
        email=data.get('email'),
        # Add other fields as needed
    )
    db.session.add(charity)
    db.session.commit()
    return jsonify(charity.to_dict()), 201

@charity_bp.route('/<int:charity_id>', methods=['PUT'])
def update_charity(charity_id):
    charity = Charity.query.get_or_404(charity_id)
    data = request.get_json()
    charity.name = data.get('name', charity.name)
    charity.description = data.get('description', charity.description)
    charity.email = data.get('email', charity.email)
    # Update other fields as needed
    db.session.commit()
    return jsonify(charity.to_dict()), 200

@charity_bp.route('/<int:charity_id>', methods=['DELETE'])
def delete_charity(charity_id):
    charity = Charity.query.get_or_404(charity_id)
    db.session.delete(charity)
    db.session.commit()
    return jsonify({'message': 'Charity deleted'}), 200
