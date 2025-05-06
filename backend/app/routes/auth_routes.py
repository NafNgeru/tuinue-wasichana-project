from flask import Blueprint, jsonify, render_template, redirect, url_for, flash, request
from flask_login import login_user, logout_user, current_user, login_required
from app import db, bcrypt
from app.models import User, Donor, Charity
# from app.models.forms import RegistrationForm, LoginForm, RequestResetForm, ResetPasswordForm
# from app.utils import send_reset_email
import logging

auth_bp = Blueprint('auth', __name__)
logger = logging.getLogger(__name__)


@auth_bp.route('/register_donor', methods=['POST'])
def register_donor():
    if current_user.is_authenticated:
        return jsonify({"message": "Already logged in"}), 400

    data = request.get_json()
    if not data:
        return jsonify({"message": "Missing JSON data"}), 400

    username = data.get('username')
    email = data.get('email')
    password = data.get('password')
    name = data.get('name')
    phone = data.get('phone')

    if not username or not email or not password:
        return jsonify({"message": "Missing required fields"}), 400

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({"message": "Email already registered"}), 409

    try:
        hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
        user = User(
            username=username,
            email=email,
            password=hashed_password,
            contact=phone,
            full_name=name,
            role="donor",
            is_admin=(email.lower() == 'admin@example.com'),
        )
        db.session.add(user)
        db.session.flush()

        donor = Donor(
            user_id=user.id,    
            full_name=user.full_name,
            email=user.email,
            password_hash=user.password,  
            contact=user.contact
        )
        db.session.add(donor)

        db.session.commit()

        logger.info(f"Registered new user: {email}")
        return jsonify({"message": "Registration successful"}), 201
    except Exception as e:
        db.session.rollback()
        logger.error(f"Registration error: {e}")
        return jsonify({"message": "Registration failed"}), 500
    
from werkzeug.utils import secure_filename
import os

@auth_bp.route('/register_charity', methods=['POST'])
def register_charity():
    if current_user.is_authenticated:
        return jsonify({"message": "Already logged in"}), 400

    if 'logo' not in request.files:
        return jsonify({"message": "Logo file is required"}), 400

    logo = request.files['logo']
    if logo.filename == '':
        return jsonify({"message": "No selected file"}), 400

    username = request.form.get('username')
    email = request.form.get('email')
    password = request.form.get('password')
    name = request.form.get('name')
    phone = request.form.get('phone')

    if not username or not email or not password or not name or not phone:
        return jsonify({"message": "Missing required fields"}), 400

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(
        username=username,
        email=email,
        password=hashed_password,
        contact=phone,
        full_name=name,
        role="charity"
    )
    db.session.add(new_user)
    db.session.flush()

    filename = secure_filename(logo.filename)
    upload_folder = os.path.join(os.getcwd(), 'backend', 'app', 'static', 'uploads')
    os.makedirs(upload_folder, exist_ok=True)
    file_path = os.path.join(upload_folder, filename)
    logo.save(file_path)

    charity = Charity(
        user_id=new_user.id,
        full_name=new_user.full_name,
        email=new_user.email,
        password_hash=new_user.password,
        contact=new_user.contact,
        image=f'/static/uploads/{filename}'
    )

    db.session.add(charity)
    db.session.commit()

    return jsonify({"message": "Charity account created successfully"}), 201

@auth_bp.route('/check-username/<username>', methods=['GET'])
def check_username(username):
    user = User.query.filter_by(username=username).first()
    if user:
        return jsonify({'available': False})
    return jsonify({'available': True}) 

@auth_bp.route('/login', methods=['POST'])
def login():
    if current_user.is_authenticated:
        return jsonify({"message": "Already logged in"}), 400

    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({"message": "Username and password required"}), 400

    user = User.query.filter_by(username=username).first()
    if user and bcrypt.check_password_hash(user.password, password):
        login_user(user)
        logger.info(f"User logged in: {user.email}")
        return jsonify({
            'message': 'Login successful',
            'username': user.username,
            'email': user.email,
            'role': user.role,  
            'id': user.id, 
            'donor': {"id": user.donor.id} if user.donor else None,
            'charity': {"id": user.charity.id} if user.charity else None
            }), 200
    else:
        return jsonify({"message": "Invalid credentials"}), 401


@auth_bp.route('/logout', methods=['POST'])
@login_required
def logout():
    logger.info(f"User logged out: {current_user.email}")
    logout_user()
    flash('You have been logged out.', 'info')
    return jsonify({"message": "Logged out successfully"}), 200

@auth_bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.all()
    users_list = [
        {
            "id":user.id,
            "username": user.username,
            "email": user.email,
            "is_admin": user.is_admin, 
            "role": user.role,
            "donor": {"id": user.donor.id} if user.donor else None,
            "charity": {"id": user.charity.id} if user.charity else None
        }
        for user in users
    ]
    return jsonify(users_list), 200


# @auth_bp.route('/reset_password', methods=['GET', 'POST'])
# def reset_request():
#     if current_user.is_authenticated:
#         flash('You are already logged in.', 'info')
#         return redirect(url_for('main.home'))

#     form = RequestResetForm()

#     if form.validate_on_submit():
#         user = User.query.filter_by(email=form.email.data).first()
#         if user:
#             send_reset_email(user)
#             flash('An email has been sent with instructions to reset your password.', 'info')
#             logger.info(f"Password reset email sent to: {user.email}")
#             return redirect(url_for('auth.login'))
#         else:
#             flash('No account found with that email address.', 'warning')

#     return render_template('reset_request.html', title='Reset Password', form=form)


# @auth_bp.route('/reset_password/<token>', methods=['GET', 'POST'])
# def reset_token(token):
#     if current_user.is_authenticated:
#         flash('You are already logged in.', 'info')
#         return redirect(url_for('main.home'))

#     user = User.verify_reset_token(token)
#     if user is None:
#         flash('That is an invalid or expired token.', 'warning')
#         return redirect(url_for('auth.reset_request'))

#     form = ResetPasswordForm()

#     if form.validate_on_submit():
#         try:
#             hashed_password = bcrypt.generate_password_hash(
#                 form.password.data
#             ).decode('utf-8')
#             user.password = hashed_password
#             db.session.commit()
#             flash('Your password has been updated! You can now log in.', 'success')
#             logger.info(f"Password updated for user: {user.email}")
#             return redirect(url_for('auth.login'))
#         except Exception as e:
#             db.session.rollback()
#             logger.error(f"Error updating password: {e}")
#             flash(
#                 'An error occurred while updating your password. Please try again.',
#                 'danger',
#             )

#     return render_template('reset_token.html', title='Reset Password', form=form)