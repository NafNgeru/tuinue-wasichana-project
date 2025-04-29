from flask import Blueprint, request, jsonify
from app.models.story import Story
from app import db

story_bp = Blueprint('story', __name__, url_prefix='/api/stories')

@story_bp.route('/', methods=['GET'])
def get_stories():
    stories = Story.query.all()
    return jsonify([story.to_dict() for story in stories]), 200

@story_bp.route('/<int:story_id>', methods=['GET'])
def get_story(story_id):
    story = Story.query.get_or_404(story_id)
    return jsonify(story.to_dict()), 200

@story_bp.route('/', methods=['POST'])
def create_story():
    data = request.get_json()
    story = Story(
        title=data.get('title'),
        content=data.get('content'),
        charity_id=data.get('charity_id'),
        # Add other fields as needed
    )
    db.session.add(story)
    db.session.commit()
    return jsonify(story.to_dict()), 201

@story_bp.route('/<int:story_id>', methods=['PUT'])
def update_story(story_id):
    story = Story.query.get_or_404(story_id)
    data = request.get_json()
    story.title = data.get('title', story.title)
    story.content = data.get('content', story.content)
    story.charity_id = data.get('charity_id', story.charity_id)
    # Update other fields as needed
    db.session.commit()
    return jsonify(story.to_dict()), 200

@story_bp.route('/<int:story_id>', methods=['DELETE'])
def delete_story(story_id):
    story = Story.query.get_or_404(story_id)
    db.session.delete(story)
    db.session.commit()
    return jsonify({'message': 'Story deleted'}), 200
