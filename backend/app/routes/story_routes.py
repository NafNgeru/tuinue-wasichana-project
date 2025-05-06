from flask import Blueprint, request, jsonify
from app.models.story import Story
from app import db
# from . import db




story_bp = Blueprint('story', __name__)

@story_bp.route('/charity/<int:charity_id>/stories', methods=['GET'])
def get_stories(charity_id):
    stories = Story.query.filter_by(charity_id=charity_id).all()
    return jsonify([story.to_dict() for story in stories]), 200

@story_bp.route('/charity/<int:charity_id>/stories/<int:story_id>', methods=['GET'])
def get_story(story_id):
    story = Story.query.get_or_404(story_id)
    return jsonify(story.to_dict()), 200

@story_bp.route('/charity/<int:charity_id>/stories', methods=['POST'])
def create_story(charity_id):
    data = request.get_json()

    # Optional: validate required fields
    title = data.get('title')
    content = data.get('content')
    if not title or not content:
        return jsonify({'error': 'Title and content are required'}), 400

    new_story = Story(
        title=title,
        content=content,
        charity_id=charity_id
    )
    db.session.add(new_story)
    db.session.commit()

    return jsonify(new_story.to_dict()), 201

@story_bp.route('/charity/<int:charity_id>/stories/<int:story_id>', methods=['PUT'])
def update_story(story_id):
    story = Story.query.get_or_404(story_id)
    data = request.get_json()
    story.title = data.get('title', story.title)
    story.content = data.get('content', story.content)
    story.charity_id = data.get('charity_id', story.charity_id)
    # Update other fields as needed
    db.session.commit()
    return jsonify(story.to_dict()), 200

@story_bp.route('/charity/<int:charity_id>/stories/<int:story_id>', methods=['DELETE'])
def delete_story(story_id):
    story = Story.query.get_or_404(story_id)
    db.session.delete(story)
    db.session.commit()
    return jsonify({'message': 'Story deleted'}), 200
