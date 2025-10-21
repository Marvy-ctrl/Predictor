import requests
import json


url = "http://localhost:8000/diabetes_prediction"

input_data = {
    "Pregnancies": 3,
    "Glucose": 106,
    "BloodPressure": 72,
    "SkinThickness": 0,
    "Insulin": 0,
    "Bmi": 25.8,
    "DiabetesPedigreeFunction": 0.207,
    "Age": 27,
}

input_json = json.dumps(input_data)
response = requests.post(url, data=input_json)
print(response.text)
