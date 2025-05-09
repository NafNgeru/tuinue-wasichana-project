import pytest
from app import create_app, db
from app.models import User, Donor, Charity

@pytest.fixture
def client():
    app = create_app('testing')
    with app.test_client() as client:
        with app.app_context():
            db.create_all()
        yield client
        with app.app_context():
            db.session.remove()
            db.drop_all()

# Test registering a donor (POST /register_donor)
def test_register_donor(client):
    response = client.post('/auth/register_donor', json={
        'username': 'donoruser',
        'email': 'donor@example.com',
        'password': 'password123',
        'name': 'Donor Name',
        'phone': '1234567890'
    })
    assert response.status_code == 201
    assert response.json['message'] == 'Registration successful'

# Test registering a charity (POST /register_charity)
def test_register_charity(client):
    response = client.post('/auth/register_charity', json={
        'username': 'charityuser',
        'email': 'charity@example.com',
        'password': 'password123',
        'name': 'Charity Name',
        'phone': '0987654321'
    })
    assert response.status_code == 201
    assert response.json['message'] == 'Charity account created successfully'

# Test checking username availability (GET /check-username/<username>)
def test_check_username_available(client):
    response = client.get('/auth/check-username/donoruser')
    assert response.status_code == 200
    assert response.json['available'] == False

    response = client.get('/auth/check-username/newuser')
    assert response.status_code == 200
    assert response.json['available'] == True

# Test login (POST /login)
def test_login(client):
    # First, register the user
    client.post('/auth/register_donor', json={
        'username': 'donoruser',
        'email': 'donor@example.com',
        'password': 'password123',
        'name': 'Donor Name',
        'phone': '1234567890'
    })

    # Attempt login with valid credentials
    response = client.post('/auth/login', json={
        'username': 'donoruser',
        'password': 'password123'
    })
    assert response.status_code == 200
    assert response.json['message'] == 'Login successful'

# Test invalid login (POST /login)
def test_invalid_login(client):
    response = client.post('/auth/login', json={
        'username': 'nonexistentuser',
        'password': 'password123'
    })
    assert response.status_code == 401
    assert response.json['message'] == 'Invalid credentials'

# Test already logged-in user (POST /login)
def test_already_logged_in(client):
    client.post('/auth/register_donor', json={
        'username': 'donoruser',
        'email': 'donor@example.com',
        'password': 'password123',
        'name': 'Donor Name',
        'phone': '1234567890'
    })
    client.post('/auth/login', json={
        'username': 'donoruser',
        'password': 'password123'
    })

    # Try to log in again while already logged in
    response = client.post('/auth/login', json={
        'username': 'donoruser',
        'password': 'password123'
    })
    assert response.status_code == 400
    assert response.json['message'] == 'Already logged in'