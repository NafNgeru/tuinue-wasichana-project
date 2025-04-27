from flask import Blueprint, request, jsonify
from ..models.charity import Charity 
from ..models.donation import Donation
from ..models.donor import Donor
from ..db import db

donor_bp = Blueprint('donor_bp', __name__, url_prefix='/donors')

        # View all charities available
@donor_bp.route('/charities', methods=['GET'])
def get_charities():
    charities = Charity.query.all()
    return jsonify([
        {
            'id': c.id,
            'name': c.name,
            'description': c.description,
            'story': c.beneficiary_story
        } for c in charities
    ]), 200
    

        # Make a donation anonymously or not
@donor_bp.route('/donate', methods=['POST'])
def make_a_donation():
    data = request.get_json()

    donor_id = data.get('donor_id')
    charity_id = data.get('charity_id')
    amount = data.get('amount')
    is_anonymous = data.get('is_anonymous',False)
    repeat_donation = data.get('repeat_donation',False)
    reminder_set = data.get('reminder_set', False)

    donor = Donor.query.get(donor_id)
    charity = Charity.query.get(charity_id)

    if not donor or not charity:
        return jsonify({'message': 'Invalid donor or charity'}), 400

    if not isinstance(amount, (int, float)) or amount <= 0:
        return jsonify({'messgae': 'Invalid donation amount.'}), 400
    

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


        # View stories about beneficiaries
@donor_bp.route('/charities/<int:charity_id>/story', methods=['GET'])
def get_charity_story(charity_id):
    charity = Charity.query.get(charity_id)

    if not charity:
        return jsonify({'message': 'Charity not found'}), 404
    
    return jsonify({'story': charity.beneficiary_story}), 200


   
