from flask import Blueprint, request, jsonify, current_app
import os
from werkzeug.utils import secure_filename
from app.models import Charity, User
from app import db, bcrypt

charity_bp = Blueprint('charity', __name__)

@charity_bp.route('/register', methods=['POST'])
def register_charity():
    if 'logo' in request.files:
        logo = request.files['logo']
        if logo.filename != '':
            filename = secure_filename(logo.filename)
            upload_folder = os.path.join(current_app.root_path, 'static', 'uploads')
            os.makedirs(upload_folder, exist_ok=True)
            logo_path = os.path.join(upload_folder, filename)
            logo.save(logo_path)
            logo_url = f'/static/uploads/{filename}'
        else:
            logo_url = None
    else:
        logo_url = None

    username = request.form.get('username')
    email = request.form.get('email')
    password = request.form.get('password')
    name = request.form.get('name')
    phone = request.form.get('phone')

    if User.query.filter_by(username=username).first():
        return jsonify({'error': 'Username already taken'}), 400
    if User.query.filter_by(email=email).first():
        return jsonify({'error': 'Email already taken'}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    user = User(username=username, email=email, password=hashed_password)
    db.session.add(user)
    db.session.commit()

    charity = Charity(
        user_id=user.id,
        full_name=name,
        contact=phone,
        email=email,
        application_status='pending',
        image=logo_url
    )
    db.session.add(charity)
    db.session.commit()

    return jsonify({'message': 'Charity registered successfully'}), 201

# Other routes remain unchanged
