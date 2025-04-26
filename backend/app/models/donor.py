from datetime import datetime, timedelta
from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app import db
from app.models import Donation, Donor, Charity, User
from app.services.payment_service import process_payment

class Donor(db.Model):
    __tablename__ = 'donors'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    full_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(128), nullable=False)  # Hashed password
    is_anonymous = db.Column(db.Boolean, default=False)  # Anonymous donations
    repeat_donation = db.Column(db.Boolean, default=False)  # Repeat donations
    donation_interval = db.Column(db.String(20), nullable=True)  # Frequency of donation
    reminder_set = db.Column(db.Boolean, default=False)  # Reminder for donation
    charities_donated_to = db.relationship('Charity', secondary='donations', backref='donors')

    def __repr__(self):
        return f'<Donor {self.full_name}, {self.email}>'

donation_bp = Blueprint('donation', __name__)

@donation_bp.route('/donate', methods=['POST'])
@jwt_required()
def donate():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role != 'donor':
        return jsonify({'error': 'Only donors can make donations'}), 403

    data = request.get_json()

    donor = Donor.query.filter_by(user_id=user_id).first()
    charity = Charity.query.get(data.get('charity_id'))

    if not charity:
        return jsonify({'error': 'Charity not found'}), 404

    # Process payment
    payment_result = process_payment(
        amount=data.get('amount'),
        payment_method=data.get('payment_method'),
        donor_details={
            'email': user.email,
            'name': donor.full_name
        }
    )

    if not payment_result.get('success'):
        return jsonify({'error': 'Payment failed'}), 400

    # Create donation record
    donation = Donation(
        donor_id=donor.id,
        charity_id=charity.id,
        amount=data.get('amount'),
        is_anonymous=data.get('is_anonymous', False),
        is_recurring=data.get('is_recurring', False),
        frequency=data.get('frequency'),
        payment_method=data.get('payment_method'),
        transaction_id=payment_result.get('transaction_id'),
        status='completed'
    )

    if data.get('is_recurring'):
        donation.next_payment_date = datetime.utcnow() + timedelta(days=30)

    db.session.add(donation)
    db.session.commit()

    return jsonify({
        'message': 'Donation successful',
        'donation_id': donation.id,
        'amount': donation.amount
    }), 201

@donation_bp.route('/history', methods=['GET'])
@jwt_required()
def donation_history():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role != 'donor':
        return jsonify({'error': 'Only donors can view donation history'}), 403

    donor = Donor.query.filter_by(user_id=user_id).first()
    donations = Donation.query.filter_by(donor_id=donor.id).all()

    donation_list = []
    for donation in donations:
        charity = Charity.query.get(donation.charity_id)
        donation_list.append({
            'id': donation.id,
            'charity_name': charity.name,
            'amount': donation.amount,
            'date': donation.created_at.isoformat(),
            'is_recurring': donation.is_recurring,
            'status': donation.status
        })

    return jsonify(donation_list), 200
