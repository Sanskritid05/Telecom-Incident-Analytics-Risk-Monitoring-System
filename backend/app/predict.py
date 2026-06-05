from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import pandas as pd
import numpy as np
import random
import joblib

from pathlib import Path

# ==========================================
# BASE DIRECTORY
# ==========================================

BASE_DIR = Path(__file__).resolve().parents[1]

# ==========================================
# LOAD MODEL
# ==========================================

model_path = (
    BASE_DIR
    / "models"
    / "reopen_prediction_model.pkl"
)

try:

    ml_model = joblib.load(model_path)

except Exception as e:

    print("MODEL LOAD ERROR:", e)

    ml_model = None

# ==========================================
# LOAD DATASET
# ==========================================

data_path = (
    BASE_DIR
    / "data"
    / "processed"
    / "preprocessed_data.csv"
)

try:

    streaming_data = pd.read_csv(

        data_path,

        low_memory=False
    )

except Exception as e:

    print("DATA LOAD ERROR:", e)

    streaming_data = pd.DataFrame()

# ==========================================
# MEMORY OPTIMIZATION
# ==========================================

for col in [

    'Region',
    'Network_Type',
    'Open_Month',
    'Priority',
    'Impact',
    'Was_Reopened'
]:

    if col in streaming_data.columns:

        streaming_data[col] = (

            pd.to_numeric(

                streaming_data[col],

                errors='coerce'
            )

            .fillna(0)

            .astype('int16')
        )

if 'Resolution_Time_Hours' in streaming_data.columns:

    streaming_data['Resolution_Time_Hours'] = (

        pd.to_numeric(

            streaming_data['Resolution_Time_Hours'],

            errors='coerce'
        )

        .fillna(0)

        .astype('float32')
    )

# ==========================================
# GLOBAL MAPPINGS
# ==========================================

region_mapping = {

    0: 'APAC',
    1: 'EMEA',
    2: 'LATAM',
    3: 'NAM'
}

network_mapping = {

    0: '5G Network',
    1: 'Core Network',
    2: 'Wireless Network',
    3: 'VPN Service',
    4: 'Mobile Core',
    5: 'Fiber Network'
}

month_mapping = {

    1: 'Jan',
    2: 'Feb',
    3: 'Mar',
    4: 'Apr',
    5: 'May',
    6: 'Jun',
    7: 'Jul',
    8: 'Aug',
    9: 'Sep',
    10: 'Oct',
    11: 'Nov',
    12: 'Dec'
}

# ==========================================
# FASTAPI APP
# ==========================================

app = FastAPI()

# ==========================================
# CORS
# ==========================================

app.add_middleware(

    CORSMiddleware,

    allow_origins=[

        "http://localhost:5173",

        "https://telecom-incident-intelligence.vercel.app"
    ],

    allow_credentials=True,

    allow_methods=["*"],

    allow_headers=["*"],
)

# ==========================================
# INPUT MODEL
# ==========================================

class TelecomIncident(BaseModel):

    CI_Name: int
    CI_Cat: int
    CI_Subcat: int
    Status: int
    Impact: int
    Urgency: int
    Priority: int
    Category: int
    Alert_Status: int
    No_of_Reassignments: int
    Open_Time: int
    Closure_Code: int
    Region: int
    Network_Type: int
    Open_Month: int
    Open_DayOfWeek: int
    Open_Hour: int
    Resolution_Time_Hours: float
    Resolution_Category: int
    Peak_Hour_Incident: int

# ==========================================
# ROOT
# ==========================================

@app.get('/')

def home():

    return {

        "message": "Telecom AI Backend Running"
    }

# ==========================================
# GENERATE AI INSIGHT
# ==========================================

@app.get('/generate-insight')

