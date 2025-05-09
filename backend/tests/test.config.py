from app.config import Config

def test_config_has_debug_flag():
    assert hasattr(Config, 'DEBUG')

def test_config_values():
    config = Config()
    assert config.SQLALCHEMY_TRACK_MODIFICATIONS is False