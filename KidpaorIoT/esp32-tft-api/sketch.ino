#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>
#include <Adafruit_GFX.h>
#include <Adafruit_ILI9341.h>

const char* ssid = "Wokwi-GUEST";
const char* password = "";
int activityId = 3;

#define BTN_PIN 5
#define TFT_DC 2
#define TFT_CS 15
Adafruit_ILI9341 tft = Adafruit_ILI9341(TFT_CS, TFT_DC);

String getLocation(int id) {
  const String url = "https://c863-95-65-114-84.ngrok-free.app/api/Activities/" + String(id);
  HTTPClient http;
  http.useHTTP10(true);
  http.begin(url);
  int httpResponseCode = http.GET();
  if (httpResponseCode != 200) {
    Serial.print("HTTP GET request failed, error code: ");
    Serial.println(httpResponseCode);
    return "Request failed!";
  }

  String response = http.getString();

  DynamicJsonDocument doc(4096);
  DeserializationError error = deserializeJson(doc, response);
  Serial.println(response);

  if (error) {
    Serial.print("Failed to parse JSON, error: ");
    Serial.println(error.c_str());
    return "Failed process!";
  }

  String location = doc["location"].as<String>();
  http.end();
  return location;
}

void nextLocation(int id) {
  tft.setTextColor(ILI9341_WHITE);
  tft.println("\nLoading activity...");

  String location = getLocation(id);
  tft.setTextColor(ILI9341_GREEN);
  tft.println(location);
}

void setup() {
  Serial.begin(115200);
  pinMode(BTN_PIN, INPUT_PULLUP);

  WiFi.begin(ssid, password, 6);

  tft.begin();
  tft.setRotation(1);

  tft.setTextColor(ILI9341_WHITE);
  tft.setTextSize(2);
  tft.print("Connecting to WiFi");

  while (WiFi.status() != WL_CONNECTED) {
    delay(100);
    tft.print(".");
  }

  tft.print("\nConnected!\n");
  nextLocation(activityId);
}

void loop() {
  if (Serial.available()) {
    String input = Serial.readStringUntil('\n');
    activityId = input.toInt();
  }
  if (digitalRead(BTN_PIN) == LOW) {
    tft.fillScreen(ILI9341_BLACK);
    tft.setCursor(0, 0);
    nextLocation(activityId);
  }

  delay(100);
}