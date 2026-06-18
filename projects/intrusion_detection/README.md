# Real-Time Network Intrusion Detection System (NIDS)

A lightweight signature-based Network Intrusion Detection System (NIDS) that binds raw sockets to incoming network traffic, parses structural IPv4 and TCP header byte arrays, and matches data fields against blocklisted IPs and suspicious port signature rules.

---

## 🚀 Running the Code - Step-by-Step Instructions

### Step 1: Install Dependencies
This project uses Python's core libraries (`socket`, `struct`, `json`, `os`) to maintain high performance and low levels of external package dependencies. Standard Python 3.8+ is required. No external library installations are mandatory.

### Step 2: Configure Rule Signatures
You can edit the `rules.json` configuration file to block specific IP addresses or restrict access to specific ports (e.g. SSH, FTP, Telnet, RDP):
* `blocked_ips`: An array of IPv4 addresses you want to flag.
* `suspicious_ports`: Ports you want to audit for connection attempts.

### Step 3: Run the Sniffer
Raw sockets require elevated Administrator or root user permissions to bind and inspect network adapters:

* **On Linux / macOS:**
  ```bash
  sudo python nids.py
  ```
* **On Windows (PowerShell or Command Prompt):**
  Open the terminal as **Administrator** and execute:
  ```bash
  python nids.py
  ```

---

## 🧪 Simulation Mode (Safe Fallback)
If you run the script without administrative permissions, it will catch the `PermissionError` and automatically launch in **Simulation Mode**:
```bash
python nids.py
```
Output:
```bash
[START] Network Intrusion Detection System active. Listening for packets...
[ERROR] Insufficient privileges. Raw socket sniffing requires Administrator/Root rights.
[INFO] Falling back to simulated capture packets loop...
[SIMULATION] Streaming simulated TCP/UDP headers. Press Ctrl+C to stop.
```

### Validating Alerts
During packet capture (or simulation), the engine will output red-flag alerts in real-time on your screen:
1. **Blocked IP Detections**:
   ```bash
   [12:05:32] 🚨 [ALERT] Unauthorized IP connection attempt: 10.0.0.99 -> 192.168.1.1
   ```
2. **Restricted Port Scans**:
   ```bash
   [12:05:34] 🚨 [ALERT] Connection on restricted port 445 from 192.168.1.105
   ```
3. **Cleartext Secret Flags**:
   ```bash
   [12:05:36] ⚠️ [CRITICAL] Unencrypted login credentials detected from 192.168.1.105 on port 21
   ```
