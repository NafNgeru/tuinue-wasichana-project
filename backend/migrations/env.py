import os
import logging                               # ← add this
from dotenv import load_dotenv
from logging.config import fileConfig
from alembic import context
from sqlalchemy import engine_from_config, pool

# 1. load the .env from your project root
load_dotenv(dotenv_path=os.path.join(os.getcwd(), '.env'))

# 2. grab the Alembic Config
config = context.config

# 3. override the sqlalchemy.url with your env var
db_url = os.environ.get('DATABASE_URL')
if not db_url:
    raise RuntimeError("DATABASE_URL not set in environment")
config.set_main_option('sqlalchemy.url', db_url)

# 4. set up logging
fileConfig(config.config_file_name)
logger = logging.getLogger('alembic.env')

# 5. import your SQLAlchemy db object for metadata
#    adjust this path to wherever you define `db = SQLAlchemy()`:
from app.db import db                         # ← e.g. if your db instance is in app/db.py
target_metadata = db.metadata

def run_migrations_offline():
    """Run migrations in 'offline' mode."""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
    )
    with context.begin_transaction():
        context.run_migrations()

def run_migrations_online():
    """Run migrations in 'online' mode."""
    connectable = engine_from_config(
        config.get_section(config.config_ini_section),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )
    with connectable.connect() as connection:
        context.configure(
            connection=connection,
            target_metadata=target_metadata,
            compare_type=True,  # optional: detect column type changes
        )
        with context.begin_transaction():
            context.run_migrations()

if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
