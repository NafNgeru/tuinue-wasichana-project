from flask import Blueprint, request, jsonify, flash, redirect, url_for, render_template
from flask_login import login_required, current_user
from app import db
from app.models import Donor, Donation
import logging

donor_bp = Blueprint('donor', __name__)
logger = logging.getLogger(__name__)

@donor_bp.route('/register', methods=['GET', 'POST'])
def register_donor():
    if current_user.is_authenticated:
        flash('You are already logged in.', 'info')
        return redirect(url_for('main.home'))

    if request.method == 'POST':
        username = request.form.get('username')
        email = request.form.get('email')
        password = request.form.get('password')
        # Add validation and password hashing here
        # Create donor user
        donor = Donor(username=username, email=email)
        # Set password hashed
        donor.set_password(password)
        db.session.add(donor)
        db.session.commit()
        flash('Donor registered successfully. Please log in.', 'success')
        logger.info(f"New donor registered: {email}")
        return redirect(url_for('auth.login'))

    return render_template('donor_register.html')

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
