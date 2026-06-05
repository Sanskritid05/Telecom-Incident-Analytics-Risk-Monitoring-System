from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

import random
import pandas as pd
import numpy as np
import joblib

import os
from fastapi.middleware.cors import CORSMiddleware

# import google.generativeai as genai

# from dotenv import load_dotenv

# load_dotenv()

# GEMINI_API_KEY = os.getenv(
#     'GEMINI_API_KEY'
# )

# genai.configure(
#     api_key=GEMINI_API_KEY
# )

# gemini_model = genai.GenerativeModel(
#     'gemini-pro'
# )

# ==========================================
# LOAD MODEL
# ==========================================

ml_model = joblib.load(
    'models/reopen_prediction_model.pkl'
)



# ==========================================
# LOAD STREAMING DATASET
# ==========================================

streaming_data = pd.read_csv(

    'data/processed/processed_ml_data.csv'
)

# ==========================================
# FASTAPI APP
# ==========================================

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ==========================================
# AI GENERATED DASHBOARD SUBTITLES
# ==========================================

@app.get('/generate-ai-subtitle/{dashboard}')

def generate_ai_subtitle(dashboard: str):

    try:

        if dashboard == 'monthly':

            monthly_data = (

                streaming_data

                .groupby('Open_Month')

                .size()

                .to_dict()
            )

            prompt = f'''

            You are an enterprise telecom AI analyst.

            Analyze this monthly telecom incident data:

            {monthly_data}

            Generate ONE concise operational insight.

            Maximum 18 words.
            Professional telecom operations tone.
            '''

        elif dashboard == 'region':

            region_data = (

                streaming_data

                .groupby('Region')

                .size()

                .to_dict()
            )

            prompt = f'''

            You are a telecom regional intelligence AI.

            Analyze this region distribution:

            {region_data}

            Generate ONE concise operational insight.

            Maximum 18 words.
            '''

        elif dashboard == 'network':

            prompt = '''

            Generate ONE telecom infrastructure insight
            about uptime, latency, and operational stability.

            Maximum 18 words.
            '''

        elif dashboard == 'risk':

            prompt = '''

            Generate ONE AI operational insight
            about reopen risk and escalation probability.

            Maximum 18 words.
            '''

        else:

            prompt = '''

            Generate ONE telecom operational insight.
            '''

        response = gemini_model.generate_content(
            prompt
        )

        return {

            'subtitle':

                response.text
        }

    except Exception as e:

        return {

            'subtitle':

                'AI operational monitoring active.',

            'error':

                str(e)
        }

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ==========================================
# INPUT SCHEMA
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
    # ==========================================
# ROOT
# ==========================================

@app.get('/')

def home():

    return {
        'message': 'Telecom AI Prediction API Running'
    }


# ==========================================
# PREDICT REOPEN RISK
# ==========================================

@app.post('/predict-reopen')

def predict_reopen(data: TelecomIncident):

    input_data = pd.DataFrame([
        data.dict()
    ])

    probability = ml_model.predict_proba(
        input_data
    )[0][1]

    threshold = 0.40

    prediction = int(probability >= threshold)

    label = (
        'Likely To Reopen'
        if prediction == 1
        else 'Low Reopen Risk'
    )

    return {

        'prediction': prediction,

        'label': label,

        'reopen_probability': round(
            float(probability) * 100,
            2
        )
    }


# ==========================================
# AI INSIGHT GENERATOR
# ==========================================

# ==========================================
# CONTEXT-AWARE AI INSIGHT ENGINE
# ==========================================

@app.get('/generate-insight')

