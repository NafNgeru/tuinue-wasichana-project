from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash
from sqlalchemy import func
from app.models import charity, donation, Story, User
from app import db
from app.db import db


charity_bp = Blueprint('charity', __name__)

@charity_bp.route('/apply', methods=['POST'])
@jwt_required()
def apply_charity():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user.role != 'charity':
        return jsonify({'error': 'Only charities can apply'}), 403
    data = request.get_json()
    charity = charity.query.filter_by(user_id=user_id).first()
    if charity.application_status != 'pending':
        return jsonify({'error': 'Application already submitted or processed'}), 400
    charity.name = data.get('name', charity.name)
    charity.description = data.get('description', charity.description)
    charity.application_status = 'pending'
    db.session.commit()
    return jsonify({'message': 'Application submitted successfully'}), 200

@charity_bp.route('/', methods=['GET'])
def get_all_charities():
    charities = charity.query.all()
    result = [
        {
            "id": charity.id,
            "full_name": charity.full_name,
            "email": charity.email,
            "website_url": charity.website_url,
            "description": charity.description
        }
        for charity in charities
    ]
    return jsonify(result), 200

@charity_bp.route('/<int:id>', methods=['GET'])
def get_charity_by_id(id):
    charity = charity.query.get(id)
    if not charity:
        return jsonify({"error": "Charity not found"}), 404

    result = {
        "id": charity.id,
        "full_name": charity.full_name,
        "email": charity.email,
        "website_url": charity.website_url,
        "description": charity.description
    }
    return jsonify(result), 200

@charity_bp.route('/donors', methods=['GET'])
@jwt_required()
def get_donors():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if user.role != 'charity':
        return jsonify({'error': 'Only charities can view donors'}), 403
    charity = charity.query.filter_by(user_id=user_id).first()
    donations = donation.query.filter_by(charity_id=charity.id).all()
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
    charity = charity.query.filter_by(user_id=user_id).first()
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
        charity = charity.query.get(story.charity_id)
        stories_list.append({
            'id': story.id,
            'title': story.title,
            'content': story.content,
            'charity_name': charity.name,
            'date': story.created_at.isoformat()
        })
    return jsonify(stories_list), 200

@charity_bp.route('/charities/<int:charity_id>/total-donations', methods=['GET'])
def total_donations(charity_id):
    total = db.session.query(
        func.sum(donation.amount)
    ).filter_by(charity_id=charity_id).scalar()

    return jsonify({
        "charity_id": charity_id,
        "total_donated": total or 0.0
    }), 200


# @charity_bp.route('/test-charity', methods=['GET'])
# def test_charity():
#     from app.models.charity import Charity
#     from app.db import db

#     new_charity = Charity(
#     full_name="Clicked Charity",
#     email="click@test.com",
#     description="Created by clicking",
#     contact="0700000000",  # provide all required fields
#     password="hashedpassword",  # this is required based on the schema
#     user_id=1,  # assuming this links to a user
#     application_status="pending",  # or whatever default makes sense
#     approved=False
# )

    # db.session.add(new_charity)
    # db.session.commit()
    # return {"message": "Charity created!"}, 201

