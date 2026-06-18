import smtplib
from email.mime.text import MIMEText
import os

def send_aqi_alert(sensor_id, current_val, predicted_val):
    """Sends SMTP alert notifications to facilities teams for immediate ventilation override."""
    sender_email = "facilities-aqi@college.edu"
    receiver_email = "tharanishbalaa@gmail.com" # Admin notification target
    
    msg_content = f"""
    ⚠️ WARNING: CRITICAL AIR QUALITY THRESHOLD EXCEEDED
    ---------------------------------------------------
    Sensor Location: {sensor_id}
    Current Local AQI: {current_val:.2f}
    Predicted AQI (Next Hour): {predicted_val:.2f}
    
    Action Required: Please enable auxiliary ventilation and fresh-air intake units immediately.
    """
    
    msg = MIMEText(msg_content)
    msg['Subject'] = f"🚨 AQI Alert: High Pollution Forecasted at {sensor_id}"
    msg['From'] = sender_email
    msg['To'] = receiver_email
    
    try:
        # Set up SMTP handler (Uses public Mailtrap sandbox or standard SMTP)
        # In production, load actual SMTP credentials from environment variables
        smtp_host = os.environ.get("SMTP_HOST", "smtp.mailtrap.io")
        smtp_port = int(os.environ.get("SMTP_PORT", 2525))
        smtp_user = os.environ.get("SMTP_USER", "mock_username")
        smtp_pass = os.environ.get("SMTP_PASS", "mock_password")

        with smtplib.SMTP(smtp_host, smtp_port) as server:
            if smtp_user != "mock_username":
                server.starttls()
                server.login(smtp_user, smtp_pass)
            server.sendmail(sender_email, [receiver_email], msg.as_string())
        print(f"[EMAIL] Alert message transmitted successfully for {sensor_id}.")
    except Exception as e:
        print(f"[ERROR] Failed to send email alert: {e}")
