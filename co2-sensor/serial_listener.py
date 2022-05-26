import serial
import requests

# api-endpoint
URL = "https://aggdetector.herokuapp.com/api/"
JWT = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNGQ4OTlmYzhhMDMzMjVlODljZjg1MSIsImlhdCI6MTY1MTI0MzY4MiwiZXhwIjoxNjU5MDE5NjgyfQ.hcpSkQIZrrQLqsTfouBRZVEPT1xTZFgH3tUWCoQSNrg"


def main():
    ser = serial.Serial('/dev/ttyACM0')
    print(ser.name)
    while True:
        val = str(ser.readline(), 'utf-8')
        # Formatted value
        val = val.rstrip('\r\n')

        # Send value to server
        r = requests.post(url=URL, headers={
                          'Authorization': f'Bearer {JWT}'}, data={'co2': val})


if __name__ == '__main__':
    main()
