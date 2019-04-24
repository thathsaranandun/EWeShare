#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <SoftwareSerial.h>

// Set these to run example.
#define FIREBASE_HOST "ewe-share-36d42.firebaseio.com"
#define FIREBASE_AUTH "khXO2P9b88LEq1XrZiECdoS4whkiSMjmH5BWvIBw"
#define WIFI_SSID "HUAWEI nova 2i"
#define WIFI_PASSWORD "816cf7e4-5c8"
SoftwareSerial esp(D2,D3);

void setup() {
  Serial.begin(9600);
  esp.begin(4800);

  // connect to wifi.
  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("connected: ");
  Serial.println(WiFi.localIP());
  
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
}

int n = 0;
float val;

void loop() {

   while(esp.available()>0)
  {
     float val = esp.parseFloat();
     if(esp.read()=='\n')
     {
       Serial.println(val);
       
     }

  // set value
  Firebase.setFloat("number", val);
  // handle error
  if (Firebase.failed()) {
      Serial.print("setting /number failed:");
      Serial.println(Firebase.error());  
      return;
  }
  delay(100);
  


  // get value 
  Serial.print("number: ");
  Serial.println(Firebase.getFloat("number"));
  delay(100);


  // append a new value to /logs
  String name = Firebase.pushInt("logs", n++);
  // handle error
  if (Firebase.failed()) {
      Serial.print("pushing /logs failed:");
      Serial.println(Firebase.error());  
      return;
  }
  Serial.print("pushed: /logs/");
  Serial.println(name);
  delay(100);
  }
}
