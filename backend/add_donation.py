from app import create_app, db
from app.models import Donation, Donor, Charity

app = create_app()

with app.app_context():
    donor = Donor.query.first()
    charity = Charity.query.first()

    if donor and charity:
        donation = Donation(
            donor_id=6,
            charity_id=2,
            amount=50.0,
            anonymous=False,
            repeat_donation=True
        )
        db.session.add(donation)
        db.session.commit()
        print("Donation added successfully!")
    else:
        print("Donor or Charity not found.")
