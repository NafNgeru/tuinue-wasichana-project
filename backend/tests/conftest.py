import os
import pytest
from dotenv import load_dotenv
from app import create_app, db as _db

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '..', '.env.test'))
TEST_DATABASE_URI = os.getenv('TEST_DATABASE_URL')


@pytest.fixture(scope='session')
def app():
    """Session-wide test Flask application."""
    os.environ['DATABASE_URL'] = TEST_DATABASE_URI
    app = create_app()

    app.config.update({
        'TESTING': True,
        'SQLALCHEMY_DATABASE_URI': TEST_DATABASE_URI,
        'SQLALCHEMY_TRACK_MODIFICATIONS': False
    })

    return app


@pytest.fixture(scope='session')
def db(app):
    with app.app_context():
        _db.drop_all()
        _db.create_all()
        yield _db
        _db.session.remove()
        _db.drop_all()


@pytest.fixture(scope='function')
def session(db):
    connection = db.engine.connect()
    transaction = connection.begin()

    options = {'bind': connection, 'binds': {}}
    session = db.create_scoped_session(options=options)
    db.session = session

    yield session

    transaction.rollback()
    connection.close()
    session.remove()


@pytest.fixture
def client(app):
    """Flask test client."""
    return app.test_client()