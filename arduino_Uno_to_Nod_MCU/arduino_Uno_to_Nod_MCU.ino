#include "EmonLib.h"                   // Include Emon Library
#include <SoftwareSerial.h>

SoftwareSerial ArduinoUno(3,2);
EnergyMonitor emon1;                   // Create an instance
float energy_val;

void setup() {
  Serial.begin(9600); //serial monitor port rate
  ArduinoUno.begin(4800);//Arduino UNO communication port rate
  
  //Arduino UNO communication pins configaration 
  pinMode (3,INPUT);
  pinMode (2,OUTPUT);

  emon1.current(1, 166.6);             // Current: input pin, calibration.

}

void loop() {
 double Irms = emon1.calcIrms(1480);  // Calculate Irms only
  float power_val=double((Irms*230.0)/1000); //power in wattes

  if(power_val < 0.02){
    power_val=0;
    
    }
    

  ArduinoUno.print(power_val);
  ArduinoUno.println("\n");
  Serial.print("Power usage: ");
  Serial.print(power_val);
  Serial.print("KW");
  Serial.println("");

  delay(200);
}
