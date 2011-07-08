#include <Servo.h>
#define YAXIS 255
#define XAXIS 254
#define MAXANGLE 180
#define MINANGLE 0 //lower limit for single bytes to be sent through serial

Servo xaxis;
Servo yaxis;

int pos = 0;
boolean xMotor = true;
int xaxisPort = 9;
int yaxisPort = 10;

void setup() {
    xaxis.attach(xaxisPort);
    yaxis.attach(yaxisPort);
    Serial.begin(9600);
}

void loop() {
     if (Serial.available() > 0) {
        int incomingBits = Serial.read();
        Serial.println(incomingBits, DEC);
        if (incomingBits == XAXIS) {
          xMotor = true;
          Serial.println("X axis");
        }  
        else if (incomingBits == YAXIS) {
          xMotor = false;
          Serial.println("Y axis");
        }
        else {
          setAngle(incomingBits, xMotor);
          Serial.println(incomingBits);
        }
     }
}

void setAngle(int angle, boolean xMotorToBeSet) {
  if (angle < MAXANGLE || angle > MINANGLE) {
    if (xMotorToBeSet)  {
      xaxis.write(angle);
    }
    else {
      yaxis.write(angle);
    }
  }
}
  
      /*
      if (incomingBits != -1 && incomingBits < 180 && incomingBits > -180 ) { 
          myservo.write(incomingBits);  
      
      }
      Serial.flush();
      delay(50);   
      */
/*
    for(pos = 0; pos < 180; pos+=10) {
        myservo.write(pos);
        delay(15);      
    }
    
    for(pos = 180; pos >= 1; pos-=10) {
       myservo.write(pos);
       delay(15); 
    }
*/ 

