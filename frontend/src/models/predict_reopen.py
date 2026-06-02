import pandas as pd
import numpy as np
from pathlib import Path

from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    classification_report,
    accuracy_score,
    confusion_matrix,
    roc_auc_score,
    average_precision_score,
    precision_score,
    recall_score,
    f1_score
)

BASE_DIR = Path(__file__).resolve().parents[3]

# -----------------------------
# LOAD PREPROCESSED DATA
# -----------------------------

data_path = (
    BASE_DIR
    / "backend"
    / "data"
    / "processed"
    / "preprocessed_data.csv"
)

data = pd.read_csv(
    data_path,
    low_memory=False
)

print("\nDataset Loaded Successfully.")
print(f"\nLoaded Dataset From:\n{data_path}")
# -----------------------------
# SELECT FEATURES
# -----------------------------

features = [
    'Impact',
    'Urgency',
    'Priority',
    'No_of_Reassignments',
    'Handle_Time_hrs',
    'Region',
    'Network_Type',
    'CI_Cat',
    'Open_Month',
    'Open_Hour',
    'Resolution_Time_Hours'
]

target = 'Was_Reopened'

# -----------------------------
# KEEP REQUIRED COLUMNS
# -----------------------------

data = data[features + [target]].copy()

# -----------------------------
# HANDLE MISSING VALUES
# -----------------------------

numeric_cols = [
    'Priority',
    'No_of_Reassignments',
    'Handle_Time_hrs',
    'Resolution_Time_Hours'
]

for col in numeric_cols:

    data[col] = pd.to_numeric(
        data[col],
        errors='coerce'
    )

    data[col] = data[col].fillna(
        data[col].median()
    )

# -----------------------------
# HANDLE CATEGORICAL MISSING VALUES
# -----------------------------

categorical_cols = [
    'Impact',
    'Urgency',
    'Region',
    'Network_Type',
    'CI_Cat'
]

for col in categorical_cols:

    data[col] = data[col].fillna(
        data[col].mode()[0]
    )

# -----------------------------
# LABEL ENCODING
# -----------------------------

encoder = LabelEncoder()

for col in categorical_cols:

    data[col] = encoder.fit_transform(
        data[col].astype(str)
    )

# -----------------------------
# FEATURES & TARGET
# -----------------------------

X = data[features]
y = data[target]

# -----------------------------
# TRAIN-TEST SPLIT
# -----------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# -----------------------------
# RANDOM FOREST MODEL
# -----------------------------

model = RandomForestClassifier(
    n_estimators=300,
    max_depth=12,
    min_samples_leaf=5,
    class_weight='balanced_subsample',
    random_state=42,
    n_jobs=-1
)

# Train model
model.fit(X_train, y_train)

# -----------------------------
# PREDICTIONS
# -----------------------------

threshold = 0.50

# Risk probabilities
y_prob = model.predict_proba(X_test)[:, 1]

y_pred = (
    y_prob >= threshold
).astype(int)

# -----------------------------
# INCIDENT RISK SCORES
# -----------------------------

risk_results = pd.DataFrame({
    'Actual_Reopened': y_test.values,
    'Predicted_Reopened': y_pred,
    'Reopen_Risk_Score': y_prob
})

print("\nTop High-Risk Incidents:\n")

print(
    risk_results
    .sort_values(
        by='Reopen_Risk_Score',
        ascending=False
    )
    .head(10)
)

# -----------------------------
# EVALUATION
# -----------------------------

accuracy = accuracy_score(y_test, y_pred)

roc_auc = roc_auc_score(
    y_test,
    y_prob
)

pr_auc = average_precision_score(
    y_test,
    y_prob
)

precision = precision_score(
    y_test,
    y_pred
)

recall = recall_score(
    y_test,
    y_pred
)

f1 = f1_score(
    y_test,
    y_pred
)

print("\nModel Accuracy:")
print(round(accuracy * 100, 2), "%")

print("\n--- Advanced Evaluation Metrics ---")

print(f"ROC-AUC Score: {roc_auc:.4f}")

print(f"PR-AUC Score: {pr_auc:.4f}")

print(f"Precision: {precision:.4f}")

print(f"Recall: {recall:.4f}")

print(f"F1 Score: {f1:.4f}")

print("\nClassification Report:\n")

print(
    classification_report(
        y_test,
        y_pred,
        zero_division=0
    )
)

print("\nConfusion Matrix:\n")

print(
    confusion_matrix(
        y_test,
        y_pred
    )
)