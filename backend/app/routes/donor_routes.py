from flask import Blueprint, request, jsonify, flash, redirect, url_for, render_template
from flask_login import login_required, current_user
from app import db
from app.models import Donor, Donation, Charity
import logging

donor_bp = Blueprint('donor', __name__)
logger = logging.getLogger(__name__)


@donor_bp.route('<int:donor_id>/charities', methods=['GET'])
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

# @donor_bp.route('/register', methods=['GET', 'POST'])
# def register_donor():
#     if current_user.is_authenticated:
#         flash('You are already logged in.', 'info')
#         return redirect(url_for('main.home'))

#     if request.method == 'POST':
#         username = request.form.get('username')
#         email = request.form.get('email')
#         password = request.form.get('password')
#         # Add validation and password hashing here
#         # Create donor user
#         donor = Donor(username=username, email=email)
#         # Set password hashed
#         donor.set_password(password)
#         db.session.add(donor)
#         db.session.commit()
#         flash('Donor registered successfully. Please log in.', 'success')
#         logger.info(f"New donor registered: {email}")
#         return redirect(url_for('auth.login'))

#     return render_template('donor_register.html')

@donor_bp.route('/donate', methods=['POST'])
@login_required
def donate():
    data = request.get_json()
    amount = data.get('amount')
    anonymous = data.get('anonymous', False)

    if anonymous:
        donor_id = None
    else:
        donor_id = current_user.id

    donation = Donation(amount=amount, donor_id=donor_id)
    db.session.add(donation)
    db.session.commit()
    logger.info(f"Donation made by {'anonymous' if anonymous else current_user.email}: {amount}")
    return jsonify({'message': 'Donation successful'}), 201

@donor_bp.route('/<int:donor_id>/donations', methods=['GET'])
def get_donor_donations(donor_id):
    donor = Donor.query.get(donor_id)
    if not donor:
        return jsonify({'error': 'Donor not found'}), 404

    donations = [
        {
            'amount': d.amount,
            'date': d.date.isoformat(),
            'charity': d.charity.full_name
        }
        for d in donor.donations
    ]
    return jsonify({
        'donor': donor.full_name,
        'donations': donations
    })