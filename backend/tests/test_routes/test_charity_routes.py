import pytest
from app import create_app, db
from app.models import User, Charity, Donation, Story

@pytest.fixture
def client():
    app = create_app('testing')  
    with app.test_client() as client:
        with app.app_context():
            db.create_all()  #
        yield client
        with app.app_context():
            db.session.remove()  
            db.drop_all()  

# Test charity registration (POST /register_charity)
def test_register_charity(client):
    response = client.post('/auth/register_charity', json={
        'username': 'charityuser',
        'email': 'charity@example.com',
        'password': 'password123',
        'name': 'Test Charity',
        'phone': '1234567890'
    })
    assert response.status_code == 201
    assert response.json['message'] == 'Charity account created successfully'

# Test charity applying (POST /apply)
def test_apply_charity(client):
    client.post('/auth/register_charity', json={
        'username': 'charityuser',
        'email': 'charity@example.com',
        'password': 'password123',
        'name': 'Test Charity',
        'phone': '1234567890'
    })
    # Simulate login for the charity user (you can use JWT in real scenarios)
    user = User.query.filter_by(email='charity@example.com').first()

    # Apply for charity
    response = client.post('/charity/apply', json={'user_id': user.id})
    assert response.status_code == 200
    assert response.json['message'] == 'Application submitted successfully'

# Test charity getting donations (GET /charity/<id>/donations)
def test_get_charity_donations(client):
    # Set up a donor and a charity
    user = User.query.filter_by(email='charity@example.com').first()
    charity = Charity.query.filter_by(user_id=user.id).first()
    donor = User(username="donoruser", email="donor@example.com", password="donorpass")
    db.session.add(donor)
    db.session.commit()

    donation = Donation(amount=100.0, charity_id=charity.id, donor_id=donor.id)
    db.session.add(donation)
    db.session.commit()

    response = client.get(f'/charity/{charity.id}/donations')
    assert response.status_code == 200
    assert len(response.json['donations']) > 0

# Test posting a charity story (POST /charity/stories)
def test_post_charity_story(client):
    # Set up charity user and login
    user = User.query.filter_by(email='charity@example.com').first()
    charity = Charity.query.filter_by(user_id=user.id).first()

    response = client.post('/charity/stories', json={
        'user_id': user.id,
        'title': 'Test Story',
        'content': 'This is a test story for the charity.'
    })
    assert response.status_code == 201
    assert response.json['message'] == 'Story posted successfully'

# Test getting charity stories (GET /charity/<id>/stories)
def test_get_charity_stories(client):
    user = User.query.filter_by(email='charity@example.com').first()
    charity = Charity.query.filter_by(user_id=user.id).first()

    # Adding stories to charity
    story = Story(title='Test Story', content='This is a test story for charity.', charity_id=charity.id)
    db.session.add(story)
    db.session.commit()

    response = client.get(f'/charity/{charity.id}/stories')
    assert response.status_code == 200
    assert len(response.json) > 0