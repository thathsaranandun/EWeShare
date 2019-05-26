#include "EmonLib.h"                   // Include Emon Library
#include <SoftwareSerial.h>

SoftwareSerial ArduinoUno(3,2);
EnergyMonitor emon1;                   // Create an instance
float energy_val;

void setup() {
  Serial.begin(9600); //serial monitor port rate
  ArduinoUno.begin(115200);//Arduino UNO communication port rate
  
  //Arduino UNO communication pins configaration 
  pinMode (3,INPUT);
  pinMode (2,OUTPUT);

  emon1.current(1, 188.8);             // Current: input pin, calibration. 

}

void loop() {
  double Irms = emon1.calcIrms(1480);  // Calculate Irms only
  float power_val=double(Irms*230.0); //power in wattes

  if(power_val < 350.00){
    power_val=0;
    
    }
    

  ArduinoUno.print(power_val);
  ArduinoUno.print("\t");
  Serial.print("Power usage: ");
  Serial.print(power_val);
  Serial.print("W");
  Serial.println("");
  

  energy_val=energy_val+(power_val/3600); //calculating consumed energy
  
  ArduinoUno.print(energy_val);
  ArduinoUno.print("\n");
    
  Serial.print("Energy consumption: ");
  Serial.print(energy_val);
  Serial.print("Wh");
  Serial.println("");

  delay(1690);
}