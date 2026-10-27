from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Boolean
from sqlalchemy.sql import func
from .database import Base

class Event(Base):
    __tablename__ = "events"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    description = Column(Text, nullable=False)
    category = Column(String(50), default="Technical")
    speaker = Column(String(100), nullable=True)
    date = Column(DateTime(timezone=True), nullable=False)
    capacity = Column(Integer, default=100)
    is_active = Column(Boolean, default=True)

class Registration(Base):
    __tablename__ = "registrations"
    id = Column(Integer, primary_key=True, index=True)
    event_id = Column(Integer, ForeignKey("events.id"), nullable=False)
    student_name = Column(String(100), nullable=False)
    roll_no = Column(String(20), index=True, nullable=False)
    department = Column(String(50), default="AI & DS")
    email = Column(String(100), nullable=False)
    timestamp = Column(DateTime(timezone=True), server_default=func.now())