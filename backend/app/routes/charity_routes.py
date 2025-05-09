from flask import Blueprint, request, jsonify
# from flask_jwt_extended import jwt_required, get_jwt_identity
# from werkzeug.security import generate_password_hash
from sqlalchemy import func
from app.models import Charity, Donation, Story, User
from app import db


charity_bp = Blueprint('charity', __name__)

@charity_bp.route('/apply', methods=['POST'])
# @jwt_required()
def apply_charity():
    user_id = request.json.get('user_id')
    user = User.query.get(user_id)
    if not user or user.role != 'charity':
        return jsonify({'error': 'Only charities can apply'}), 403
    data = request.get_json()
    charity = Charity.query.filter_by(user_id=user_id).first()
    if not charity:
        return jsonify({'error': 'Charity profile not found'}), 404
    if charity.application_status != 'pending':
        return jsonify({'error': 'Application already submitted or processed'}), 400
    charity.name = data.get('name', charity.name)
    charity.description = data.get('description', charity.description)
    charity.application_status = 'pending'
    db.session.commit()
    return jsonify({'message': 'Application submitted successfully'}), 200

@charity_bp.route('/', methods=['GET'])
def get_all_charities():
    charities = Charity.query.all()
    result = [
        {
            "id": charity.id,
            "full_name": charity.full_name,
            "email": charity.email,
            "website_url": charity.website_url,
            "description": charity.description,
            "image": charity.image
        }
        for charity in charities
    ]
    return jsonify(result), 200
    

from flask import jsonify

@charity_bp.route('/pending', methods=['GET'])
def get_pending_charities():
    pending_charities = Charity.query.filter_by(application_status='pending').all()
    result = [
        {
            "id": charity.id,
            "full_name": charity.full_name,
            "email": charity.email,
            "website_url": charity.website_url,
            "description": charity.description,
            "image": charity.image,
            "application_status": charity.application_status
        }
        for charity in pending_charities
    ]
    return jsonify(result), 200

from flask_mail import Message
from app import mail

@charity_bp.route('/<int:id>/approve', methods=['POST'])
def approve_charity(id):
    charity = Charity.query.get(id)
    if not charity:
        return jsonify({"error": "Charity not found"}), 404
    charity.application_status = 'approved'
    db.session.commit()

    # Send approval email
    try:
        msg = Message(
            subject="Charity Registration Approved",
            recipients=[charity.email],
            body=f"Dear {charity.full_name},\n\nYour charity registration has been approved. You can now access all features.\n\nBest regards,\nTuinue Wasichana Team"
        )
        mail.send(msg)
    except Exception as e:
        print(f"Error sending approval email: {e}")

    return jsonify({"message": "Charity approved successfully"}), 200

@charity_bp.route('/<int:id>/decline', methods=['POST'])
def decline_charity(id):
    charity = Charity.query.get(id)
    if not charity:
        return jsonify({"error": "Charity not found"}), 404
    charity.application_status = 'declined'
    db.session.commit()

    # Send declination email
    try:
        msg = Message(
            subject="Charity Registration Declined",
            recipients=[charity.email],
            body=f"Dear {charity.full_name},\n\nWe regret to inform you that your charity registration has been declined. For more information, please contact support.\n\nBest regards,\nTuinue Wasichana Team"
        )
        mail.send(msg)
    except Exception as e:
        print(f"Error sending declination email: {e}")

    return jsonify({"message": "Charity declined successfully"}), 200

@charity_bp.route('/<int:id>', methods=['GET'])
def get_charity_by_id(id):
    try:
        charity = Charity.query.get(id)
        if not charity:
            return jsonify({"error": "Charity not found"}), 404

        result = {
            "id": charity.id,
            "full_name": charity.full_name,
            "email": charity.email,
            "website_url": charity.website_url,
            "description": charity.description,
            "image": charity.image
        }
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": f"An error occurred: {str(e)}"}), 500


@charity_bp.route('/donors', methods=['GET'])
# @jwt_required()
def get_donors():
    user_id = request.args.get('user_id')
    user = User.query.get(user_id)
    if not user or user.role != 'charity':
        return jsonify({'error': 'Only charities can view donors'}), 403
    charity = Charity.query.filter_by(user_id=user_id).first()
    donations = Donation.query.filter_by(charity_id=charity.id).all()
    donors_list = []
    for donation in donations:
        donor_user = User.query.get(donation.donor.user_id)
        donors_list.append({
            'donor_id': donation.donor.id,
            'donor_name': donor_user.username,
            'amount': donation.amount,
            'anonymous': donation.anonymous,
            'date': donation.created_at.isoformat()
        })
    return jsonify(donors_list), 200

@charity_bp.route('/stories', methods=['POST'])
# @jwt_required()
def post_story():
    user_id = request.json.get('user_id')
    user = User.query.get(user_id)
    if not user or user.role != 'charity':
        return jsonify({'error': 'Only charities can post stories'}), 403
    data = request.get_json()
    charity = Charity.query.filter_by(user_id=user_id).first()
    story = Story(
        charity_id=charity.id,
        title=data.get('title'),
        content=data.get('content')
    )
    db.session.add(story)
    db.session.commit()
    return jsonify({'message': 'Story posted successfully'}), 201

@charity_bp.route('/<int:charity_id>/stories', methods=['GET'])
def get_stories(charity_id):
    stories = Story.query.filter_by(charity_id=charity_id).all()

    if not stories:
        return jsonify([]), 200  # Optional: include message → jsonify({"message": "No stories found"})

    stories_list = []
    for story in stories:
        stories_list.append({
            'id': story.id,
            'title': story.title,
            'content': story.content,
            'charity_name': story.charity.full_name,  # if you set up a relationship
            'date': story.created_at.isoformat()
        })

    return jsonify(stories_list), 200


@charity_bp.route('/<int:charity_id>/total-donations', methods=['GET'])
def total_donations(charity_id):
    total = db.session.query(
        func.sum(Donation.amount)
    ).filter_by(charity_id=charity_id).scalar()

    return jsonify({
        "charity_id": charity_id,
        "total_donated": total or 0.0
    }), 200

@charity_bp.route('/<int:id>', methods=['DELETE'])
def delete_charity(id):
    charity = Charity.query.get(id)
    if not charity:
        return jsonify({"error": "Charity not found"}), 404
    db.session.delete(charity)
    db.session.commit()
    return jsonify({"message": "Charity deleted successfully"}), 200

@charity_bp.route('/admin/charities', methods=['GET'])
def get_charities_with_status():
    charities = Charity.query.all()
    result = [
        {
            "id": charity.id,
            "full_name": charity.full_name,
            "email": charity.email,
            "website_url": charity.website_url,
            "description": charity.description,
            "image": charity.image,
            "application_status": charity.application_status
        }
        for charity in charities
    ]
    return jsonify(result), 200

@charity_bp.route('/admin/donation-stats', methods=['GET'])
def get_donation_stats():
    total_donations = db.session.query(func.count()).select_from(Donation).scalar()
    pending_donations = db.session.query(func.count()).select_from(Donation).filter(Donation.status == 'pending').scalar()
    in_progress_donations = db.session.query(func.count()).select_from(Donation).filter(Donation.status == 'in_progress').scalar()
    total_amount = db.session.query(func.sum(Donation.amount)).scalar() or 0

    return jsonify({
        "total_donations": total_donations,
        "pending_donations": pending_donations,
        "in_progress_donations": in_progress_donations,
        "total_amount": total_amount
    })

