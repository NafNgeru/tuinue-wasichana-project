from flask import Blueprint, request, jsonify
from app.models import Donation, Donor, Charity
from app import db

donation_bp = Blueprint('donation_bp', __name__)


@donation_bp.route('/', methods=['GET'])
def get_donations():
    donations = Donation.query.all()
    return jsonify([donation.to_dict() for donation in donations]), 200


@donation_bp.route('/<int:donation_id>', methods=['GET'])
def get_donation(id):
    donation = Donation.query.get(id)
    if not donation:
        return jsonify({'error': 'Donation not found'}), 404
    return jsonify(donation.to_dict()), 200

# POST create a donation
@donation_bp.route('/', methods=['POST'])
def create_donation():
    data = request.get_json()
    try:
        donor = Donor.query.get(data['donor_id'])
        charity = Charity.query.get(data['charity_id'])

        if not donor or not charity:
            return jsonify({'error': 'Invalid donor or charity ID'}), 400

        donation = Donation(
            donor_id=data['donor_id'],
            charity_id=data['charity_id'],
            amount=data['amount'],
            anonymous=data.get('anonymous', False),
            repeat_donation=data.get('repeat_donation', False),
            reminder_set=data.get('reminder_set', False)
        )

        db.session.add(donation)
        db.session.commit()
        return jsonify(donation.to_dict()), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


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

# @donation_bp.route('/donations/', methods=['POST'])
# def create_donation():
#     data = request.get_json()
#     amount = data.get('amount')
#     anonymous = data.get('anonymous')
#     frequency = data.get('frequency')

#     if not all([amount is not None, anonymous is not None, frequency]):
#         return jsonify({"error": "Missing required fields"}), 400

#     if not isinstance(amount, (int, float)) or amount <= 0:
#         return jsonify({"error": "Amount must be a positive number"}), 400

#     if frequency not in ["one-time", "recurring"]:
#         return jsonify({"error": "Invalid frequency value. Use 'one-time' or 'recurring'."}), 400

#     new_donation = Donation(amount=amount, anonymous=anonymous, frequency=frequency)

#     try:
#         db.session.add(new_donation)
#         db.session.commit()
#         return jsonify({"message": "Donation created successfully", "donation_id": new_donation.id}), 201
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 400


# # GET all donations
# @donation_bp.route('/donations/', methods=['GET'])
# def get_donations():
#     donations = Donation.query.all()
#     result = [
#         {
#             "id": d.id,
#             "amount": d.amount,
#             "anonymous": d.anonymous,
#             "frequency": d.frequency
#         } for d in donations
#     ]
#     return jsonify(result), 200


# # GET single donation by ID
# @donation_bp.route('/donations/<int:id>', methods=['GET'])
# def get_donation(id):
#     donation = Donation.query.get(id)
#     if not donation:
#         return jsonify({"error": "Donation not found"}), 404
#     return jsonify({
#         "id": donation.id,
#         "amount": donation.amount,
#         "anonymous": donation.anonymous,
#         "frequency": donation.frequency
#     }), 200


# # PUT update donation
# @donation_bp.route('/donations/<int:id>', methods=['PUT'])
# def update_donation(id):
#     donation = Donation.query.get(id)
#     if not donation:
#         return jsonify({"error": "Donation not found"}), 404

#     data = request.get_json()
#     donation.amount = data.get('amount', donation.amount)
#     donation.anonymous = data.get('anonymous', donation.anonymous)
#     donation.frequency = data.get('frequency', donation.frequency)

#     try:
#         db.session.commit()
#         return jsonify({"message": "Donation updated"}), 200
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 400


# # DELETE donation
# @donation_bp.route('/donations/<int:id>', methods=['DELETE'])
# def delete_donation(id):
#     donation = Donation.query.get(id)
#     if not donation:
#         return jsonify({"error": "Donation not found"}), 404

#     try:
#         db.session.delete(donation)
#         db.session.commit()
#         return jsonify({"message": "Donation deleted"}), 200
#     except Exception as e:
#         db.session.rollback()
#         return jsonify({"error": str(e)}), 400