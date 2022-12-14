import serial
import time
from influxdb import InfluxDBClient as influxdb


# 탁도를 백분율로 프린트 > 동작

def filtering_management(arduino):
    
    message = 'filtering'
    arduino.write(message.encode(encoding='utf-8'))
    time.sleep(1)
    flag = 0
    i = 0
    count = 0
    start_value = None
    end_value = None
    while i == 0:
        if arduino.readable():
            response = arduino.readline()
            response_text = response[:len(response)-1].decode(encoding='utf-8')
            response_text = response_text.strip()

            if response_text == 'end_point':
                print(response_text)
                return_value = "최초측정값:"+start_value+"마지막측정값"+end_value
                i = 1
                return return_value
            else:
                response_list = response_text.split('/')
                if response_list[0] == 'filtering_management':
                    pass

                if response_list[1] == 'now_value':
                    if count == 0:
                        start_value = response_list[2]
                    print(response_list[2])
                    end_value = response_list[2]
                    data = [
                            {
                                'measurement':'filtering',
                                'tags':{
                                    'VisionUni':'2411',
                                },
                                'fields':{
                                    'filtering_value':int(response_list[2])
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

