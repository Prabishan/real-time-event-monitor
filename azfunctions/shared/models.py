from sqlalchemy.orm import DeclarativeBase
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column
from sqlalchemy import JSON, DateTime, func
from shared.db import Base


class MatchedEvent(Base):
    """Model for matched events."""

    __tablename__ = "matched_events"

    id: Mapped[int] = mapped_column(primary_key=True)
    event_json: Mapped[dict] = mapped_column(JSON)
    rule_json: Mapped[dict] = mapped_column(JSON)
    created_at: Mapped[DateTime] = mapped_column(DateTime, server_default=func.now())

    def __repr__(self):
        return f"<MatchedEvent(id={self.id}, event = {self.event_json}, rule = {self.rule_json} created_at={self.created_at})>"
