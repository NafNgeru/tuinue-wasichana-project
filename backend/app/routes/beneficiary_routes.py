from flask import Blueprint, request, jsonify
from app.models import Beneficiary
from app.db import db

beneficiary_bp = Blueprint('beneficiary_routes', __name__)

@beneficiary_bp.route('/charities/<int:charity_id>/beneficiaries', methods=['GET'])
def get_beneficiaries(charity_id):
    beneficiaries = Beneficiary.query.filter_by(charity_id=charity_id).all()
    return jsonify([b.serialize() for b in beneficiaries]), 200

@beneficiary_bp.route('/charities/<int:charity_id>/beneficiaries', methods=['POST'])
def add_beneficiary(charity_id):
    data = request.get_json()
    new_beneficiary = Beneficiary(
        name=data['name'],
        location=data['location'],
        number_of_people=data.get('number_of_people'),
        charity_id=charity_id
    )
    db.session.add(new_beneficiary)
    db.session.commit()
    return jsonify({'message': 'Beneficiary added successfully'}), 201

@beneficiary_bp.route('/charities/<int:charity_id>/beneficiaries/<int:beneficiary_id>', methods=['DELETE'])
def delete_beneficiary(charity_id, beneficiary_id):
    beneficiary = Beneficiary.query.filter_by(id=beneficiary_id, charity_id=charity_id).first()
    if not beneficiary:
        return jsonify({'error': 'Beneficiary not found'}), 404

    db.session.delete(beneficiary)
    db.session.commit()
    return jsonify({'message': 'Beneficiary deleted'}), 200

@beneficiary_bp.route('/charities/<int:charity_id>/beneficiaries/<int:beneficiary_id>', methods=['PUT'])
def update_beneficiary(charity_id, beneficiary_id):
    beneficiary = Beneficiary.query.filter_by(id=beneficiary_id, charity_id=charity_id).first()
    if not beneficiary:
        return jsonify({'error': 'Beneficiary not found'}), 404

    data = request.get_json()
    beneficiary.name = data.get('name', beneficiary.name)
    beneficiary.location = data.get('location', beneficiary.location)
    beneficiary.number_of_people = data.get('number_of_people', beneficiary.number_of_people)

    db.session.commit()
    return jsonify({'message': 'Beneficiary updated'}), 200