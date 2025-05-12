import os
from dotenv import load_dotenv
from app import create_app, db
from app.models import User, Charity
from app.extensions import bcrypt

load_dotenv()

app = create_app()

# Charity + User seed data
charity_data = [
    {
        "username": "padspromise",
        "email": "pads@promise.org",
        "password": "pass1234",
        "full_name": "Pads for Promise",
        "contact": "0712345678",
        "description": "Empowering girls in rural areas with access to menstrual hygiene products.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR6okVyQppzgQYck-G9cPQwFpzYvfebuNEFVJ0-_aTkOA&s&ec=72940542",
        "website_url": "https://padsforpromise.org",
    },
    {
        "username": "hercycle",
        "email": "cycle@hermatters.org",
        "password": "hercycle2023",
        "full_name": "Her Cycle Matters",
        "contact": "0722234567",
        "description": "Providing sustainable menstrual health support to schoolgirls.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgAK2Xje-3AB3cHBDPVSl-SYLsaecIF2qdFgewg3T5kA&s&ec=72940542",
        "website_url": "https://hercyclematters.org",
    },
    {
        "username": "reddignity",
        "email": "info@reddignity.org",
        "password": "dignitypass",
        "full_name": "Red Dignity Foundation",
        "contact": "0700123456",
        "description": "Restoring dignity by offering reusable sanitary products.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvktGWCipIXTnmHM-6kZP1iII5IYaPNWufLJ3PpD0jtA&s&ec=72940542",
        "website_url": "https://reddignity.org",
    },
    {
        "username": "hopepads",
        "email": "contact@hopepads.org",
        "password": "hope2024",
        "full_name": "HopePads Initiative",
        "contact": "0734567890",
        "description": "Distributing free pads and offering menstrual health education.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYT6lFFy8y2WiUSMpQbEY9DeqLCkZyEzZd161GW_j3eA&s&ec=72940542",
        "website_url": "https://hopepads.org",
    },
    {
        "username": "dot",
        "email": "dot@future.org",
        "password": "dot12345",
        "full_name": "Daughters of Tomorrow",
        "contact": "0765432198",
        "description": "Helping young women break menstrual taboos through dialogue and support.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQsdj-uWvvTRZ8z6GQ3z_2O4yEr-qODTuDL-0RLAYTBrA&s&ec=72940542",
        "website_url": "https://daughtersoftomorrow.org",
    },
    {
        "username": "herjourney",
        "email": "herjourney@globe.org",
        "password": "journey24",
        "full_name": "Her Journey",
        "contact": "0798765432",
        "description": "Promoting menstrual hygiene and access to resources.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRWpvQGCXS7eyaPfMc5Kjz6DmeTHGyLEeEe5vnTsFJ-1g&s&ec=72940542",
        "website_url": "https://cycleofcare.org",
    },
    {
        "username": "wingchange",
        "email": "info@wingsofchange.org",
        "password": "changewings",
        "full_name": "Wings of Change",
        "contact": "0743210987",
        "description": "Empowering underprivileged girls through sanitary support.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDOHl5JwjulFRGRvcNIX8Vru3cDEb6sLXB3su54uSiIQ&s&ec=72940542",
        "website_url": "https://wingsofchange.org",
    },
    {
        "username": "riseup",
        "email": "rise@upgirls.org",
        "password": "riseup456",
        "full_name": "Rise Up Girls",
        "contact": "0711987654",
        "description": "Training and supporting girls in menstrual self-care.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR64rWP8mPNx41yFAyrrr_j0UMifTc7Ay2QPCK6SxGMDA&s&ec=72940542",
        "website_url": "https://riseupgirls.org",
    },
    {
        "username": "gracepads",
        "email": "grace@pads.org",
        "password": "grace2023",
        "full_name": "Grace Pads Foundation",
        "contact": "0755512345",
        "description": "Partnering with schools to distribute pads and raise awareness.",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_4QQ7vnTAMVmINByt3EJbcA7ZK1fe5x0xMq8CB_OC5w&s&ec=72940542",
        "website_url": "https://gracepads.org",
    },
]

with app.app_context():
    print("🧹 Dropping all tables...")
    db.drop_all()
    db.create_all()

    print("🌱 Seeding users and charities...")

    for item in charity_data:
        # Hash the password before inserting it into the database
        hashed_pw = bcrypt.generate_password_hash(item["password"]).decode('utf-8')

        user = User(
            username=item["username"],
            email=item["email"],
            password=hashed_pw,
            role="charity",  # Ensure your User model has this field
            is_admin=False
        )
        db.session.add(user)
        db.session.flush()  # Get user.id

        charity = Charity(
            user_id=user.id,
            full_name=item["full_name"],
            email=item["email"],
            contact=item["contact"],
            description=item["description"],
            website_url=item["website_url"],
            image=item["image"],
            approved=True,
            application_status="approved"
        )
        db.session.add(charity)

    db.session.commit()
    print("✅ Database seeded successfully.")
