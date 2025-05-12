from flask import Blueprint, request, jsonify, current_app
from app.models.story import Story
from app import db
from werkzeug.utils import secure_filename
import os


story_bp = Blueprint('story', __name__)

@story_bp.route('/', methods=['GET'])
def get_all_stories():
    stories = Story.query.all()
    return jsonify([story.to_dict() for story in stories]), 200

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
    title = request.form.get('title')
    content = request.form.get('content')
    image_url = request.form.get('image_url')
    image_file = request.files.get('image')
    
    if not title or not content:
        return jsonify({'error': 'Title and content are required'}), 400

    final_image_url = image_url

    if image_file:
        upload_folder = os.path.join(current_app.static_folder, 'uploads')
        os.makedirs(upload_folder, exist_ok=True)
        filename = secure_filename(image_file.filename)
        file_path = os.path.join(upload_folder, filename)
        image_file.save(file_path)
        final_image_url = f"/static/uploads/{filename}"
    
    print("Saved image to:", file_path)

    new_story = Story(
        title=title,
        content=content,
        charity_id=charity_id,
        image = final_image_url
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
def delete_story(charity_id, story_id):
    story = Story.query.filter_by(id=story_id, charity_id=charity_id).first_or_404()
    db.session.delete(story)
    db.session.commit()
    return jsonify({'message': 'Story deleted'}), 200
