from shared.db import engine, Base
from models import MatchedEvent

if __name__ == "__main__":
    # Create the tables in the database
    print("Creating tables...")
    Base.metadata.create_all(engine)
    print("Tables created successfully.")