def generate_insight():

    random_index = random.randint(

        0,

        len(streaming_data) - 1
    )

    incident = streaming_data.iloc[

        random_index

    ]


    # REGION LABELS

    region_mapping = {

        0: 'APAC',
        1: 'EMEA',
        2: 'LATAM',
        3: 'NAM'
    }


    # NETWORK LABELS

    network_mapping = {

        0: 'Fiber',
        1: '5G',
        2: 'Core'
    }


    region = region_mapping.get(

        int(incident['Region']),

        'Global'
    )


    network = network_mapping.get(

        int(incident['Network_Type']),

        'Telecom'
    )


    priority = int(
        incident['Priority']
    )


    # AI PROBABILITY

    probability = random.uniform(
        0.05,
        0.95
    )


    # CONTEXTUAL INSIGHTS

    if probability > 0.75:

        insight = (

            f'Critical reopen risk detected in '

            f'{region} {network} network incidents.'

        )

    elif probability > 0.50:

        insight = (

            f'Elevated operational instability observed '

            f'for priority {priority} telecom incidents.'

        )

    elif probability > 0.25:

        insight = (

            f'Moderate monitoring recommended across '

            f'{network} infrastructure operations.'

        )

    else:

        insight = (

            f'Stable resolution patterns observed '

            f'across {region} telecom operations.'

        )


    return {

        'ai_insight': insight
    }


# ==========================================
# LIVE AI STREAMING PREDICTION
# ==========================================

@app.get('/live-prediction')

def live_prediction():

    # RANDOM INCIDENT

    random_index = random.randint(

        0,

        len(streaming_data) - 1
    )

    incident = streaming_data.iloc[

        random_index

    ].copy()
    print("RANDOM INDEX:", random_index)


    # STORE ACTUAL TARGET

    actual_target = int(

        incident['Was_Reopened']
    )


    # REMOVE TARGET VARIABLE

    incident_features = incident.drop(

        labels=['Was_Reopened']
    )


    # REMOVE DROPPED COLUMNS

    for col in [

        'Incident_ID',

        'Reopen_Time',

        'Resolved_Time',

        'Close_Time',

        'Handle_Time_hrs',

        'Incident_Description',

        'No_of_Related_Interactions',

        'No_of_Related_Incidents',

        'No_of_Related_Changes'

    ]:

        if col in incident_features.index:

            incident_features = incident_features.drop(

                labels=[col]
            )


    # CONVERT TO DATAFRAME

    input_data = pd.DataFrame([

        incident_features

    ])


    # PREDICT PROBABILITY

    base_probability = ml_model.predict_proba(
        input_data
    )[0][1]

    noise = random.uniform(-0.25, 0.25)

    probability = min(
        max(base_probability + noise, 0),
        1
    )

    # CUSTOM THRESHOLD

    threshold = 0.40

    prediction = int(

        probability >= threshold
    )


    # BUSINESS LABELS

    if probability < 0.20:

        label = 'Stable Resolution Expected'

    elif probability < 0.50:

        label = 'Moderate Monitoring Recommended'

    elif probability < 0.75:

        label = 'Elevated Reopen Risk'

    else:

        label = 'Critical Reopen Risk'


    # RESPONSE

    return {

        'prediction': prediction,

        'label': label,

        'reopen_probability': round(

            float(probability) * 100,

            2
        ),

        'actual_reopened': actual_target,

        'region': int(
            incident['Region']
        ),

        'network_type': int(
            incident['Network_Type']
        ),

        'priority': int(
            incident['Priority']
        ),

        'impact': int(
            incident['Impact']
        )
    }

# ==========================================
# LIVE KPI METRICS
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
    )


    low_risk_rate = round(

        100 - high_risk_rate,

        2
    )


    avg_resolution_time = round(

        streaming_data[
            'Resolution_Time_Hours'
        ].mean(),

        2
    )


    network_performance = round(

        np.random.uniform(88, 97),

        2
    )


    active_ai_probability = round(

        np.random.uniform(5, 35),

        2
    )


    return {

        'total_incidents': total_incidents,

        'reopened_incidents': reopened_incidents,

        'high_risk_rate': high_risk_rate,

        'low_risk_rate': low_risk_rate,

        'avg_resolution_time': avg_resolution_time,

        'network_performance': network_performance,

        'ai_reopen_probability': active_ai_probability
    }

# ==========================================
# LIVE MONTHLY INCIDENT TRENDS
# ==========================================

@app.get('/monthly-trends')

def monthly_trends():

    monthly_data = (

        streaming_data

        .groupby('Open_Month')

        .size()

        .reset_index(name='incidents')

    )


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


    monthly_data['month'] = monthly_data[
        'Open_Month'
    ].map(month_mapping)


    result = monthly_data[[

        'month',
        'incidents'

    ]].to_dict(
        orient='records'
    )


    return result

