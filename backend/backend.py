from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import pandas as pd
import os

app = Flask(__name__)
CORS(app)

BASE_DIR = os.path.dirname(os.path.abspath(__file__))


xgb_model = joblib.load(os.path.join(BASE_DIR, "..", "xgb_model.pkl"))
scaler_reg = joblib.load(os.path.join(BASE_DIR, "..", "scaler_regressor.pkl"))


kmeans = joblib.load(os.path.join(BASE_DIR, "..", "kmeans_model.pkl"))
scaler_km = joblib.load(os.path.join(BASE_DIR, "..", "scaler.pkl"))
pca = joblib.load(os.path.join(BASE_DIR, "..", "pca.pkl"))

FEATURE_COLUMNS = [ "MCV", "MCH", "MCHC", "RBC","HGB"]

cluster_map = {
    0: {"condition": "Normal", "severity": "None"},
    1: {"condition": "Mild Anemia", "severity": "Mild"},
    2: {"condition": "Microcytic Anemia", "severity": "Severe"}
}

@app.route("/")
def home():
    return "Anemia API (XGBoost + KMeans) Running"

# xgboost endpoint
@app.route("/predict-xgb", methods=["POST"])
def predict_xgb():
    try:
        data = request.get_json()

        required = [ "mcv", "mch", "mchc", "rbc","hgb"]
        for key in required:
            if key not in data:
                return jsonify({"error": f"Missing field: {key}"}), 400

        features = pd.DataFrame([[
           
            float(data["mcv"]),
            float(data["mch"]),
            float(data["mchc"]),
            float(data["rbc"]),
             float(data["hgb"])
        ]], columns=FEATURE_COLUMNS)

        features_scaled = scaler_reg.transform(features)

        severity_score = float(xgb_model.predict(features_scaled)[0])

        if severity_score <= 2.5:
            condition = "Normal"
        elif severity_score >2.5 and severity_score <=2.97:
            condition = "Mild Anemia"
        else:
            condition = "Severe"

        return jsonify({
            "model": "XGBoost",
            "severity_score": round(severity_score, 2),
            "condition": condition
        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# kmeans + pca endpoint
@app.route("/predict-kmeans", methods=["POST"])
def predict_kmeans():
    try:
        data = request.get_json()

        required = [ "mcv", "mch", "mchc", "rbc","hgb"]
        for key in required:
            if key not in data:
                return jsonify({"error": f"Missing field: {key}"}), 400

        
        features = pd.DataFrame([[
            
            float(data["mcv"]),
            float(data["mch"]),
            float(data["mchc"]),
            float(data["rbc"]),
            float(data["hgb"])
        ]], columns=FEATURE_COLUMNS)

        features_scaled = scaler_km.transform(features)
        features_pca = pca.transform(features_scaled)

        cluster = int(kmeans.predict(features_pca)[0])
        result = cluster_map[cluster]

        return jsonify({
            "model": "KMeans",
            "cluster": cluster,
            "condition": result["condition"],
            "level": result["severity"]

        })

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)