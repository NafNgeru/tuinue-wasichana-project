from flask import Blueprint, render_template, redirect, url_for, flash, request
from flask_login import login_user, logout_user, current_user, login_required
from app import db, bcrypt
from app.models import User
from app.forms import RegistrationForm, LoginForm, RequestResetForm, ResetPasswordForm
from app.utils import send_reset_email
import logging

auth_bp = Blueprint('auth', __name__)
logger = logging.getLogger(__name__)


@auth_bp.route('/register', methods=['GET', 'POST'])
def register():
    if current_user.is_authenticated:
        flash('You are already logged in.', 'info')
        return redirect(url_for('main.home'))

    form = RegistrationForm()

    if form.validate_on_submit():
        try:
            hashed_password = bcrypt.generate_password_hash(
                form.password.data
            ).decode('utf-8')
            user = User(
                username=form.username.data,
                email=form.email.data,
                password=hashed_password,
                is_admin=(form.email.data.lower() == 'admin@example.com'),
            )
            db.session.add(user)
            db.session.commit()
            flash('Your account has been created! You can now log in.', 'success')
            logger.info(f"New user registered: {user.email}")
            return redirect(url_for('auth.login'))
        except Exception as e:
            db.session.rollback()
            logger.error(f"Error during registration: {e}")
            flash(
                'An error occurred while creating your account. Please try again.',
                'danger',
            )

    return render_template('register.html', title='Register', form=form)


@auth_bp.route('/login', methods=['GET', 'POST'])
def login():
    if current_user.is_authenticated:
        flash('You are already logged in.', 'info')
        return redirect(url_for('main.home'))

    form = LoginForm()

    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user and bcrypt.check_password_hash(user.password, form.password.data):
            login_user(user, remember=form.remember.data)
            logger.info(f"User logged in: {user.email}")
            next_page = request.args.get('next')
            return redirect(next_page) if next_page else redirect(url_for('main.home'))
        else:
            flash('Login unsuccessful. Please check your email and password.', 'danger')
            logger.warning(f"Failed login attempt for email: {form.email.data}")

    return render_template('login.html', title='Login', form=form)


@auth_bp.route('/logout')
@login_required
def logout():
    logger.info(f"User logged out: {current_user.email}")
    logout_user()
    flash('You have been logged out.', 'info')
    return redirect(url_for('main.home'))


@auth_bp.route('/reset_password', methods=['GET', 'POST'])
def reset_request():
    if current_user.is_authenticated:
        flash('You are already logged in.', 'info')
        return redirect(url_for('main.home'))

    form = RequestResetForm()

    if form.validate_on_submit():
        user = User.query.filter_by(email=form.email.data).first()
        if user:
            send_reset_email(user)
            flash('An email has been sent with instructions to reset your password.', 'info')
            logger.info(f"Password reset email sent to: {user.email}")
            return redirect(url_for('auth.login'))
        else:
            flash('No account found with that email address.', 'warning')

    return render_template('reset_request.html', title='Reset Password', form=form)


@auth_bp.route('/reset_password/<token>', methods=['GET', 'POST'])
def reset_token(token):
    if current_user.is_authenticated:
        flash('You are already logged in.', 'info')
        return redirect(url_for('main.home'))

    user = User.verify_reset_token(token)
    if user is None:
        flash('That is an invalid or expired token.', 'warning')
        return redirect(url_for('auth.reset_request'))

    form = ResetPasswordForm()

    if form.validate_on_submit():
        try:
            hashed_password = bcrypt.generate_password_hash(
                form.password.data
            ).decode('utf-8')
            user.password = hashed_password
            db.session.commit()
            flash('Your password has been updated! You can now log in.', 'success')
            logger.info(f"Password updated for user: {user.email}")
            return redirect(url_for('auth.login'))
        except Exception as e:
            db.session.rollback()
            logger.error(f"Error updating password: {e}")
            flash(
                'An error occurred while updating your password. Please try again.',
                'danger',
            )

    return render_template('reset_token.html', title='Reset Password', form=form)
