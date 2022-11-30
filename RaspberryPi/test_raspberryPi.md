## main.py

```
from fastapi import FastAPI
from serialTest import serialTest

app = FastAPI()

@app.get("/default_temperature/{default_value}")
def main(default_value: int):
    return serialTest(default_value)
```

## serialTest.py

```
import serial

arduino = serial.Serial(port='COM4', baudrate=9600)

def serialTest(default_value):
    result = "." + str(default_value)
    arduino.write(result.encode())

    if arduino.readable():

        response = arduino.readline()
        print("@@@@@@아두이노 => 파이썬@@@@@@")
        print(response[:len(response)-1].decode())
```

## serialTest.py version2

```
import serial
import time

arduino = serial.Serial(port='COM4', baudrate=9600)

def serialTest():
    message = 'filtering'
    arduino.write(message.encode(encoding='utf-8'))
    time.sleep(1)
    
    i = 0
    while i == 0 :

        if(arduino.readable()):
            response = arduino.readline()
            response_text = response[:len(response) - 1].decode(encoding='utf-8')
            response_new_text = response_text.strip()

            if response_new_text == 'end_point':
                print(response_new_text)
                i = 1

            else:
                response_list = response_text.split('/')
                if response_list[0] == 'temperautre_management':
                    pass

                    if response_list[1] == 'now_value':
                        print(response_list[2])
                    elif response_list[1] == 'diff_value':
                        print(response_list[2])
                    elif response_list[1] == 'rotation_value':
                        print(response_list[2])
                else:
                    break
```
