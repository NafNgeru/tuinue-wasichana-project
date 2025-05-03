from flask import Blueprint, request, flash, redirect, url_for, render_template
from flask_login import current_user
from app import db
from app.models import Donor, Charity
import logging

donor_bp = Blueprint('donor', __name__)
logger = logging.getLogger(__name__)

from app.models.auth_user import User
from app.models.donor import Donor
from app import db, bcrypt
from flask import jsonify, request

@donor_bp.route('/register', methods=['POST'])
def register_donor():
    data = request.get_json()
    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    phone = data.get('phone')
    user_type = data.get('userType', 'individual')

    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already taken'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already taken'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(username=username, email=email, password=hashed_password)
    db.session.add(user)
    db.session.commit()

    donor = Donor(
        user_id=user.id,
        full_name=name,
        contact=phone,
        email=email
    )
    db.session.add(donor)
    db.session.commit()

    return jsonify({'message': 'Donor registered successfully'}), 201
