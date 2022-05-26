import serial
import requests
import os
from dotenv import load_dotenv
load_dotenv()

# Room ID
ROOMID = os.environ['ROOMID']

# Prod URL
URL = f"{os.environ['PROD_URL']}/api/liveReports/room/{ROOMID}/stats/co2"
# Dev URL
# URL = f"http://localhost:3000/api/liveReports/room/{ROOMID}/stats/co2"

# JWT Token
JWT = os.environ['JWT_TOKEN']


def main():
    ser = serial.Serial('/dev/ttyACM0')
    print(ser.name)

    measures = []
    while True:
        val = str(ser.readline(), 'utf-8').rstrip('\r\n')
        measures.append(int(val))

        # Send value to server every 5 minutes aprox.
        if len(measures) % 150 == 0:
            avg = sum(measures) / len(measures)
            measures.clear()

            requests.post(url=URL, headers={
                'Authorization': f'Bearer {JWT}'}, data={'measure': str(avg)})
            print(f"Value sent: {avg}")


if __name__ == '__main__':
    main()
