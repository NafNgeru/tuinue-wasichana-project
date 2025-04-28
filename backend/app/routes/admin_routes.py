from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Charity, User
from app.db import db

admin_bp = Blueprint('admin_bp', __name__)

@admin_bp.route('/applications', methods=['GET'])
@jwt_required()
def get_applications():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role != 'admin':
        return jsonify({'error': 'Only admins can access this endpoint'}), 403

    applications = Charity.query.filter_by(application_status='pending').all()

    app_list = [{
        'id': app.id,
        'name': app.name,
        'description': app.description,
        'email': User.query.get(app.user_id).email,
        'application_date': app.created_at.isoformat()
    } for app in applications]

    return jsonify(app_list), 200

@admin_bp.route('/applications/<int:app_id>', methods=['PATCH'])
@jwt_required()
def review_application(app_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role != 'admin':
        return jsonify({'error': 'Only admins can review applications'}), 403

    data = request.get_json()
    action = data.get('action')  # 'approve' or 'reject'

    charity = Charity.query.get_or_404(app_id)

    if action == 'approve':
        charity.application_status = 'approved'
        charity.verified = True
    elif action == 'reject':
        charity.application_status = 'rejected'
    else:
        return jsonify({'error': 'Invalid action'}), 400

    db.session.commit()
    return jsonify({'message': f'Application {action}d successfully'}), 200

@admin_bp.route('/charities/<int:charity_id>', methods=['DELETE'])
@jwt_required()
def delete_charity(charity_id):
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role != 'admin':
        return jsonify({'error': 'Only admins can delete charities'}), 403

    charity = Charity.query.get_or_404(charity_id)

    db.session.delete(charity)
    db.session.commit()
    return jsonify({'message': 'Charity deleted successfully'}), 200
