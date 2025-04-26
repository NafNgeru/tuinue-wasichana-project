# Project 5: Tuinue Wasichana

## Overview
Tuinue Wasichana is a platform dedicated to supporting school-going girls in Sub-Saharan Africa who lack access to sanitary products and proper menstrual hygiene facilities. The platform enables donors to contribute regularly to charities focused on providing sanitary towels, clean water, and sanitation facilities to improve menstrual hygiene and reduce school absenteeism among girls.

## Problem Statement
Studies have shown that girls from poor families miss a significant portion of school days due to lack of sanitary towels. This project aims to automate the donation process, encouraging repeat donations to help charities meet their goals and provide necessary supplies and facilities.

## Features

### Donor
- View a variety of charities to donate to
- Create an account and log in
- Choose a charity and donate (one-time or recurring)
- Option to donate anonymously
- Set reminders for monthly donations
- View stories about beneficiaries
- Donate via third-party payment services (e.g., PayPal, Stripe)

### Charity
- Apply to be a charity on the platform
- Upon approval, set up charity details
- View donations from non-anonymous donors
- View total donations received
- Create and post stories about beneficiaries
- Maintain lists of beneficiaries and inventory

### Administrator
- Review and manage charity applications (approve/reject)
- Delete charities from the platform

## Technical Stack

- **Backend:** Python (Flask)
- **Database:** PostgreSQL
- **Frontend:** ReactJS with Redux Toolkit
- **Authentication:** JWT-based authentication
- **Testing:** Jest (Frontend), Minitests (Backend)
- **Payment Integration:** PayPal, Stripe, or other third-party services
- **Deployment:** To be determined

## Backend Structure

- Flask app with modular blueprints for authentication, charity, donor, donation, and admin routes
- SQLAlchemy ORM for database interactions
- Role-based access control for donors, charities, and administrators
- Support for anonymous and recurring donations
- Charity application workflow with admin approval

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd tuinue-wasichana-project
   ```

2. Create and activate a Python virtual environment:
   ```
   python3 -m venv backend/venv
   source backend/venv/bin/activate
   ```

3. Install backend dependencies:
   ```
   pip install -r backend/requirements.txt
   ```

4. Set up the database (PostgreSQL) and configure connection in `backend/app/config.py`.

5. Run database migrations:
   ```
   flask db upgrade
   ```

6. Start the backend server:
   ```
   flask run
   ```

7. For frontend setup, navigate to the `client` directory and follow the instructions in the frontend README.

## Usage

- Donors can register, log in, and make donations.
- Charities can apply and manage their profiles after approval.
- Admins can manage charity applications and platform data.

## Contributing

Contributions are welcome. Please fork the repository and submit pull requests.

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contact

For questions or support, please contact the project maintainers.
