#include <ESP8266WiFi.h>
#include <FirebaseArduino.h>
#include <SoftwareSerial.h>
#include <LiquidCrystal_I2C.h>
#include <Wire.h>
#include <stdio.h>
#include <TimeLib.h>
#include <WiFiUdp.h>

// Set these to run example.
#define TIME_HEADER "T" // Header tag for serial time sync message
#define TIME_REQUEST 7  // ASCII bell character requests a time sync message
#define FIREBASE_HOST "ewe-share-36d42.firebaseio.com"
#define FIREBASE_AUTH "khXO2P9b88LEq1XrZiECdoS4whkiSMjmH5BWvIBw"
#define WIFI_SSID "HUAWEI nova 2i"
#define WIFI_PASSWORD "816cf7e4-5c8"

SoftwareSerial esp(2, 14);

// set the LCD number of columns and rows
int lcdColumns = 16;
int lcdRows = 2;
LiquidCrystal_I2C lcd(0x3F, 16, 2); // set the LCD address to 0x3F for a 16 chars and 2 line display

int relay = 15; // the input to the relay pin
char chakey[6];
String auth_key;

static const char ntpServerName[] = "0.asia.pool.ntp.org";
const int timeZone = 5;

WiFiUDP Udp;
unsigned int localPort = 8888; // local port to listen for UDP packets
time_t getNtpTime();

int cha_id = 9;
float eng_val = 0;
float teng_val = 0;
float pow_val = 0;
bool charging = false;
bool check_1 = true;
bool check_2 = true;
int old_session;
int cur_session;

void setup()
{

    Serial.begin(9600);
    esp.begin(115200);
    // initialize LCD
    lcd.init();
    // turn on LCD backlight
    lcd.backlight();
    lcd.clear();

    // connect to wifi.
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    Serial.print("connecting");
    lcd.setCursor(0, 0);
    lcd.print("Connecting to");
    lcd.setCursor(0, 1);
    lcd.print("WIFI....");
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

    Udp.begin(localPort);
    setSyncProvider(getNtpTime);
    setSyncInterval(300);

    Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH);
    pinMode(relay, OUTPUT); // initialize pin as OUTPUT
    digitalWrite(relay, LOW);//relay off
    authkey();//set authentication key
}
void loop()
{
    if (Firebase.getString("9/ard_key") == auth_key)//check user entered authentication key
    {
        check_2 = true;
        if (check_1 == true)
        {
            Serial.println("successfully authenticate");
            old_session = Firebase.getInt("logs/9/session");
            cur_session = old_session + 1;
            Firebase.setInt("logs/9/session", cur_session); //current session number setting
            check_1 = false;
        }

        Firebase.setBool("9/truth", true); //app functions enebling
        charging = Firebase.getBool("9/charging");
        if (charging == true)
        {
            digitalWrite(relay, HIGH); //relay on
            
            if (esp.isListening())
            {
                Serial.println("esp is listening!");//checking serial communication is listening

                if (esp.available())//checking serial communication data is listening
                {

                    while (charging == true)
                    {
                        pow_val = (esp.parseFloat() / 1000);//getting power value
                        //round values
                        pow_val=round(pow_val*1000)/1000;
                        if (esp.read() == '\t')
                        {
                            teng_val = esp.parseFloat();//getting total power passe after Iot started
                        }
                        esp.read() == '\n';
                        eng_val = (eng_val + 2 * (pow_val / 3600));//power value

                        //round values
                        eng_val=round(eng_val*1000)/1000;
                        //display details in serial port
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
                        Firebase.setFloat("9/power_c", (pow_val));//power value
                        // handle error
                        if (Firebase.failed())
                        {
                            Serial.print("9/power_c failed:");
                            Serial.println(Firebase.error());
                            return;
                        }
                        Firebase.setFloat("9/energy_c", eng_val);//energy consumption
                        // handle error
                        if (Firebase.failed())
                        {
                            Serial.print("9/energy_c failed:");
                            Serial.println(Firebase.error());
                            return;
                        }
                        charging = Firebase.getBool("9/charging");//checking charger is turn off or on
                    }
                }
                else
                {
                    Serial.println("serial communication error");
                    delay(690);
                    Firebase.setBool("9/charging", false);
                    digitalWrite(relay, LOW); //relay switch off code
                }
        }
            charging = Firebase.getBool("9/charging");
        }
        else
        {
            //charging stoped
            digitalWrite(relay, LOW); //relay switch off code
            //display cost
            lcd.clear();
            lcd.setCursor(0, 0);
            lcd.print("eng : ");
            lcd.print(eng_val);
            lcd.print(" KWh");
            lcd.setCursor(0, 1);
            lcd.print("cost- Rs: ");
            String cost = Firebase.getString("9/cost");
            lcd.print(cost);
            //on serial port
            Serial.printf("energy consumption: %f",eng_val);
            Serial.print("cost: "+cost);
        }
    }
    else
    {
        //charging stoped
        charging = false;
        Firebase.setBool("9/charging", false);
        digitalWrite(relay, LOW); //relay switch off code
        //app functions disabling
        Firebase.setBool("9/truth", false);
        check_1 = true;

        if (check_2 == true) //one repetition
        {
            //setting data to firbase log
            String link = String("logs/9/session_logs/" + String(cur_session) + "/energy");
            Firebase.setFloat(link, eng_val);
            String time_date = String(String(year()) + "/" + String(month()) + "/" + String(day()) + "-" + String(hour()) + ":" + String(minute()) + ":" + String(second()));
            Firebase.setString("logs/9/session_logs/" + String(cur_session) + "/time_stamp", time_date);
            // handle error
            if (Firebase.failed())
            {
                Serial.print("logs/9/session_logs failed:");
                Serial.println(Firebase.error());
                return;
            }
            authkey();
            Firebase.setString("9/ard_key", "");
            check_2 = false;
        }
        //display authentication key
        lcd.clear();
        lcd.setCursor(0, 0);
        lcd.print("Auth Key:");
        lcd.setCursor(0, 1);
        lcd.print(auth_key);
        eng_val = 0;
        pow_val = 0;
        Firebase.setInt("9/cost", 0);
    }
}

