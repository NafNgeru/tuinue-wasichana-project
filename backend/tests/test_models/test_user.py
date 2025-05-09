from app.models import User, Donor, Charity
from app.models import User
from sqlalchemy.exc import IntegrityError

def test_user_creation(session):
    user = User(username="testuser", email="test@example.com", password="hashedpass")
    session.add(user)
    session.commit()
    
    assert user.id is not None
    assert user.username == "testuser"
    assert user.email == "test@example.com"
    assert user.is_admin is False
    assert user.role == "donor"
    assert user.contact is None
    assert user.full_name is None

def test_username_and_email_uniqueness(session):
    user1 = User(username="uniqueuser", email="unique1@example.com", password="pass")
    user2 = User(username="uniqueuser", email="unique2@example.com", password="pass")  # Duplicate username
    session.add(user1)
    session.commit()
    session.add(user2)
    try:
        session.commit()
        assert False, "Expected IntegrityError due to duplicate username"
    except IntegrityError:
        session.rollback()

def test_nullable_fields(session):
    user = User(username="nullabletest", email="nullable@example.com", password="pass", contact="0700111222", full_name="Jane Doe")
    session.add(user)
    session.commit()
    
    assert user.contact == "0700111222"
    assert user.full_name == "Jane Doe"


def test_user_donor_relationship(session):
    user = User(username="donoruser", email="donor@example.com", password="pass")
    donor = Donor(user=user)
    session.add_all([user, donor])
    session.commit()

    assert user.donor is not None
    assert user.donor.id == donor.id
    assert donor.user_id == user.id
    

def test_user_charity_relationship(session):
    user = User(username="charityuser", email="charity@example.com", password="pass")
    charity = Charity(user=user)

    session.add_all([user, charity])
    session.commit()

    assert user.charity is not None
    assert charity.user_id == user.id
    assert charity.user == user