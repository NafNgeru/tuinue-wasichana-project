from flask import Blueprint, request, jsonify
from app.models import Donation, Donor, Charity
from app import db

donation_bp = Blueprint('donation_bp', __name__)



@donation_bp.route('/donor/<int:donor_id>/donations', methods=['GET'])
def get_donations_by_donor(donor_id):
    donations = Donation.query.filter_by(donor_id=donor_id).all()
    
    if donations:
        return jsonify([donation.to_dict() for donation in donations]), 200
    else:
        return jsonify([]), 200 

@donation_bp.route('/', methods=['GET'])
def get_all_donations():
    donations = Donation.query.all()
    return jsonify([donation.to_dict() for donation in donations]), 200


@donation_bp.route('/<int:charity_id>', methods=['GET'])
def get_donation(charity_id):
    donations = Donation.query.filter_by(charity_id=charity_id).all()
    if not donations:
        return jsonify({'error': 'Donation not found'}), 404
    return jsonify([donation.to_dict() for donation in donations]), 200




@donation_bp.route('/<int:id>', methods=['PUT'])
def update_donation(id):
    donation = Donation.query.get(id)
    if not donation:
        return jsonify({'error': 'Donation not found'}), 404

    data = request.get_json()
    donation.amount = data.get('amount', donation.amount)
    donation.anonymous = data.get('anonymous', donation.anonymous)
    donation.repeat_donation = data.get('repeat_donation', donation.repeat_donation)
    donation.reminder_set = data.get('reminder_set', donation.reminder_set)

    db.session.commit()
    return jsonify(donation.to_dict()), 200


# DELETE a donation
@donation_bp.route('/<int:id>', methods=['DELETE'])
def delete_donation(id):
    donation = Donation.query.get(id)
    if not donation:
        return jsonify({'error': 'Donation not found'}), 404

    db.session.delete(donation)
    db.session.commit()
    return jsonify({'message': 'Donation deleted successfully'}), 200

