```C
#include <OneWire.h> //수온센서 라이브러리
#include <DallasTemperature.h> //수온센서 라이브러리
#include <Stepper.h> //스탭모터
#include <Servo.h> //서보모터

//수온센서 연결된 핀
#define ONE_WIRE_BUS 2

//탁도센서 연결된 핀
#define TAKDO A1

// 워터펌프 어항 => 화분
#define WATERPUMP_1 6
#define WATERPUMP_2 7

#define SERVO 12

//Setup a oneWire instance to communicate with any OneWire device
OneWire oneWire(ONE_WIRE_BUS);

//Pass oneWire referance to DallasTemperature library
DallasTemperature sensors(&oneWire);

// 2048:한바퀴(360도), 1024:반바퀴(180도)...
const int stepsPerRevolution = 2048;

// 모터 드라이브에 연결된 핀 IN4, IN2, IN3, IN1
Stepper myStepper(stepsPerRevolution,11,9,10,8);

int rotation = 0;
int post_temp = 30;

int max_temp = 0;
int min_temp = 0;

// Servo motor Configuration
Servo servo;

//온도 초기 세팅
void default_temperature(int default_temp){

  min_temp = 20;
  max_temp = 34;
  //1도가 움직일때 0.6
  // open issue: 소수점 몇째짜리까지 되는지 모름
  rotation = stepsPerRevolution / (max_temp - min_temp);
  // - => 하강
  // + => 상승
  myStepper.step(rotation * (default_temp - min_temp + 1.5));
  delay(3000);
  Serial.println("end_point");
}

//환수 시스템
void filtering_management(){

  int takdo_data = 0;
  int i = 0;
  while(i == 0){
  //탁도 데이터
    takdo_data = analogRead(TAKDO);
    takdo_data = takdo_data * 2;
  
  //탁도가 기준을 넘어갔을 경우
    if(takdo_data < 1400){
      digitalWrite(WATERPUMP_1,HIGH);
      digitalWrite(WATERPUMP_2,LOW);
      Serial.println((String) "filtering_management/now_value/" + takdo_data);
    }else{
      digitalWrite(WATERPUMP_1,LOW);
      digitalWrite(WATERPUMP_2,LOW);

      Serial.println((String) "filtering_management/now_value/" + takdo_data);
      Serial.println("end_point");
      i = 1;
    }
  }
  // filtering_management/now_value/{data}
  
}

//온도 관리 시스템
void temperature_management(){
  // int voltage = analogRead(TEMP_PIN);0
  // float temp = voltage * 5.0 * 100 / 1024;

  // Send the command to get temperatures
  sensors.requestTemperatures(); 
  float temp = sensors.getTempCByIndex(0);
  
  // Serial.println(temp);

  float compare_temp = temp - post_temp;
  
  if(temp > max_temp){
    compare_temp = max_temp - temp;
    myStepper.step(rotation * compare_temp);
    post_temp = max_temp;
  } else if (temp <min_temp){ 
      compare_temp = min_temp - temp;
      myStepper.step(rotation * compare_temp);
      post_temp = min_temp;
  } else{ 
    if(compare_temp > 0){
      myStepper.step(rotation * compare_temp);
      post_temp = temp;
    }else{
      myStepper.step(-rotation * compare_temp);
      post_temp = temp;
    }
  }
  
  // versionV1
  // Serial.println((String) "temperature_management/now_value/" + temp);
  // delay(3000);
  // Serial.println((String) "temperature_management/diff_value/" + compare_temp);
  // delay(3000);
  // Serial.println((String) "temperature_management/rotation_value/" + rotation * compare_temp);

  ///versionV2
  Serial.println((String)"temperature_management/" + temp + "/" + compare_temp + "/" + rotation * compare_temp);
  Serial.println("end_point");
}


//먹이배급 함수
void feeding_management(){

  servo.write(180);
  delay(1000);
  servo.write(0);

  Serial.println("end_point");
}

void setup(){

  // 온도 센서 설정
  sensors.begin(); //Start up the libratry

  //시리얼 모니터
  Serial.begin(9600);

  //step motor 속도 설정
  myStepper.setSpeed(2);

  // 서보모터 0도 초기화
  servo.attach(SERVO);
  servo.write(0);
  
  pinMode(TAKDO,INPUT); //탁도센서 A1핀 입력
  pinMode(WATERPUMP_1,OUTPUT); //워터펌프1 OUTPUT
  pinMode(WATERPUMP_2,OUTPUT); //워터펌프2 OUTPUT

}

void loop(){

  //filtering_management();
  
  // serial 포트에 들어온 데이터가 있을 경우
  if(Serial.available() > 0){
    String inputStr = Serial.readString(); //값 읽기
    inputStr.trim();
     if(inputStr.indexOf(".") >= 0){
        inputStr = inputStr.substring(1, inputStr.length());
        default_temperature(inputStr.toInt());

     } else if(inputStr.equals("temperature")){
        temperature_management();

     } else if(inputStr.equals("filtering")){
        filtering_management();

     } else if(inputStr.equals("feeding")){
        feeding_management();
     }
    }
}
```