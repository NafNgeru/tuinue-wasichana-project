from flask import Blueprint, request, jsonify
from donations.models import db, Donation

donations_bp = Blueprint('donations', __name__)

# POST route for donations
@donations_bp.route('/donations', methods=['POST'])
def create_donation():
    data = request.get_json()

    # Extract data from the request
    amount = data.get('amount')
    anonymous = data.get('anonymous')
    frequency = data.get('frequency')

    # Validate the required fields
    if not all([amount, anonymous, frequency]):
        return jsonify({"error": "Missing required fields"}), 400

    # Validate that amount is a positive number
    if not isinstance(amount, (int, float)) or amount <= 0:
        return jsonify({"error": "Amount must be a positive number"}), 400

    # Validate frequency
    if frequency not in ["one-time", "recurring"]:
        return jsonify({"error": "Invalid frequency value. Use 'one-time' or 'recurring'."}), 400

    # Create a new donation record
    new_donation = Donation(amount=amount, anonymous=anonymous, frequency=frequency)

    # Add to the database
    try:
        db.session.add(new_donation)
        db.session.commit()
        return jsonify({"message": "Donation created successfully", "donation_id": new_donation.id}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
