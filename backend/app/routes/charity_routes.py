from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash
from app.models.charity import Charity
from app.models.donation import donation
from sqlalchemy import func
from app.db import db


charity_bp = Blueprint('charity', __name__)

@charity_bp.route('/charity/apply', methods=['POST'])
def apply_charity():
    data = request.get_json()

    charity = Charity(
        full_name=data['name'],
        email=data['email'],
        password=generate_password_hash(data['password']),
        contacts=data.get('contacts'),
        description=data.get('description'),
        website_url=data.get('website_url'),
        image=data.get('image'),
    )


    


    db.session.add(charity)
    db.session.commit()

    return jsonify({'message': 'Application submitted'}), 201

@charity_bp.route('/charities/<int:charity_id>/donors', methods=['GET'])
def get_charity_donors(charity_id):
    charity = Charity.query.get_or_404(charity_id)
    


    non_anonymous_donations = donation.query.filter_by(charity_id=charity_id, is_anonymous=False).all()
    

    donors = list({donation.donor for donation in non_anonymous_donations})
    if not donors:
        return jsonify({'message': 'No donors found'}), 404

    return jsonify([{
            "id": donor.id,
            "name": donor.name,
            "email": donor.email  
        } for donor in donors
    ]), 200
     
@charity_bp.route('/charities/<int:charity_id>/total-donations', methods=['GET'])
def total_donations(charity_id):
    total = db.session.query(
        func.sum(donation.amount)
    ).filter_by(charity_id=charity_id).scalar()

    return jsonify({
        "charity_id": charity_id,
        "total_donated": total or 0.0
    }), 200
        