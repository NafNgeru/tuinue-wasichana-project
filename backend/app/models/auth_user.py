from flask import Blueprint, request, jsonify
from werkzeug.security import check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app.models import User
from app.utils import validate_email, validate_password

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    
    # Validate input
    if not all(key in data for key in ['username', 'email', 'password', 'role']):
        return jsonify({'error': 'Missing required fields'}), 400
    
    if not validate_email(data['email']):
        return jsonify({'error': 'Invalid email format'}), 400
    
    if not validate_password(data['password']):
        return jsonify({'error': 'Password must be at least 8 characters'}), 400
    
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'error': 'Username already exists'}), 400
    
    if User.query.filter_by(email=data['email']).first():
        return jsonify({'error': 'Email already exists'}), 400
    
    # Create user
    user = User(
        username=data['username'],
        email=data['email'],
        role=data['role']
    )
    user.set_password(data['password'])
    
    db.session.add(user)
    db.session.commit()
    
    # Create profile based on role
    if data['role'] == 'donor':
        donor = Donor(user_id=user.id)
        db.session.add(donor)
    elif data['role'] == 'charity':
        charity = Charity(user_id=user.id)
        db.session.add(charity)
    
    db.session.commit()
    
    return jsonify({'message': 'User registered successfully'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    user = User.query.filter_by(username=data.get('username')).first()
    
    if not user or not user.check_password(data.get('password')):
        return jsonify({'error': 'Invalid username or password'}), 401
    
    access_token = create_access_token(identity=user.id)
    return jsonify({
        'access_token': access_token,
        'user_id': user.id,
        'role': user.role
    }), 200

@auth_bp.route('/reset-password', methods=['POST'])
@jwt_required()
def reset_password():
    user_id = get_jwt_identity()
    data = request.get_json()
    
    user = User.query.get(user_id)
    
    if not user.check_password(data.get('old_password')):
        return jsonify({'error': 'Current password is incorrect'}), 400
    
    if not validate_password(data.get('new_password')):
        return jsonify({'error': 'Password must be at least 8 characters'}), 400
    
    user.set_password(data.get('new_password'))
    db.session.commit()
    
    return jsonify({'message': 'Password updated successfully'}), 200