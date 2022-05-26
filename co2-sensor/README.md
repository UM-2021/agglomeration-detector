# CO2 Sensor - Serial Listener

## Prerequisites

- Arduino UNO loaded with the script: `co2-sensor-read.ino`
- Arduino UNO and CO2 sensor connected to the Coral Dev Board
- Python 3 installed in the Coral Dev Board

## Steps

### 1. Create a `.env` file in this directory

```bash
ROOMID=
JWT_TOKEN=
PROD_URL=
```

### 2. Install dependencies

```bash
pip install -r requirements.txt
```

### 3. Run the script

```bash
python3 serial_listener.py
```
