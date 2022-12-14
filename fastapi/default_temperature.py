import serial
import time

    
def default_temperature(arduino, default_value):
    
    message = '.'+str(default_value)
    arduino.write(message.encode())

    i = 0 
    while i==0:
        if arduino.readable():
            response = arduino.readline()
            response_text = response[:len(response)-1].decode()
            response_text = response_text.strip()

            if response_text == 'end_point':
                print(response_text)
                return response_text
                i = 1
            else: print("arduino messaging error")
