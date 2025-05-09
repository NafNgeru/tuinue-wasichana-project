from app.models import Charity, User
from app import db

def test_create_charity_with_user(app):
    with app.app_context():
        user = User(username="charityuser", email="charity@example.com", password="pass")
        db.session.add(user)
        db.session.flush()  

        charity = Charity(
            user_id=user.id,
            full_name="Helping Hands",
            contact="0700123456",
            email="help@hands.org",
            password_hash="hashed_password",  
            description="We help people",
            website_url="https://helpinghands.org"
        )
        db.session.add(charity)
        db.session.commit()

        assert charity.id is not None
        assert charity.user_id == user.id
        assert charity.user == user