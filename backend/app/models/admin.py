from flask import Blueprint, request, jsonify, redirect, url_for
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Charity, User, Post
from app import db
from flask_admin import AdminIndexView, expose
from flask_admin.contrib.sqla import ModelView
from flask_login import current_user

admin_bp = Blueprint('admin', __name__)

class MyAdminIndexView(AdminIndexView):
    @expose('/')
    def index(self):
        if not current_user.is_authenticated or not current_user.is_admin:
            return redirect(url_for('auth.login'))
        return super(MyAdminIndexView, self).index()

class UserModelView(ModelView):
    column_list = ('username', 'email', 'is_admin', 'created_at')
    column_searchable_list = ('username', 'email')
    column_filters = ('is_admin',)
    form_columns = ('username', 'email', 'is_admin')
    
    def is_accessible(self):
        return current_user.is_authenticated and current_user.is_admin
    
    def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for('auth.login'))

class PostModelView(ModelView):
    column_list = ('title', 'user', 'created_at')
    column_searchable_list = ('title',)
    form_columns = ('title', 'content', 'user')
    
    def is_accessible(self):
        return current_user.is_authenticated and current_user.is_admin
    
    def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for('auth.login'))

def setup_admin(app):
    from app.models import User, Post
    admin.add_view(UserModelView(User, db.session))


@admin_bp.route('/applications', methods=['GET'])
@jwt_required()
def get_applications():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)

    if user.role != 'admin':
        return jsonify({'error': 'Only admins can access this endpoint'}), 403

    applications = Charity.query.filter_by(application_status='pending').all()

    app_list = []
    for app in applications:
        user = User.query.get(app.user_id)
        app_list.append({
            'id': app.id,
            'name': app.name,
            'description': app.description,
            'email': user.email,
            'application_date': app.created_at.isoformat()
        })

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
