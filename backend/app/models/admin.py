from flask_admin import AdminIndexView, expose
from flask_admin.contrib.sqla import ModelView
from flask_login import current_user
from app import db
from app.models import User, Post

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

def setup_admin(app, admin):
    admin.add_view(UserModelView(User, db.session))
    admin.add_view(PostModelView(Post, db.session))
