#!/usr/bin/env python3
"""
Academic Timetable & On-Duty (OD) Verification Engine
Handles Indian Standard Time (IST) slot calculations, grace window enforcement,
and automated OD status resolution.
"""

from datetime import datetime, date, time
from typing import Dict, Any, List, Optional
import pytz

IST = pytz.timezone("Asia/Kolkata")

# Master Collegiate Timetable Configuration (Mon - Fri)
PERIOD_SLOTS = [
    {"period": 1, "start": time(9, 0), "end": time(9, 55), "label": "Period 1"},
    {"period": 2, "start": time(9, 55), "end": time(10, 50), "label": "Period 2"},
    {"period": 3, "start": time(11, 5), "end": time(12, 0), "label": "Period 3"},
    {"period": 4, "start": time(12, 0), "end": time(12, 55), "label": "Period 4"},
    {"period": 5, "start": time(13, 45), "end": time(14, 40), "label": "Period 5"},
    {"period": 6, "start": time(14, 40), "end": time(15, 35), "label": "Period 6"},
    {"period": 7, "start": time(15, 45), "end": time(16, 30), "label": "Period 7"},
]

def get_server_ist_time() -> datetime:
    """Returns authoritative server-side IST timestamp."""
    return datetime.now(IST)

def resolve_active_period(now_dt: Optional[datetime] = None) -> Optional[Dict[str, Any]]:
    """
    Identifies the active timetable period according to IST clock.
    Includes configured 15-minute grace period for post-lecture attendance logging.
    """
    if now_dt is None:
        now_dt = get_server_ist_time()

    current_time = now_dt.time()

    for slot in PERIOD_SLOTS:
        start = slot["start"]
        end = slot["end"]
        # Allow 15 min grace lockout
        grace_hour = end.hour + (end.minute + 15) // 60
        grace_minute = (end.minute + 15) % 60
        grace_end = time(grace_hour, grace_minute, 0)

        if start <= current_time <= grace_end:
            return {
                **slot,
                "is_live": start <= current_time <= end,
                "in_grace_window": end < current_time <= grace_end
            }

    return None

def check_on_duty_conflict(
    student_id: int,
    target_date: date,
    period_id: int,
    od_records: List[Dict[str, Any]]
) -> Optional[Dict[str, Any]]:
    """
    Determines if a student is covered by an approved On-Duty (OD) request,
    preventing wrongful absent marking.
    """
    for od in od_records:
        if (
            od.get("student_id") == student_id
            and od.get("date") == target_date
            and od.get("status") == "APPROVED"
        ):
            periods = od.get("period_ids", [])
            if period_id in periods or len(periods) == 0:
                return od
    return None
