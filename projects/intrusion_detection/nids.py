#!/usr/bin/env python3
"""
Real-Time Network Intrusion Detection System (NIDS)
Captures and analyzes network packets to detect security threats
Requires Administrator/Root privileges for raw socket binding
"""

import socket
import struct
import json
import os
import sys
import threading
from datetime import datetime
from collections import defaultdict

# Alert tracking to prevent duplicate notifications
alert_cache = defaultdict(list)
THREAD_LOCK = threading.Lock()

class NIDSEngine:
    """Real-time Network Intrusion Detection System"""
    
    def __init__(self, rules_file="rules.json"):
        """Initialize NIDS with signature rules"""
        self.rules = self.load_signatures(rules_file)
        self.packet_count = 0
        self.threat_count = 0
        self.start_time = datetime.now()
        
    def load_signatures(self, rule_file):
        """Load blocking rules from JSON configuration"""
        if os.path.exists(rule_file):
            try:
                with open(rule_file, "r") as f:
                    return json.load(f)
            except json.JSONDecodeError:
                print(f"[ERROR] Invalid JSON in {rule_file}")
        return {
            "blocked_ips": ["192.168.1.105", "10.0.0.99", "185.190.140.2"],
            "suspicious_ports": [21, 23, 139, 445, 3389, 8080],
            "alert_threshold": 0.8
        }
    
    def parse_ipv4_packet(self, data):
        """Decode IPv4 header structure from raw bytes"""
        if len(data) < 20:
            return None
            
        try:
            version_header_len = data[0]
            header_len = (version_header_len & 15) * 4
            ttl, proto, src, target = struct.unpack('! 8x B B 2x 4s 4s', data[:20])
            return ttl, proto, self.format_ipv4(src), self.format_ipv4(target), data[header_len:]
        except struct.error:
            return None
    
    @staticmethod
    def format_ipv4(addr):
        """Convert raw bytes to IPv4 dotted-decimal notation"""
        return '.'.join(map(str, addr))
    
    def analyze_packet(self, proto, src_ip, dest_ip, payload):
        """Analyze packet for security threats and anomalies"""
        self.packet_count += 1
        
        # Check blocklisted IP addresses
        if src_ip in self.rules.get("blocked_ips", []):
            self.log_alert(f"🚨 [CRITICAL] Blocked IP detected: {src_ip} -> {dest_ip}", "CRITICAL")
            self.threat_count += 1
        
        # Analyze TCP packets
        if proto == 6:
            if len(payload) >= 20:
                src_port, dest_port = struct.unpack('! H H', payload[:4])
                
                if dest_port in self.rules.get("suspicious_ports", []):
                    self.log_alert(f"⚠️ [HIGH] Suspicious port {dest_port} accessed from {src_ip}", "HIGH")
                    self.threat_count += 1
                
                # Detect cleartext credentials
                try:
                    text_payload = payload[20:].decode('utf-8', errors='ignore').upper()
                    if any(kw in text_payload for kw in ["USER ", "PASS ", "LOGIN", "PASSWORD"]):
                        self.log_alert(f"🔓 [CRITICAL] Cleartext credentials from {src_ip}:{src_port}", "CRITICAL")
                        self.threat_count += 1
                except:
                    pass
    
    def log_alert(self, message, severity):
        """Log security alerts with timestamp and severity"""
        timestamp = datetime.now().strftime('%H:%M:%S')
        print(f"[{timestamp}] {message}")
    
    def start_sniffing(self):
        """Start real-time packet sniffing and analysis"""
        print("\\n[START] Network Intrusion Detection System initialized.")
        print(f"[CONFIG] Monitoring {len(self.rules['blocked_ips'])} blocked IPs and {len(self.rules['suspicious_ports'])} restricted ports")
        print("[INFO] Listening for packets... Press Ctrl+C to exit.\\n")
        
        try:
            self._bind_raw_socket()
        except PermissionError:
            print("[ERROR] Insufficient privileges for raw socket binding.")
            self.run_simulation()
        except Exception as e:
            print(f"[ERROR] {e}")
            self.run_simulation()
    
    def _bind_raw_socket(self):
        """Bind to raw socket and capture live packets"""
        if os.name == "nt":
            conn = socket.socket(socket.AF_INET, socket.SOCK_RAW, socket.IPPROTO_IP)
            conn.bind(("0.0.0.0", 0))
            conn.setsockopt(socket.IPPROTO_IP, socket.IP_HDRINCL, 1)
            conn.ioctl(socket.SIO_RCVALL, socket.RCVALL_ON)
        else:
            conn = socket.socket(socket.AF_PACKET, socket.SOCK_RAW, socket.ntohs(3))
        
        try:
            while True:
                raw_data, addr = conn.recvfrom(65535)
                packet_data = self.parse_ipv4_packet(raw_data)
                if packet_data:
                    ttl, proto, src_ip, dest_ip, payload = packet_data
                    self.analyze_packet(proto, src_ip, dest_ip, payload)
        except KeyboardInterrupt:
            print("\\n[STOP] Packet capture stopped.")
        finally:
            if os.name == "nt":
                conn.ioctl(socket.SIO_RCVALL, socket.RCVALL_OFF)
            conn.close()
    
    def run_simulation(self):
        """Run simulation mode with mock network traffic"""
        print("[FALLBACK] Entering simulation mode with mock packet stream...\\n")
        
        import time
        import random
        
        mock_packets = [
            (6, "192.168.1.105", "10.0.0.1", b"\\x1f\\x90\\x00\\x17USER admin\\r\\nPASS secret123"),
            (6, "203.0.113.45", "192.168.1.1", b"\\x00\\x15\\x00\\x50HTTP GET request"),
            (17, "10.0.0.99", "8.8.8.8", b"\\x00\\x35\\x00\\x35DNS QUERY c2.botnet.com"),
            (6, "185.190.140.2", "172.16.0.1", b"\\xfe\\x80NMAP Port Scan"),
            (6, "192.168.1.50", "192.168.1.1", b"\\x01\\xbb\\x00\\x50SSH login attempt"),
        ]
        
        try:
            while True:
                proto, src, dest, payload = random.choice(mock_packets)
                self.analyze_packet(proto, src, dest, payload)
                time.sleep(random.uniform(1, 3))
        except KeyboardInterrupt:
            print("\\n[STOP] Simulation ended.")

def main():
    """Main entry point"""
    print("═" * 60)
    print("🔐 Real-Time Network Intrusion Detection System (NIDS) v1.0")
    print("═" * 60)
    
    nids = NIDSEngine()
    nids.start_sniffing()

if __name__ == "__main__":
    main()
