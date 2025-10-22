import os
import pickle
import numpy as np
import pandas as pd

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field, validator
from dotenv import load_dotenv

load_dotenv()
frontend_url = os.getenv("FRONTEND_URL")

app = FastAPI(title="Diabetes Prediction API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[frontend_url] if frontend_url else ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

FEATURES = [
    "Pregnancies",
    "Glucose",
    "BloodPressure",
    "SkinThickness",
    "Insulin",
    "BMI",
    "DiabetesPedigreeFunction",
    "Age",
]


class UserInput(BaseModel):
    Gender: str = Field(..., description="Gender of the patient: male or female")
    Glucose: float = Field(..., ge=0)
    BloodPressure: float = Field(..., ge=0)
    SkinThickness: float = Field(..., ge=0)
    Insulin: float = Field(..., ge=0)
    DiabetesPedigreeFunction: float = Field(..., ge=0)
    Age: int = Field(..., ge=0)
    Weight: float = Field(..., ge=0)
    Height: float = Field(..., gt=0)
    Pregnancies: int | None = Field(None, ge=0)


def preprocess_input(data: UserInput) -> np.ndarray:
    try:
        bmi = round(float(data.Weight) / (float(data.Height) ** 2), 2)
        print({"BMI": bmi})

        pregnancies = 0 if data.Gender.lower() == "male" else int(data.Pregnancies or 0)

        processed = np.array(
            [
                [
                    pregnancies,
                    int(data.Glucose),
                    int(data.BloodPressure),
                    int(data.SkinThickness),
                    int(data.Insulin),
                    bmi,
                    float(data.DiabetesPedigreeFunction),
                    int(data.Age),
                ]
            ]
        )
        print({"data": data})
        print({"processed data": processed[0]})
        return processed

    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Preprocessing error: {str(e)}")


try:
    model_path = "backend/src/ml_model/diabetes_model.sav"
    scaler_path = "backend/src/ml_model/scaler.sav"

    with open(model_path, "rb") as model_file:
        model = pickle.load(model_file)

    with open(scaler_path, "rb") as scaler_file:
        scaler = pickle.load(scaler_file)

except Exception as e:
    raise RuntimeError(f"Failed to load model or scaler: {str(e)}")


@app.post("/diabetes_prediction")
def diabetes_prediction(input_data: UserInput):

    processed_data = preprocess_input(input_data)

    scaled_data = scaler.transform(pd.DataFrame(processed_data, columns=FEATURES))
    prediction = model.predict(scaled_data)

    label = "Diabetic" if int(prediction[0]) == 1 else "Not Diabetic"

    return {
        "status": "success",
        "prediction": int(prediction[0]),
        "message": label,
    }