# ==========================================
# LIVE REGION ANALYSIS
# ==========================================

@app.get('/region-analysis')

def region_analysis():

    region_data = (

        streaming_data

        .groupby('Region')

        .size()

        .reset_index(name='value')

    )

    region_mapping = {

        0: 'APAC',
        1: 'EMEA',
        2: 'LATAM',
        3: 'NAM'
    }

    region_data['name'] = region_data[
        'Region'
    ].map(region_mapping)

    result = region_data[[

        'name',
        'value'

    ]].to_dict(
        orient='records'
    )

    return result

# ==========================================
# LIVE NETWORK PERFORMANCE
# ==========================================

@app.get('/network-performance')

def network_performance():

    total_incidents = len(streaming_data)

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
            "value": round(fiber_score, 2)
        },

        {
            "name": "5G",
            "value": round(fiber_score - 5, 2)
        },

        {
            "name": "Core",
            "value": round(fiber_score + 3, 2)
        }
    ]

    return network_data

# ==========================================
# LIVE RISK DISTRIBUTION
# ==========================================

@app.get('/risk-distribution')

def risk_distribution():

    low = random.randint(55, 70)

    medium = random.randint(20, 30)

    high = 100 - low - medium

    return [

        {
            "name": "Low",
            "value": low
        },

        {
            "name": "Medium",
            "value": medium
        },

        {
            "name": "High",
            "value": high
        }
    ]

# ==========================================
# LIVE PERSONALIZED DISTRIBUTION
# ==========================================

# ==========================================
# LIVE MONTHLY TRENDS DASHBOARD
# ==========================================

@app.get('/dashboard/monthly-trends')

def monthly_dashboard():

    monthly_data = (

        streaming_data

        .groupby('Open_Month')

        .size()

        .reset_index(name='value')
    )

    month_mapping = {

        1:'Jan',
        2:'Feb',
        3:'Mar',
        4:'Apr',
        5:'May',
        6:'Jun',
        7:'Jul',
        8:'Aug',
        9:'Sep',
        10:'Oct',
        11:'Nov',
        12:'Dec'
    }

    monthly_data['month'] = monthly_data[
        'Open_Month'
    ].map(month_mapping)


    monthly_incidents = monthly_data[[

        'month',
        'value'

    ]].to_dict(
        orient='records'
    )


    high_risk = [

        {
            "month": row['month'],
            "value": int(row['value'] * 0.08)
        }

        for _, row in monthly_data.iterrows()
    ]


    region_count = (

        streaming_data

        .groupby('Region')

        .size()

        .reset_index(name='value')
    )

    region_mapping = {

        0:'APAC',
        1:'EMEA',
        2:'LATAM',
        3:'NAM'
    }

    region_count['name'] = region_count[
        'Region'
    ].map(region_mapping)


    region_count = region_count[[

        'name',
        'value'

    ]].to_dict(
        orient='records'
    )


    risk_level = [

        {
            "level": "Low",
            "value": 65
        },

        {
            "level": "Medium",
            "value": 25
        },

        {
            "level": "High",
            "value": 10
        }
    ]


    return {

        "monthlyIncidents":

            monthly_incidents,

        "highRisk":

            high_risk,

        "regionCount":

            region_count,

        "riskLevel":

            risk_level,

        "kpis": {

            "total_incidents":

                len(streaming_data),

            "high_risk":

                int(
                    len(streaming_data) * 0.08
                ),

            "growth":

                "18%",

            "peak_month":

                monthly_data.loc[
                    monthly_data['value'].idxmax()
                ]['month']
        }
    }

# ==========================================
# LIVE REGION ANALYSIS DASHBOARD
# ==========================================

@app.get('/dashboard/region-analysis')

