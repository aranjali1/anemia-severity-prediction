import React from "react";

const ResultDashboard = ({ result, loading, form }) => {
  const getScoreColor = (score) => {
    if (score >= 12) return "bg-emerald-500";
    if (score >= 10) return "bg-amber-500";
    if (score >= 7) return "bg-orange-500";
    if (score >= 4) return "bg-red-500";
    return "bg-purple-700";
  };

  const getConditionColor = (condition) => {
    if (condition?.includes("Severe")) return "text-red-600";
    if (condition?.includes("Mild")) return "text-amber-600";
    if (condition === "Normal") return "text-emerald-600";
    return "text-gray-600";
  };

  const getConditionBgColor = (condition) => {
    if (condition?.includes("Severe")) return "bg-red-50 border-red-200";
    if (condition?.includes("Mild")) return "bg-amber-50 border-amber-200";
    if (condition === "Normal") return "bg-emerald-50 border-emerald-200";
    return "bg-gray-50 border-gray-200";
  };

  const getConditionIcon = (condition) => {
    if (condition?.includes("Severe")) return "fa-exclamation-triangle";
    if (condition?.includes("Mild")) return "fa-smile";
    if (condition === "Normal") return "fa-heartbeat";
    return "fa-stethoscope";
  };

  if (!result && !loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-24">
        <div className="bg-linear-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <i className="fas fa-chart-pie text-cyan-600 text-lg"></i>
            <h2 className="text-lg font-semibold text-gray-800">Prediction Results</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <i className="fas fa-stethoscope text-3xl text-gray-400"></i>
            </div>
            <p className="text-gray-500 font-medium">No prediction yet</p>
            <p className="text-sm text-gray-400 mt-2">
              Enter CBC values and click "Predict Severity"
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-24">
        <div className="bg-linear-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <i className="fas fa-chart-pie text-cyan-600 text-lg"></i>
            <h2 className="text-lg font-semibold text-gray-800">Prediction Results</h2>
          </div>
        </div>
        <div className="p-6">
          <div className="text-center py-12">
            <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-gray-500">Analyzing with AI models...</p>
            <p className="text-xs text-gray-400 mt-2">Using XGBoost & KMeans</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-24">
      <div className="bg-linear-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <i className="fas fa-chart-pie text-cyan-600 text-lg"></i>
            <h2 className="text-lg font-semibold text-gray-800">Prediction Results</h2>
          </div>
          <span className="text-xs text-gray-400 flex items-center gap-1">
            <i className="fas fa-microchip"></i>
            Dual Model AI
          </span>
        </div>
      </div>

      <div className="p-6 space-y-5">
        {/* XGBoost Result - Severity Score & Condition */}
        <div className={`rounded-xl border-2 p-4 ${getConditionBgColor(result.condition)}`}>
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-linear-to-r from-blue-500 to-cyan-500 p-1.5 rounded-lg">
              <i className="fas fa-chart-line text-white text-xs"></i>
            </div>
            <h3 className="text-lg font-semibold text-gray-700">Severity Score</h3>
          </div>
          
          
          {/* Severity Score from API */}
          <div>
            <div className="flex justify-between items-baseline mb-1">
              <span className="text-xs text-gray-500">Severity Score</span>
              <span className="text-xl font-bold text-gray-800">{result.severity_score}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5 overflow-hidden">
              <div
                className={`${getScoreColor(result.severity_score)} h-2.5 rounded-full transition-all duration-500`}
                style={{ width: `${Math.min(100, (result.severity_score / 15) * 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-400 mt-2">
              Score range: Higher score indicates more severe anemia
            </p>
          </div>
        </div>

        {/* KMeans Result - Secondary Validation */}
        <div className="bg-linear-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
          <div className="flex items-center gap-2 mb-3">
            <div className="bg-linear-to-r from-purple-500 to-pink-500 p-1.5 rounded-lg">
              <i className="fas fa-chart-simple text-white text-xs"></i>
            </div>
            <h3 className="text-sm font-semibold text-gray-700">KMeans Clustering</h3>
            <span className="text-xs text-gray-400 ml-auto">Validation</span>
          </div>
          
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Condition:</span>
              <span className="font-semibold text-purple-700">
                {result.kmeans_condition}
              </span>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-xs text-gray-600">Level:</span>
              <span className="text-xs font-mono bg-white px-2 py-0.5 rounded border border-purple-200">
                {result.kmeans_severity}
              </span>
            </div>
          </div>
        </div>

        {/* Input Parameters Summary */}
        <div className="bg-gray-50 rounded-xl p-3">
          <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
            <i className="fas fa-vial"></i> Input CBC Parameters
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-gray-500">RBC:</span>
              <span className="font-medium">{form.RBC || "-"} M/µL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">HGB:</span>
              <span className="font-medium">{form.HGB || "-"} g/dL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">MCV:</span>
              <span className="font-medium">{form.MCV || "-"} fL</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">MCH:</span>
              <span className="font-medium">{form.MCH || "-"} pg</span>
            </div>
            <div className="flex justify-between col-span-2">
              <span className="text-gray-500">MCHC:</span>
              <span className="font-medium">{form.MCHC || "-"} g/dL</span>
            </div>
          </div>
        </div>

        {/* Model Info */}
        <div className="text-center pt-2">
          <p className="text-[10px] text-gray-400">
            <i className="fas fa-brain mr-1"></i>
            Powered by XGBoost Regressor & KMeans Clustering
          </p>
          <p className="text-[10px] text-gray-400 mt-1">
            <i className="fas fa-chart-line mr-1"></i>
            Severity score & condition from /predict-xgb endpoint
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResultDashboard;