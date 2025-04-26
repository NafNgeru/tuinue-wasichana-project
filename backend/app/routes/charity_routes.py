from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.models import Charity, User, Donation, Story
from app import db

charity_bp = Blueprint('charity', __name__)

@charity_bp.route('/apply', methods=['POST'])
@jwt_required()
def apply_charity():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user.role != 'charity':
        return jsonify({'error': 'Only charities can apply'}), 403
    data = request.get_json()
    charity = Charity.query.filter_by(user_id=user_id).first()
    if charity.application_status != 'pending':
        return jsonify({'error': 'Application already submitted or processed'}), 400
    charity.name = data.get('name', charity.name)
    charity.description = data.get('description', charity.description)
    charity.application_status = 'pending'
    db.session.commit()
    return jsonify({'message': 'Application submitted successfully'}), 200

@charity_bp.route('/donors', methods=['GET'])
@jwt_required()
def get_donors():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user.role != 'charity':
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
@jwt_required()
def post_story():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user.role != 'charity':
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

@charity_bp.route('/stories', methods=['GET'])
def get_stories():
    stories = Story.query.all()
    stories_list = []
    for story in stories:
        charity = Charity.query.get(story.charity_id)
        stories_list.append({
            'id': story.id,
            'title': story.title,
            'content': story.content,
            'charity_name': charity.name,
            'date': story.created_at.isoformat()
        })
    return jsonify(stories_list), 200
