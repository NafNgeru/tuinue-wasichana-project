from flask import Blueprint, request, jsonify
from ..models.charity import Charity
from ..models.donation import Donation
from ..models.donor import Donor
from ..db import db

donor_bp = Blueprint('donor_bp', name, url_prefix='/donors')

# View all charities
@donor_bp.route('/charities', methods=['GET'])
def get_charities():
    charities = Charity.query.all()
    return jsonify([{
        'id': c.id, 'full_name': c.name, 'description': c.description, 'story': c.beneficiary_story
    } for c in charities])

# Make a donation (anonymous or not)
@donor_bp.route('/donate', methods=['POST'])
def make_donation():
    donor_id = request.json.get('donor_id')
    charity_id = request.json.get('charity_id')
    amount = request.json.get('amount')
    is_anonymous = request.json.get('is_anonymous', False)
    repeat_donation = request.json.get('repeat_donation', False)
    reminder_set = request.json.get('reminder_set', False)

    donor = Donor.query.get(donor_id)
    charity = Charity.query.get(charity_id)

    if not donor or not charity:
        return jsonify({'message': 'Invalid donor or charity'}), 400

    donation = Donation(
        donor_id=donor.id,
        charity_id=charity.id,
        amount=amount,
        anonymous=is_anonymous,
        repeat_donation=repeat_donation,
        reminder_set=reminder_set
    )

    db.session.add(donation)
    db.session.commit()

    return jsonify({'message': 'Donation successful!'}), 200

# View stories about charity beneficiaries
@donor_bp.route('/charities/<int:charity_id>/story', methods=['GET'])
def get_charity_story(charity_id):
    charity = Charity.query.get(charity_id)
    if not charity:
        return jsonify({'message': 'Charity not found'}), 404
    return jsonify({'story': charity.beneficiary_story}), 20