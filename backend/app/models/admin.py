from flask_admin import Admin, AdminIndexView, expose
from flask_admin.contrib.sqla import ModelView
from flask_login import current_user
from flask import redirect, url_for
from app import db
from app.models import User, Post, Charity, Donor, Beneficiary, Story, Inventory, Donation

class MyAdminIndexView(AdminIndexView):
    @expose('/')
    def index(self):
        if not current_user.is_authenticated or not current_user.is_admin:
            return redirect(url_for('auth.login'))
        return super().index()

class SecureModelView(ModelView):
    def is_accessible(self):
        return current_user.is_authenticated and current_user.is_admin

    def inaccessible_callback(self, name, **kwargs):
        return redirect(url_for('auth.login'))

class UserModelView(SecureModelView):
    column_list = ('username', 'email', 'is_admin')
    form_columns = ('username', 'email', 'is_admin')

class CharityModelView(SecureModelView):
    column_list = ('full_name', 'email', 'approved', 'application_status')
    form_columns = ('user_id', 'full_name', 'contact', 'email', 'description', 'website_url', 'approved', 'application_status')

class DonorModelView(SecureModelView):
    column_list = ('full_name', 'email', 'is_anonymous', 'repeat_donation')
    form_columns = ('full_name', 'email', 'password_hash', 'is_anonymous', 'repeat_donation', 'donation_interval', 'reminder_set')

class PostModelView(SecureModelView):
    column_list = ('title', 'user', 'created_at')
    form_columns = ('title', 'content', 'user')

class StoryModelView(SecureModelView):
    column_list = ('title', 'charity', 'created_at')
    form_columns = ('title', 'content', 'charity_id')

class BeneficiaryModelView(SecureModelView):
    column_list = ('name', 'location', 'charity_id')
    form_columns = ('name', 'location', 'items_received', 'charity_id')

class InventoryModelView(SecureModelView):
    column_list = ('item_name', 'quantity', 'charity_id')
    form_columns = ('item_name', 'quantity', 'charity_id')

class DonationModelView(SecureModelView):
    column_list = ('amount', 'donor_id', 'charity_id', 'timestamp')
    form_columns = ('amount', 'donor_id', 'charity_id')

def setup_admin(app):
    admin = Admin(app, index_view=MyAdminIndexView(), template_mode='bootstrap4')
    admin.add_view(UserModelView(User, db.session))
    admin.add_view(CharityModelView(Charity, db.session))
    admin.add_view(DonorModelView(Donor, db.session))
    admin.add_view(PostModelView(Post, db.session))
    admin.add_view(StoryModelView(Story, db.session))
    admin.add_view(BeneficiaryModelView(Beneficiary, db.session))
    admin.add_view(InventoryModelView(Inventory, db.session))
    admin.add_view(DonationModelView(Donation, db.session))
