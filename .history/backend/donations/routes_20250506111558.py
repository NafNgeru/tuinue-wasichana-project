from flask import Blueprint, request, jsonify
from donations.models import db, Donation

donations_bp = Blueprint('donations', __name__)

# POST route for donations
@donations_bp.route('/donations/', methods=['POST'])
def create_donation():
    data = request.get_json()
    amount = data.get('amount')
    anonymous = data.get('anonymous')
    frequency = data.get('frequency')

    # Validate input
    if amount is None or anonymous is None or not frequency:
        return jsonify({"error": "Missing required fields"}), 400

    if not isinstance(amount, (int, float)) or amount <= 0:
        return jsonify({"error": "Amount must be a positive number"}), 400

    if frequency not in ["one-time", "recurring"]:
        return jsonify({"error": "Invalid frequency value. Use 'one-time' or 'recurring'."}), 400

    new_donation = Donation(amount=amount, anonymous=anonymous, frequency=frequency)

    try:
        db.session.add(new_donation)
        db.session.commit()
        return jsonify({"message": "Donation created successfully", "donation_id": new_donation.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# GET all donations
@donations_bp.route('/donations/', methods=['GET'])
def get_donations():
    donations = Donation.query.all()
    result = [
        {
            "id": d.id,
            "amount": d.amount,
            "anonymous": d.anonymous,
            "frequency": d.frequency
        } for d in donations
    ]
    return jsonify(result), 200


# GET single donation by ID
@donations_bp.route('/donations/<int:id>', methods=['GET'])
def get_donation(id):
    donation = Donation.query.get(id)
    if not donation:
        return jsonify({"error": "Donation not found"}), 404
    return jsonify({
        "id": donation.id,
        "amount": donation.amount,
        "anonymous": donation.anonymous,
        "frequency": donation.frequency
    }), 200


# PUT update donation
@donations_bp.route('/donations/<int:id>', methods=['PUT'])
def update_donation(id):
    donation = Donation.query.get(id)
    if not donation:
        return jsonify({"error": "Donation not found"}), 404

    data = request.get_json()
    donation.amount = data.get('amount', donation.amount)
    donation.anonymous = data.get('anonymous', donation.anonymous)
    donation.frequency = data.get('frequency', donation.frequency)

    try:
        db.session.commit()
        return jsonify({"message": "Donation updated"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400


# DELETE donation
@donations_bp.route('/donations/<int:id>', methods=['DELETE'])
def delete_donation(id):
    donation = Donation.query.get(id)
    if not donation:
        return jsonify({"error": "Donation not found"}), 404

    try:
        db.session.delete(donation)
        db.session.commit()
        return jsonify({"message": "Donation deleted"}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
