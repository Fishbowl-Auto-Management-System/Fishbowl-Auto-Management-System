import serial
from influxdb import InfluxDBClient as influxdb
#시간
#언제 동작했는지

def feeding_management(arduino):
    
    message = 'feeding'
    arduino.write(message.encode(encoding='utf-8'))
    
    i = 0
    while i == 0:
        
        if arduino.readable():
            response = arduino.readline()
            response_text = response[:len(response)-1].decode(encoding='utf-8')
            response_text = response_text.strip()
            if response_text == 'end_point':
                print("feeding 종료")
                data = [
                        {
                            'measurement':'feeding',
                            'tags':{
                                'VisionUni':'2410',
                            },
                            'fields':{
                                'feeding_value':1
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
                return response_text
                i = 1
            
            else:
                print("feeding_management_error")
