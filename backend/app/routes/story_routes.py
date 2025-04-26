from flask import Blueprint, request, jsonify
from app.models.story import Story
from app.db import db


story_bp = Blueprint('story_bp', __name__)

@story_bp.route('/stories', methods=['POST'])
def create_story():
    data = request.get_json()
    
    new_story = Story(
        title=data['title'],
        beneficiary_name=data['beneficiary_name'],
        content=data['content'],
        image=data.get('image')  
    )
    
    db.session.add(new_story)
    db.session.commit()
    
    return jsonify({"message": "Story created successfully!"}), 201
