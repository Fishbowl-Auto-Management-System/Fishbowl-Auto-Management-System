import serial
import time
from influxdb import InfluxDBClient as influxdb



def temperature_management(arduino):
   
    message = 'temperature'
    arduino.write(message.encode())
    
    i = 0
    while i == 0:
        if arduino.readable():
            response = arduino.readline()
            response_text = response[:len(response)-1].decode(encoding='utf-8')
            response_text = response_text.strip()
            
            if response_text == 'end_point':
                print(response_text)
                i = 1
                return value_list
            else:
                response_list = response_text.split('/')
                if response_list[0] == 'temperature_management':
                    pass
                value_list = response_list[1] + '/' + response_list[2] + '/' + response_list[3]
                data = [
                        {
                            'measurement':'temperature',
                            'tags':{
                                'VisionUni':'2412',
                            },
                            'fields':{
                                'temperature_value':float(response_list[1])
                            }
                        }
                ]

                client = None
                try:
                    client = influxdb('localhost',8086,'root','root','fishbowl')
                except Exception as e:
                    print ("Exception" + str(e))
                if client is not None:
                    try:
                        client.write_points(data)
                    except Exception as e:
                        print("Exception write" + str(e))
                    finally:
                        client.close()

                print("running influxdb OK")
           
