import pandas as pd

from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression as LR
from sklearn.metrics import classification_report
from sklearn.metrics import accuracy_score
from sklearn.metrics import confusion_matrix

from pathlib import Path
BASE_DIR = Path(__file__).resolve().parents[3]

# -----------------------------
# LOAD DATA
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

# -----------------------------
# FILTER VALID CATEGORIES
# -----------------------------

valid_categories = [
    'incident',
    'request for information'
]

data = data[data['Category'].isin(valid_categories)]

print("\nCategory Distribution:\n")

print(data['Category'].value_counts())

print("\nSample NLP Descriptions:\n")

print(
    data[
        ['Category', 'Incident Description']
    ].sample(15)
)

# -----------------------------
# FEATURES & TARGET
# -----------------------------

X = data['Incident Description']
y = data['Category']

# -----------------------------
# TF-IDF VECTORIZATION
# -----------------------------

tfidf = TfidfVectorizer(
    max_features=200,
    ngram_range=(1, 2)
)

X_vectorized = tfidf.fit_transform(X)

# -----------------------------
# TRAIN-TEST SPLIT
# -----------------------------

X_train, X_test, y_train, y_test = train_test_split(
    X_vectorized,
    y,
    test_size=0.2,
    random_state=42,
    stratify=y
)

# -----------------------------
# LOGISTIC REGRESSION MODEL
# -----------------------------

model = LR(
    class_weight='balanced',
    max_iter=1000
)

# Train model
model.fit(X_train, y_train)

# -----------------------------
# MODEL PREDICTIONS
# -----------------------------

y_pred = model.predict(X_test)

# -----------------------------
# EVALUATION
# -----------------------------

accuracy = accuracy_score(y_test, y_pred)

print("\nModel Accuracy:")
print(round(accuracy * 100, 2), "%")

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

# -----------------------------
# CUSTOM NLP PREDICTION
# -----------------------------

print("\n--- Telecom Incident Prediction System ---")

while True:

    user_input = input(
        "\nEnter telecom incident description (or type 'exit'): "
    )

    if user_input.lower() == 'exit':
        print("\nExiting prediction system.")
        break

    # Vectorize user input
    user_vector = tfidf.transform([user_input])

    # Predict category
    prediction = model.predict(user_vector)

    print("\nPredicted Category:", prediction[0])