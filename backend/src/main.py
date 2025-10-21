import pickle

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from pydantic import BaseModel

import numpy as np

from dotenv import load_dotenv
import os

load_dotenv()
frontend_url = os.getenv("FRONTEND_URL")

app = FastAPI()

origins = [frontend_url]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ModelInput(BaseModel):
    Pregnancies: int
    Glucose: int
    BloodPressure: int
    SkinThickness: int
    Insulin: int
    Bmi: float
    DiabetesPedigreeFunction: float
    Age: int


model = pickle.load(open("backend/src/ml_model/diabetes_model.sav", "rb"))
scaler = pickle.load(open("backend/src/ml_model/scaler.sav", "rb"))


@app.post("/diabetes_prediction")
def diabetes_pred(input_parameters: ModelInput):
    input_data = np.array(
        [
            [
                input_parameters.Pregnancies,
                input_parameters.Glucose,
                input_parameters.BloodPressure,
                input_parameters.SkinThickness,
                input_parameters.Insulin,
                input_parameters.Bmi,
                input_parameters.DiabetesPedigreeFunction,
                input_parameters.Age,
            ]
        ]
    )

    std_data = scaler.transform(input_data)
    prediction = model.predict(std_data)

    return {
        "prediction": int(prediction[0]),
        "message": "Diabetic" if prediction[0] == 1 else "Not Diabetic",
    }
