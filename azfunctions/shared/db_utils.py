from shared.db import SessionLocal
from shared.models import MatchedEvent


def save_event_and_rule(event, rule):
    """
    Save the matched event and rule to the database.

    Args:
        event (dict): The matched event data.
        rule (dict): The rule that matched the event.
    """
    with SessionLocal() as session:
        try:
            matched_event = MatchedEvent(event_json=event, rule_json=rule)
            session.add(matched_event)
            session.commit()
            print(f"Saved matched event: {matched_event}")
        except Exception as e:
            session.rollback()
            raise
