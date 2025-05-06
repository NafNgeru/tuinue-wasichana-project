from flask import Blueprint, request, jsonify
from donations.models import db, Donation

donations_bp = Blueprint('donations', __name__)

@donations_bp.route('/donations', methods=['POST'])
def create_donation():
    data = request.get_json()
    try:
        donation = Donation(
            amount=data['amount'],
            frequency=data['frequency'],
            anonymous=data.get('anonymous', False)
        )
        db.session.add(donation)
        db.session.commit()
        return jsonify({"message": "Donation saved."}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
