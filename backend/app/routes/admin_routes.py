from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.models import Charity
from app import db

admin_bp = Blueprint('admin', __name__)

# Get all pending applications
@admin_bp.route('/applications/pending', methods=['GET'])
@login_required
def get_pending_applications():
    if not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403

    pending = Charity.query.filter_by(application_status='pending').all()
    return jsonify([
        {
            'id': c.id,
            'user_id': c.user_id,
            'full_name': c.full_name,
            'email': c.email,
            'description': c.description,
            'website_url': c.website_url
        } for c in pending
    ]), 200


# Approve a charity
@admin_bp.route('/applications/<int:charity_id>/approve', methods=['POST'])
@login_required
def approve_charity(charity_id):
    if not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403

    charity = Charity.query.get(charity_id)
    if not charity:
        return jsonify({'error': 'Charity not found'}), 404

    charity.approved = True
    charity.application_status = 'approved'
    db.session.commit()

    return jsonify({'message': f'{charity.full_name} has been approved.'}), 200


# Decline a charity
@admin_bp.route('/applications/<int:charity_id>/decline', methods=['POST'])
@login_required
def decline_charity(charity_id):
    if not current_user.is_admin:
        return jsonify({'error': 'Unauthorized'}), 403

    charity = Charity.query.get(charity_id)
    if not charity:
        return jsonify({'error': 'Charity not found'}), 404

    charity.application_status = 'declined'
    db.session.commit()

    return jsonify({'message': f'{charity.full_name} has been declined.'}), 200
