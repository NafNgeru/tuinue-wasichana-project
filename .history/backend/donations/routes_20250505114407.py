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

    if not all([amount, anonymous, frequency]):
        return jsonify({"error": "Missing required fields"}), 400

    # Create a new donation record
    new_donation = Donation(amount=amount, anonymous=anonymous, frequency=frequency)

    # Add to the database
    try:
        db.session.add(new_donation)
        db.session.commit()
        return jsonify({"message": "Donation created successfully"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 400
