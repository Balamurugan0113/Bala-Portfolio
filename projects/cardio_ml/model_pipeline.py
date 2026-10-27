import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, roc_auc_score

def train_cardio_model(csv_path: str = "heart.csv"):
    df = pd.read_csv(csv_path)
    
    # Feature matrix & diagnostic target
    X = df.drop(columns=["target"])
    y = df["target"]
    
    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42, stratify=y
    )
    
    scaler = StandardScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)
    
    param_grid = {
        'n_estimators': [100, 200],
        'max_depth': [4, 6, 8],
        'min_samples_split': [2, 5]
    }
    
    rf = RandomForestClassifier(random_state=42)
    grid = GridSearchCV(rf, param_grid, cv=5, scoring='roc_auc')
    grid.fit(X_train_scaled, y_train)
    
    best_model = grid.best_estimator_
    preds = best_model.predict(X_test_scaled)
    probs = best_model.predict_proba(X_test_scaled)[:, 1]
    
    auc = roc_auc_score(y_test, probs)
    print(f"Validated ROC-AUC Score: {auc:.4f}")
    print(classification_report(y_test, preds))
    return best_model, scaler