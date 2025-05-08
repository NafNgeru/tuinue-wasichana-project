from flask import Blueprint, request, jsonify
from app.models import Donation, Donor, Charity
from app import db

donation_bp = Blueprint('donation_bp', __name__)


@donation_bp.route('/', methods=['GET'])
def get_all_donations():
    donations = Donation.query.all()
    return jsonify([donation.to_dict() for donation in donations]), 200


@donation_bp.route('/<int:donation_id>', methods=['GET'])
def get_donation(donation_id):
    donation = Donation.query.get_or_404(donation_id)
    if not donation:
        return jsonify({'error': 'Donation not found'}), 404
    return jsonify(donation.to_dict()), 200

# POST create a donation
# @donation_bp.route('/', methods=['POST'])
# def create_donation():
#     data = request.get_json()
#     try:
#         donor = Donor.query.get(data['donor_id'])
#         charity = Charity.query.get(data['charity_id'])

#         if not donor or not charity:
#             return jsonify({'error': 'Invalid donor or charity ID'}), 400

#         donation = Donation(
#             donor_id=data['donor_id'],
#             charity_id=data['charity_id'],
#             amount=data['amount'],
#             anonymous=data.get('anonymous', False),
#             repeat_donation=data.get('repeat_donation', False),
#             reminder_set=data.get('reminder_set', False)
#         )

#         db.session.add(donation)
#         db.session.commit()
#         return jsonify(donation.to_dict()), 201

#     except Exception as e:
#         return jsonify({'error': str(e)}), 500


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

