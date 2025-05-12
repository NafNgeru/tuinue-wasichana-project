from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app import db
from app.models import Donor, Donation, Charity
import logging

donor_bp = Blueprint('donor', __name__)
logger = logging.getLogger(__name__)


@donor_bp.route('/<int:donor_id>/charities', methods=['GET'])
#@login_required
def get_charities_donated_to(donor_id):
    donor = Donor.query.get_or_404(donor_id)
    charities = {donation.charity for donation in donor.donations}

    return jsonify([
        {
            'id': charity.id,
            'name': charity.full_name,
            'description': charity.description,
            'story': charity.beneficiary_story
        } for charity in charities
    ]), 200


@donor_bp.route('/<int:donor_id>/donate/<int:charity_id>', methods=['POST'])
@login_required
def donate_to_charity(donor_id, charity_id):
    data = request.get_json()
    
    try:
        amount = float(data.get('amount', 0))
        anonymous = bool(data.get('anonymous', False))
        repeat_donation = bool(data.get('repeat_donation', False))
        reminder_set = bool(data.get('reminder_set', False))
        frequency = data.get('frequency', 'one-time')

        if amount <= 0:
            return jsonify({'error': 'Invalid donation amount'}), 400

        donor = Donor.query.get(donor_id)
        charity = Charity.query.get(charity_id)

        if not donor or not charity:
            return jsonify({'error': 'Invalid donor or charity ID'}), 404

        donation = Donation(
            donor_id=donor_id,
            charity_id=charity_id,
            amount=amount,
            anonymous=anonymous,
            repeat_donation=repeat_donation,
            reminder_set=reminder_set,
            frequency=frequency
        )

        db.session.add(donation)
        db.session.commit()

        logger.info(f"Donation of {amount} to {charity.full_name} by {'anonymous' if anonymous else donor.full_name}")
        return jsonify({'message': 'Donation successful', 'donation': donation.to_dict()}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500

@donor_bp.route('/public/donate/<int:charity_id>', methods=['POST'])
def public_donate(charity_id):
    data = request.get_json()

    try:
        amount = float(data.get('amount', 0))

        if amount <= 0:
            return jsonify({'error': 'Invalid donation amount'}), 400

        charity = Charity.query.get(charity_id)
        if not charity:
            return jsonify({'error': 'Charity not found'}), 404

        donation = Donation(
            donor_id=None,  # No donor linked
            charity_id=charity_id,
            amount=amount,
            anonymous=False,
            repeat_donation=False,
            reminder_set=False,
            frequency='one-time'
        )

        db.session.add(donation)
        db.session.commit()

        return jsonify({'message': 'Donation successful', 'donation': donation.to_dict()}), 201

    except Exception as e:
        return jsonify({'error': str(e)}), 500


#@donor_bp.route('/<int:donor_id>/donations', methods=['GET'])
#@login_required
#def get_donation_history(donor_id):
    donor = Donor.query.get_or_404(donor_id)
    return jsonify([
        {
            'amount': d.amount,
            'date': d.date.isoformat(),
            'charity': d.charity.full_name if d.charity else 'Unknown Charity',
            'anonymous': d.anonymous,
            'frequency': d.frequency
        } for d in donor.donations
    ]), 200