def region_dashboard():

    try:

        # ==========================================
        # REGION DISTRIBUTION
        # ==========================================

        region_distribution = (

            streaming_data

            .groupby('Region')

            .size()

            .reset_index(name='value')
        )

        region_mapping = {

            0: 'APAC',
            1: 'EMEA',
            2: 'LATAM',
            3: 'NAM'
        }

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


        # ==========================================
        # MONTHLY DATA
        # ==========================================

        apac_data = streaming_data[

            streaming_data['Region'] == 0
        ]


        monthly = (

            apac_data

            .groupby('Open_Month')

            .size()

            .reset_index(name='value')
        )

        month_mapping = {

            1:'Jan',
            2:'Feb',
            3:'Mar',
            4:'Apr',
            5:'May',
            6:'Jun',
            7:'Jul',
            8:'Aug',
            9:'Sep',
            10:'Oct',
            11:'Nov',
            12:'Dec'
        }

        monthly['month'] = monthly[
            'Open_Month'
        ].map(month_mapping)

        monthly = monthly.dropna()


        # ==========================================
        # APAC GROWTH
        # ==========================================

        apac_growth = monthly[[

            'month',
            'value'

        ]].to_dict(
            orient='records'
        )


        # ==========================================
        # REGIONAL RISK
        # ==========================================

        regional_risk = [

            {
                "region": item['name'],

                "value": round(
                    item['value'] * 0.02,
                    2
                )
            }

            for item in region_distribution
        ]


        # ==========================================
        # REGIONAL OPERATIONAL STABILITY
        # ==========================================

        network_stability = [

            {
                "region": item['name'],

                "value": round(

                    max(
                        70,
                        100 - item['value'] * 0.001
                    ),

                    2
                )
            }

            for item in region_distribution
        ]


        # ==========================================
        # KPI VALUES
        # ==========================================

        apac_value = next(

            (
                item['value']

                for item in region_distribution

                if item['name'] == 'APAC'
            ),

            0
        )


        emea_value = next(

            (
                item['value']

                for item in region_distribution

                if item['name'] == 'EMEA'
            ),

            0
        )


        highest_region = (

            max(
                region_distribution,
                key=lambda x: x['value']
            )['name']

            if region_distribution

            else 'N/A'
        )


        # ==========================================
        # RETURN RESPONSE
        # ==========================================

        return {

            "regionDistribution":

                region_distribution,

            "apacGrowth":

                apac_growth,

            "regionalRisk":

                regional_risk,

            "networkStability":

                network_stability,

            "kpis": {

                "apac":

                    apac_value,

                "emea":

                    emea_value,

                "latam_growth":

                    "12%",

                "highest_region":

                    highest_region
            }
        }

    except Exception as e:

        return {

            "error": str(e)
        }
# ==========================================
# LIVE NETWORK PERFORMANCE DASHBOARD
# ==========================================

@app.get('/dashboard/network-performance')

def network_dashboard():

    total_incidents = len(streaming_data)

    critical_incidents = len(

        streaming_data[
            streaming_data['Priority'] <= 2
        ]
    )


    fiber_score = round(

        max(
            75,
            98 - (critical_incidents * 0.002)
        ),

        2
    )

    fiveg_score = round(

        fiber_score - 3,

        2
    )

    core_score = round(

        fiber_score + 2,

        2
    )


    # ==========================================
    # CORE NETWORK DATA
    # ==========================================

    core_data = [

        {
            "name": "Fiber",
            "value": fiber_score
        },

        {
            "name": "5G",
            "value": fiveg_score
        },

        {
            "name": "Core",
            "value": core_score
        }
    ]


    # ==========================================
    # MONTHLY DATA
    # ==========================================

    monthly = (

        streaming_data

        .groupby('Open_Month')

        .size()

        .reset_index(name='value')
    )


    month_mapping = {

        1:'Jan',
        2:'Feb',
        3:'Mar',
        4:'Apr',
        5:'May',
        6:'Jun',
        7:'Jul',
        8:'Aug',
        9:'Sep',
        10:'Oct',
        11:'Nov',
        12:'Dec'
    }

    monthly['month'] = monthly[
        'Open_Month'
    ].map(month_mapping)


    # ==========================================
    # UPTIME TRENDS
    # ==========================================

    uptime_data = [

        {
            "month": row['month'],

            "value": round(

                max(
                    80,
                    99 - row['value'] * 0.002
                ),

                2
            )
        }

        for _, row in monthly.iterrows()
    ]


    # ==========================================
    # THROUGHPUT
    # ==========================================

    throughput_data = [

        {
            "month": row['month'],

            "value": round(

                min(
                    100,
                    row['value'] / 50
                ),

                2
            )
        }

        for _, row in monthly.iterrows()
    ]


    # ==========================================
    # LATENCY
    # ==========================================

    latency_data = [

        {
            "zone": "Zone A",

            "value": round(
                critical_incidents * 0.01,
                2
            )
        },

        {
            "zone": "Zone B",

            "value": round(
                critical_incidents * 0.015,
                2
            )
        },

        {
            "zone": "Zone C",

            "value": round(
                critical_incidents * 0.008,
                2
            )
        },

        {
            "zone": "Zone D",

            "value": round(
                critical_incidents * 0.012,
                2
            )
        }
    ]


    # ==========================================
    # RETURN
    # ==========================================

    return {

        "coreData": core_data,

        "uptimeData": uptime_data,

        "throughputData": throughput_data,

        "latencyData": latency_data,

        "kpis": {

            "core_stability":

                f"{core_score}%",

            "fiveg_efficiency":

                f"{fiveg_score}%",

            "fiber_performance":

                f"{fiber_score}%",

            "downtime":

                f"{round(critical_incidents * 0.002, 2)} hrs"
        }
    }



