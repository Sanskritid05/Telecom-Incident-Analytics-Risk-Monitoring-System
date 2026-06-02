import pandas as pd
import numpy as np
from pathlib import Path


BASE_DIR = Path(__file__).resolve().parents[3]
# -----------------------------
# LOAD DATASET
# -----------------------------

data_path = (
    BASE_DIR
    / "backend"
    / "data"
    / "processed"
    / "final_istm_data.csv"
)

data = pd.read_csv(
    data_path,
    low_memory=False
)

print("\nDataset Loaded Successfully.")
print("\nDataset Shape:", data.shape)

# -----------------------------
# CHECK MISSING VALUES
# -----------------------------

print("\nMissing Values:\n")

print(data.isnull().sum())

# -----------------------------
# HANDLE 'NS' AND 'NA'
# -----------------------------

data.replace(
    ['NS', 'NA'],
    np.nan,
    inplace=True
)

# -----------------------------
# CONVERT DATETIME COLUMNS
# -----------------------------

date_columns = [
    'Open_Time',
    'Reopen_Time',
    'Resolved_Time',
    'Close_Time'
]

for col in date_columns:

    data[col] = pd.to_datetime(
        data[col],
        errors='coerce',
        dayfirst=True
    )

# -----------------------------
# CLEAN HANDLE_TIME_HRS
# -----------------------------

data['Handle_Time_hrs'] = (
    data['Handle_Time_hrs']
    .astype(str)
    .str.replace(',', '.', regex=False)
)

data['Handle_Time_hrs'] = pd.to_numeric(
    data['Handle_Time_hrs'],
    errors='coerce'
)

# -----------------------------
# TIME-BASED FEATURE ENGINEERING
# -----------------------------

# Open month
data['Open_Month'] = data['Open_Time'].dt.month

# Open day of week
data['Open_DayOfWeek'] = data['Open_Time'].dt.day_name()

# Open hour
data['Open_Hour'] = data['Open_Time'].dt.hour

# Resolution time in hours
data['Resolution_Time_Hours'] = (
    (
        data['Close_Time'] - data['Open_Time']
    ).dt.total_seconds()
) / 3600

print("\nTime-based features created successfully.")

# -----------------------------
# DISPLAY DATATYPES
# -----------------------------

print("\nUpdated Data Types:\n")

print(data.dtypes)

# -----------------------------
# SAVE PREPROCESSED DATA
# -----------------------------

output_path = (
    BASE_DIR
    / "backend"
    / "data"
    / "processed"
    / "preprocessed_data.csv"
)

data.to_csv(
    output_path,
    index=False
)

print("\nPreprocessed dataset saved successfully.")