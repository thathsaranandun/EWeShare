#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <SoftwareSerial.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>
#include <stdio.h>

// Set these to run example.
#define FIREBASE_HOST "ewe-share-36d42.firebaseio.com"
#define FIREBASE_AUTH "khXO2P9b88LEq1XrZiECdoS4whkiSMjmH5BWvIBw"
#define WIFI_SSID "HUAWEI nova 2i"
#define WIFI_PASSWORD "816cf7e4-5c8"

SoftwareSerial esp(D4, D5);

// set the LCD number of columns and rows
int lcdColumns = 16;
int lcdRows = 2;
LiquidCrystal_I2C lcd(0x3F, 16, 2); // set the LCD address to 0x3F for a 16 chars and 2 line display

int relay = 15; // the input to the relay pin
char chakey[6];
String auth_key;

int cha_id = 9;
float eng_val=0;
float pow_val=0;
bool charging = false;
bool lbl_check_1 = true;
bool lbl_check_2 = true;
int old_session;
int cur_session;

void setup()
{

    Serial.begin(9600);
    esp.begin(4800);

    // initialize LCD
    lcd.init();
    // turn on LCD backlight
    lcd.backlight();
    lcd.clear();

    // connect to wifi.
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("connecting");
    lcd.setCursor(0, 0);
    lcd.print("Connecting...");
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(500);
    }
    Serial.println();
    Serial.print("connected: ");

    Serial.println(WiFi.localIP());
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Connected:");
    lcd.setCursor(0, 1);
    lcd.print(WiFi.localIP());
    delay(500);

    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
    pinMode(relay, OUTPUT); // initialize pin as OUTPUT
    digitalWrite(relay, LOW);

    for (int i = 0; i <= 4; i++)
    {
        int k = random(60, 90);
        chakey[i] = (char)k;
    }
    String rc(chakey);
    auth_key = rc;
}

void loop()
{

    if (Firebase.getString("9/ard_key") == auth_key) //authentication check
    {
        if (lbl_check_1 == true) //one time authentication successfull line print
        {
            Serial.println("successfully authenticate");
            old_session = Firebase.getInt("9/session");
            cur_session = old_session + 1;
            Firebase.setInt("9/session", cur_session); //current session number setting
            lbl_check_1 = false;
        }

        Firebase.setBool("9/truth", true); //app functions enebling
        charging = Firebase.getBool("9/charging");
        if (charging == true) //switch on or off the relay(using user inputs)
        {
            lbl_check_2 = true;

            digitalWrite(relay, HIGH); //relay on
            if (esp.available() > 0)
            {
                pow_val = esp.parseFloat();
                eng_val = eng_val + pow_val / 3600;

                //display on serial monitor
                Serial.print("power: ");
                Serial.print(pow_val);
                Serial.print("KW");
                Serial.print('\n');
                Serial.print("energy: ");
                Serial.print(eng_val);
                Serial.print("KWh");
                Serial.print('\n');

                //display on lcd
                lcd.clear();
                lcd.setCursor(0, 0);
                lcd.print("Eng: ");
                lcd.print(eng_val);
                lcd.print("KW");
                lcd.setCursor(0, 1);
                lcd.print("Pow: ");
                lcd.print(pow_val);
                lcd.print("KWh");

                //send data to Firebase
                Firebase.setFloat("9/power_c", pow_val);
                // handle error
                if (Firebase.failed())
                {
                    Serial.print("9/power_c failed:");
                    Serial.println(Firebase.error());
                    return;
                }
                Firebase.setFloat("9/energy_c", eng_val);
                // handle error
                if (Firebase.failed())
                {
                    Serial.print("9/energy_c failed:");
                    Serial.println(Firebase.error());
                    return;
                }
            }
            else
            {
                Serial.println("serial communication error");
                delay(500);
            }
         delay(500);   
        }
        else
        {
            charging = false;
            digitalWrite(relay, LOW); //relay switch off code
            eng_val = 0;
            if (lbl_check_2 == true)
            {
                String link = String("9/session_logs/" + String(cur_session) + "/energy");
                Firebase.setFloat(link, eng_val);
                // handle error
                if (Firebase.failed())
                {
                    Serial.print("9/session_logs failed:");
                    Serial.println(Firebase.error());
                    return;
                }

                for (int i = 0; i <= 4; i++)
                {
                    int k = random(60, 90);
                    chakey[i] = (char)k;
                }
                String rc(chakey);
                auth_key = rc;

                lbl_check_2 = false;
            }
        }
    }
    else
    {
        charging = false;
        eng_val = 0;
        lbl_check_1=true;
        //send data to Firebase
        Firebase.setBool("9/charging", false);
        // handle error
        if (Firebase.failed())
        {
            Serial.print("9/charging failed:");
            Serial.println(Firebase.error());
            return;
        }

        //send data to Firebase
        Firebase.setBool("9/truth", false);
        // handle error
        if (Firebase.failed())
        {
            Serial.print("9/truth failed:");
            Serial.println(Firebase.error());
            return;
        }
        digitalWrite(relay, LOW); //relay switch off code
        Serial.println("Please enter authentication key");
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("Auth Key:");
        lcd.setCursor(0, 1);
        lcd.print(auth_key);
        lbl_check_1 = false;
        delay(100);
    }
}