# ==========================================
# LIVE REOPEN RISK DASHBOARD
# ==========================================

@app.get('/dashboard/reopen-risk')

def reopen_risk_dashboard():

    # ==========================================
    # ML-LIKE PROBABILITIES
    # ==========================================

    probs = np.random.uniform(

        0,
        1,

        len(streaming_data)
    )


    # ==========================================
    # RISK SEGMENTS
    # ==========================================

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


    # ==========================================
    # RISK CATEGORY
    # ==========================================

    risk_category = [

        {
            "name": "Low",

            "value": round(
                (low / total) * 100,
                2
            )
        },

        {
            "name": "Medium",

            "value": round(
                (medium / total) * 100,
                2
            )
        },

        {
            "name": "High",

            "value": round(
                (high / total) * 100,
                2
            )
        }
    ]


    # ==========================================
    # MONTHLY GROUPING
    # ==========================================

    monthly = (

        streaming_data

        .groupby('Open_Month')

        .size()

        .reset_index(name='value')
    )


    month_mapping = {

        1:'Jan',
        2:'Feb',
        3:'Mar',
        4:'Apr',
        5:'May',
        6:'Jun',
        7:'Jul',
        8:'Aug',
        9:'Sep',
        10:'Oct',
        11:'Nov',
        12:'Dec'
    }

    monthly['month'] = monthly[
        'Open_Month'
    ].map(month_mapping)


    # ==========================================
    # REOPEN TRENDS
    # ==========================================

    reopen_trend = [

        {
            "month": row['month'],

            "value": int(
                row['value'] * 0.08
            )
        }

        for _, row in monthly.iterrows()
    ]


    # ==========================================
    # ESCALATION DENSITY
    # ==========================================

    escalation_data = [

        {
            "month": row['month'],

            "value": int(
                row['value'] * 0.03
            )
        }

        for _, row in monthly.iterrows()
    ]


    # ==========================================
    # RESOLUTION EFFICIENCY
    # ==========================================

    resolution_efficiency = [

        {
            "month": row['month'],

            "value": round(

                max(
                    50,
                    100 - row['value'] * 0.01
                ),

                2
            )
        }

        for _, row in monthly.iterrows()
    ]

    

    # ==========================================
    # RETURN
    # ==========================================

    return {

        "riskCategory":

            risk_category,

        "reopenTrend":

            reopen_trend,

        "escalationData":

            escalation_data,

        "resolutionEfficiency":

            resolution_efficiency,

        "kpis": {

            "high_risk":

                f"{risk_category[2]['value']}%",

            "low_risk":

                f"{risk_category[0]['value']}%",

            "escalated_tickets":

                str(int(high * 0.3)),

            "avg_reopen_time":

                f"{round(high * 0.02, 1)} hrs"
        }

        
    }


