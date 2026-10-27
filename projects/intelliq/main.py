from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from . import models, schemas, database

app = FastAPI(
    title="INTELLIQ API",
    description="Official Association of AI & Data Science Portal API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://intelliq-tan.vercel.app", "http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/api/health")
def health_check():
    return {"status": "online", "service": "INTELLIQ Association Core", "version": "1.0.0"}

@app.get("/api/events", response_model=List[schemas.EventResponse])
def get_events(db: Session = Depends(database.get_db)):
    return db.query(models.Event).order_by(models.Event.date.desc()).all()

@app.post("/api/events/register", status_code=status.HTTP_201_CREATED)
def register_student(payload: schemas.RegistrationCreate, db: Session = Depends(database.get_db)):
    existing = db.query(models.Registration).filter(
        models.Registration.roll_no == payload.roll_no,
        models.Registration.event_id == payload.event_id
    ).first()
    if existing:
        raise HTTPException(status_code=400, detail="Student already registered for this event.")
    
    new_reg = models.Registration(**payload.dict())
    db.add(new_reg)
    db.commit()
    db.refresh(new_reg)
    return {"success": True, "registration_id": new_reg.id}