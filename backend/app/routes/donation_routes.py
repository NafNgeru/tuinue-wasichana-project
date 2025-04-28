from flask import Blueprint, request, jsonify
from app.models.donation import Donation
from app import db


donation_bp = Blueprint('donation', __name__, url_prefix='/api/donations')


@donation_bp.route('/', methods=['GET'])
def get_donations():
    donations = Donation.query.all()
    return jsonify([donation.to_dict() for donation in donations]), 200


@donation_bp.route('/<int:donation_id>', methods=['GET'])
def get_donation(donation_id):
    donation = Donation.query.get_or_404(donation_id)
    return jsonify(donation.to_dict()), 200


@donation_bp.route('/', methods=['POST'])
def create_donation():
    data = request.get_json()
    donation = Donation(
        donor_id=data.get('donor_id'),
        charity_id=data.get('charity_id'),
        amount=data.get('amount'),
        date=data.get('date'),
        # Add other fields as needed
    )
    db.session.add(donation)
    db.session.commit()
    return jsonify(donation.to_dict()), 201


@donation_bp.route('/<int:donation_id>', methods=['PUT'])
def update_donation(donation_id):
    donation = Donation.query.get_or_404(donation_id)
    data = request.get_json()
    donation.donor_id = data.get('donor_id', donation.donor_id)
    donation.charity_id = data.get('charity_id', donation.charity_id)
    donation.amount = data.get('amount', donation.amount)
    donation.date = data.get('date', donation.date)
    # Update other fields as needed
    db.session.commit()
    return jsonify(donation.to_dict()), 200


@donation_bp.route('/<int:donation_id>', methods=['DELETE'])
def delete_donation(donation_id):
    donation = Donation.query.get_or_404(donation_id)
    db.session.delete(donation)
    db.session.commit()
    return jsonify({'message': 'Donation deleted'}), 200
