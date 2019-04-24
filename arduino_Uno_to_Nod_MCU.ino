#include "EmonLib.h"                   // Include Emon Library
#include <SoftwareSerial.h>
#include <Wire.h> 
#include <LiquidCrystal_I2C.h>

LiquidCrystal_I2C lcd(0x3F,20,4);  // set the LCD address to 0x3F for a 16 chars and 2 line display

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
    lcd.init();                      // initialize the lcd 
    lcd.backlight();

}

void loop() {
lcd.clear();
 double Irms = emon1.calcIrms(1480);  // Calculate Irms only
  float power_val=double(Irms*230.0); //power in wattes

  if(power_val < 5.00){
    power_val=0;
    
    }
    
    lcd.setCursor(0,0);
    lcd.print(power_val);
    lcd.print(" W");

  ArduinoUno.print(power_val);
  ArduinoUno.println("\n");
  Serial.print("Power usage: ");
  Serial.print(power_val);
  Serial.print("W");
  Serial.println("");
  

  energy_val=energy_val+(power_val/3600); //calculating consumed energy
  
  ArduinoUno.print(energy_val);
  ArduinoUno.println("\n");
    
    lcd.setCursor(0,1);
    lcd.print(energy_val);
    lcd.print(" Wh");
     Serial.print("Energy consumption: ");
  Serial.print(energy_val);
  Serial.print("Wh");
   Serial.println("");
  
  delay(300);
}