void authkey()//random authentication key genarate
{
    for (int i = 0; i <= 4; i++)
    {
        int k = random(60, 90);
        chakey[i] = (char)k;
    }
    String rc(chakey);
    auth_key = rc;
}
/*-------- NTP code ----------*/

const int NTP_PACKET_SIZE = 48;     // NTP time is in the first 48 bytes of message
byte packetBuffer[NTP_PACKET_SIZE]; //buffer to hold incoming & outgoing packets

time_t getNtpTime()
{
    IPAddress ntpServerIP; // NTP server's ip address

    while (Udp.parsePacket() > 0)
        ; // discard any previously received packets
    Serial.println("Transmit NTP Request");
    // get a random server from the pool
    WiFi.hostByName(ntpServerName, ntpServerIP);
    Serial.print(ntpServerName);
    Serial.print(": ");
    Serial.println(ntpServerIP);
    sendNTPpacket(ntpServerIP);
    uint32_t beginWait = millis();
    while (millis() - beginWait < 1500)
    {
        int size = Udp.parsePacket();
        if (size >= NTP_PACKET_SIZE)
        {
            Serial.println("Receive NTP Response");
            Udp.read(packetBuffer, NTP_PACKET_SIZE); // read packet into the buffer
            unsigned long secsSince1900;
            // convert four bytes starting at location 40 to a long integer
            secsSince1900 = (unsigned long)packetBuffer[40] << 24;
            secsSince1900 |= (unsigned long)packetBuffer[41] << 16;
            secsSince1900 |= (unsigned long)packetBuffer[42] << 8;
            secsSince1900 |= (unsigned long)packetBuffer[43];
            return secsSince1900 - 2208988800UL + timeZone * SECS_PER_HOUR;
        }
    }
    Serial.println("No NTP Response :-(");
    return 0; // return 0 if unable to get the time
}

// send an NTP request to the time server at the given address
void sendNTPpacket(IPAddress &address)
{
    // set all bytes in the buffer to 0
    memset(packetBuffer, 0, NTP_PACKET_SIZE);
    // Initialize values needed to form NTP request
    // (see URL above for details on the packets)
    packetBuffer[0] = 0b11100011; // LI, Version, Mode
    packetBuffer[1] = 0;          // Stratum, or type of clock
    packetBuffer[2] = 6;          // Polling Interval
    packetBuffer[3] = 0xEC;       // Peer Clock Precision
    // 8 bytes of zero for Root Delay & Root Dispersion
    packetBuffer[12] = 49;
    packetBuffer[13] = 0x4E;
    packetBuffer[14] = 49;
    packetBuffer[15] = 52;
    // all NTP fields have been given values, now
    // you can send a packet requesting a timestamp:
    Udp.beginPacket(address, 123); //NTP requests are to port 123
    Udp.write(packetBuffer, NTP_PACKET_SIZE);
    Udp.endPacket();
}