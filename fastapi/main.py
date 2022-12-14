from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI
from default_temperature import default_temperature
#from default_feeding import default_feeding
from temperature_management import temperature_management 
from filtering_management import filtering_management
from feeding_management import feeding_management

import serial
import time
from pydantic import BaseModel

app = FastAPI()

port_info = '/dev/ttyACM0'
baudrate_info = 9600
arduino = serial.Serial(port=port_info, baudrate = baudrate_info)


origins = ['*']
origins = ["http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins = origins,
    allow_credentials = True,
    allow_methods=['*'],
    allow_headers=['*']
        )

#@app.get("/")
#    return "hello world"

@app.get("/default_temperature/{default_value}")
def main(default_value: int):
    default_value = default_value
    return default_temperature(arduino, default_value)

@app.get("/temperature_management")
def main():
    return temperature_management(arduino)


@app.get("/filtering_management")
def main():
    return filtering_management(arduino)


#@app.get("/default_feeding/{default_value}")
#def main(default_value: int):
    #default_value = default_value
    #return default_feeding(default_value)

@app.get("/feeding_management")
def main():
    return feeding_management(arduino)