def generate_insight():

    total_incidents = len(streaming_data)

    reopened = int(
        streaming_data['Was_Reopened'].sum()
    )

    reopen_rate = round(

        (reopened / total_incidents) * 100,

        2

    ) if total_incidents > 0 else 0

    avg_resolution = round(

        float(

            streaming_data[
                'Resolution_Time_Hours'
            ].mean()
        ),

        2
    )

    insight = (

        f"AI detected a {reopen_rate}% reopen risk rate "
        f"with average resolution time of "
        f"{avg_resolution} hours across telecom operations."
    )

    return {

        "ai_insight": insight
    }

# ==========================================
# LIVE PREDICTION
# ==========================================

@app.get('/live-prediction')

def live_prediction():

    if ml_model is None:

        return {

            "error": "ML model failed to load"
        }

    if len(streaming_data) == 0:

        return {

            "error": "Dataset empty"
        }

    random_index = random.randint(

        0,

        len(streaming_data) - 1
    )

    incident = streaming_data.iloc[
        random_index
    ].copy()

    actual_target = int(
        incident['Was_Reopened']
    )

    incident_features = incident.drop(

        labels=['Was_Reopened']
    )

    drop_columns = [

        'Incident_ID',
        'Reopen_Time',
        'Resolved_Time',
        'Close_Time',
        'Handle_Time_hrs',
        'Incident Description',
        'No_of_Related_Interactions',
        'No_of_Related_Incidents',
        'No_of_Related_Changes'
    ]

    for col in drop_columns:

        if col in incident_features.index:

            incident_features = incident_features.drop(
                labels=[col]
            )

    input_data = pd.DataFrame([

        incident_features
    ])

    expected_columns = ml_model.feature_names_in_

    clean_input = pd.DataFrame()

    for col in expected_columns:

        if col in input_data.columns:

            clean_input[col] = input_data[col]

        else:

            clean_input[col] = 0

    input_data = clean_input

    input_data = input_data.apply(

        pd.to_numeric,

        errors='coerce'
    ).fillna(0)

    probability = ml_model.predict_proba(

        input_data

    )[0][1]

    prediction = int(
        probability >= 0.40
    )

    if probability < 0.20:

        label = 'Stable Resolution Expected'

    elif probability < 0.50:

        label = 'Moderate Monitoring Recommended'

    elif probability < 0.75:

        label = 'Elevated Reopen Risk'

    else:

        label = 'Critical Reopen Risk'

    return {

        'prediction': prediction,

        'label': label,

        'reopen_probability': round(
            float(probability) * 100,
            2
        ),

        'actual_reopened': actual_target,

        'region': region_mapping.get(

            int(incident['Region']),

            'Unknown'
        ),

        'network_type': network_mapping.get(

            int(incident['Network_Type']),

            'Unknown'
        ),

        'priority': int(
            incident['Priority']
        ),

        'impact': int(
            incident['Impact']
        )
    }

# ==========================================
# LIVE KPIS
# ==========================================

@app.get('/live-kpis')

def live_kpis():

    total_incidents = len(streaming_data)

    reopened_incidents = int(

        streaming_data['Was_Reopened'].sum()
    )

    high_risk_rate = round(

        (
            reopened_incidents /
            total_incidents
        ) * 100,

        2
    ) if total_incidents > 0 else 0

    low_risk_rate = round(

        100 - high_risk_rate,

        2
    )

    avg_resolution_time = round(

        float(

            streaming_data[
                'Resolution_Time_Hours'
            ].mean()
        ),

        2
    )

    return {

        'total_incidents': int(total_incidents),

        'reopened_incidents': int(reopened_incidents),

        'high_risk_rate': float(high_risk_rate),

        'low_risk_rate': float(low_risk_rate),

        'avg_resolution_time': float(avg_resolution_time)
    }

# ==========================================
# MONTHLY DASHBOARD
# ==========================================

@app.get('/dashboard/monthly-trends')

def monthly_dashboard():

    monthly_data = (

        streaming_data

        .groupby('Open_Month')

        .size()

        .reset_index(name='value')
    )

    monthly_data['month'] = monthly_data[
        'Open_Month'
    ].map(month_mapping)

    monthly_incidents = monthly_data[[

        'month',
        'value'

    ]].to_dict(
        orient='records'
    )

    monthly_incidents = [

        {
            "month": str(item['month']),
            "value": int(item['value'])
        }

        for item in monthly_incidents
    ]

    return {

        "monthlyIncidents":

            monthly_incidents
    }

# ==========================================
# REGION ANALYSIS
# ==========================================

@app.get('/dashboard/region-analysis')

def region_dashboard():

    region_distribution = (

        streaming_data

        .groupby('Region')

        .size()

        .reset_index(name='value')
    )

    region_distribution['name'] = (

        region_distribution['Region']

        .map(region_mapping)
    )

    region_distribution = region_distribution[[

        'name',
        'value'

    ]].to_dict(
        orient='records'
    )

    region_distribution = [

        {
            "name": str(item['name']),
            "value": int(item['value'])
        }

        for item in region_distribution
    ]

    return {

        "regionDistribution":

            region_distribution
    }

# ==========================================
# REOPEN RISK DASHBOARD
# ==========================================

@app.get('/dashboard/reopen-risk')

def reopen_risk_dashboard():

    if ml_model is None:

        return {

            "error": "ML model failed to load"
        }

    if len(streaming_data) == 0:

        return {

            "error": "Dataset empty"
        }

    sample_size = min(
        200,
        len(streaming_data)
    )

    model_input = streaming_data.sample(

        sample_size,

        random_state=42

    ).copy()

    drop_columns = [

        'Was_Reopened',
        'Incident_ID',
        'Reopen_Time',
        'Resolved_Time',
        'Close_Time',
        'Handle_Time_hrs',
        'Incident Description',
        'No_of_Related_Interactions',
        'No_of_Related_Incidents',
        'No_of_Related_Changes'
    ]

    existing_drop_columns = [

        col for col in drop_columns

        if col in model_input.columns
    ]

    model_input.drop(

        columns=existing_drop_columns,

        inplace=True,

        errors='ignore'
    )

    expected_columns = list(

        ml_model.feature_names_in_
    )

    for col in expected_columns:

        if col not in model_input.columns:

            model_input[col] = 0

    model_input = model_input[
        expected_columns
    ]

    model_input = model_input.apply(

        pd.to_numeric,

        errors='coerce'
    ).fillna(0)

    probs = ml_model.predict_proba(

        model_input

    )[:, 1]

    low = int(
        np.sum(probs < 0.4)
    )

    medium = int(

        np.sum(

            (probs >= 0.4) &

            (probs < 0.7)
        )
    )

    high = int(
        np.sum(probs >= 0.7)
    )

    total = low + medium + high

    if total == 0:

        total = 1

    risk_category = [

        {
            "name": "Low",
            "value": round(
                float((low / total) * 100),
                2
            )
        },

        {
            "name": "Medium",
            "value": round(
                float((medium / total) * 100),
                2
            )
        },

        {
            "name": "High",
            "value": round(
                float((high / total) * 100),
                2
            )
        }
    ]

    return {

        "riskCategory":

            risk_category
    }

# ==========================================
# NETWORK PERFORMANCE
# ==========================================

@app.get('/dashboard/network-performance')

def network_performance():

    high_priority = len(

        streaming_data[
            streaming_data['Priority'] <= 2
        ]
    )

    fiber_score = max(

        70,

        98 - (high_priority * 0.01)
    )

    network_data = [

        {
            "name": "Fiber",
            "value": round(float(fiber_score), 2)
        },

        {
            "name": "5G",
            "value": round(float(fiber_score - 5), 2)
        },

        {
            "name": "Core",
            "value": round(float(fiber_score + 3), 2)
        }
    ]

    return network_data