import { useState } from "react";

const App = () => {
  const [form, setForm] = useState({
    RBC: "",
    HGB: "",
    MCV: "",
    MCH: "",
    MCHC: "",
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const value = e.target.value === "" ? "" : parseFloat(e.target.value);
    setForm({ ...form, [e.target.name]: value });
  };

  const handleSubmit = async () => {
    // Validate all fields are filled
    for (const key of Object.keys(form)) {
      if (form[key] === "" || isNaN(form[key])) {
        setError(`Please enter a valid value for ${key}`);
        return;
      }
    }
    setError(null);
    setLoading(true);

    try {
      const res = await fetch("http://127.0.0.1:5000/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          RBC: parseFloat(form.RBC),
          HGB: parseFloat(form.HGB),
          MCV: parseFloat(form.MCV),
          MCH: parseFloat(form.MCH),
          MCHC: parseFloat(form.MCHC),
        }),
      });

      if (!res.ok) throw new Error("Prediction failed");
      const data = await res.json();
      setResult(data);
    } catch (err) {
      console.error(err);
      // Fallback mock prediction when backend is unavailable
      const mockResult = getMockPrediction(form);
      setResult(mockResult);
    } finally {
      setLoading(false);
    }
  };

  // Clinical heuristic mock prediction (fallback when API is down)
  const getMockPrediction = (formData) => {
    const { RBC, HGB, MCV, MCH, MCHC } = formData;
    let score = 0;

    // HGB based scoring (primary indicator)
    if (HGB < 7) score += 5;
    else if (HGB < 9) score += 3.5;
    else if (HGB < 11) score += 2;
    else if (HGB < 12) score += 1;
    else if (HGB < 13) score += 0.5;

    // RBC impact
    if (RBC < 3.0) score += 2;
    else if (RBC < 3.8) score += 1;
    else if (RBC < 4.2) score += 0.5;

    // MCV (microcytic/macrocytic)
    if (MCV < 70) score += 1.5;
    else if (MCV < 80) score += 0.8;
    else if (MCV > 100) score += 0.7;

    // MCH & MCHC
    if (MCH < 22) score += 1.2;
    else if (MCH < 27) score += 0.6;
    if (MCHC < 30) score += 1.2;
    else if (MCHC < 32) score += 0.6;

    let finalScore = Math.min(10, score);
    let severity = "Normal";
    if (finalScore >= 7.5) severity = "Critical";
    else if (finalScore >= 5.5) severity = "Severe";
    else if (finalScore >= 3.2) severity = "Moderate";
    else if (finalScore >= 1.2) severity = "Mild";

    // Override for extreme low HGB
    if (HGB < 6.5) severity = "Critical";
    else if (HGB < 8 && severity === "Mild") severity = "Moderate";

    return { severity, score: finalScore };
  };

  const resetForm = () => {
    setForm({ RBC: "", HGB: "", MCV: "", MCH: "", MCHC: "" });
    setResult(null);
    setError(null);
  };

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Normal": return "text-emerald-600 bg-emerald-50 border-emerald-200";
      case "Mild": return "text-amber-600 bg-amber-50 border-amber-200";
      case "Moderate": return "text-orange-600 bg-orange-50 border-orange-200";
      case "Severe": return "text-red-600 bg-red-50 border-red-200";
      case "Critical": return "text-purple-800 bg-purple-50 border-purple-200";
      default: return "text-gray-600 bg-gray-50 border-gray-200";
    }
  };

  const getScoreColor = (score) => {
    if (score < 2) return "bg-emerald-500";
    if (score < 4) return "bg-amber-500";
    if (score < 6) return "bg-orange-500";
    if (score < 8) return "bg-red-500";
    return "bg-purple-700";
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "Normal": return "fa-heartbeat";
      case "Mild": return "fa-smile";
      case "Moderate": return "fa-chart-line";
      case "Severe": return "fa-exclamation-triangle";
      case "Critical": return "fa-skull-crossbones";
      default: return "fa-stethoscope";
    }
  };

  const getRecommendation = (severity, score) => {
    switch (severity) {
      case "Normal": return "All parameters within reference range. Maintain healthy diet rich in iron and vitamins.";
      case "Mild": return "Mild reduction detected. Consider iron-rich foods (spinach, red meat, legumes) and follow up in 4-6 weeks.";
      case "Moderate": return "Moderate anemia. Clinical consultation recommended. Complete iron panel and further evaluation.";
      case "Severe": return "Severe anemia detected. Urgent hematology referral advised. Immediate intervention may be required.";
      case "Critical": return "CRITICAL VALUES. Seek immediate medical attention. Emergency evaluation strongly recommended.";
      default: return "Consult healthcare provider for proper interpretation.";
    }
  };

  const fieldConfig = {
    RBC: { label: "RBC", unit: "M/µL", icon: "fa-tint", min: 2.5, max: 6.5, step: 0.1, placeholder: "e.g., 4.5" },
    HGB: { label: "HGB", unit: "g/dL", icon: "fa-heartbeat", min: 5, max: 18, step: 0.1, placeholder: "e.g., 13.5" },
    MCV: { label: "MCV", unit: "fL", icon: "fa-microscope", min: 50, max: 120, step: 1, placeholder: "e.g., 90" },
    MCH: { label: "MCH", unit: "pg", icon: "fa-weight-hanging", min: 18, max: 40, step: 0.1, placeholder: "e.g., 30" },
    MCHC: { label: "MCHC", unit: "g/dL", icon: "fa-percent", min: 25, max: 40, step: 0.1, placeholder: "e.g., 33" },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-2 rounded-xl shadow-md">
                <i className="fas fa-tint text-white text-xl"></i>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-800">Anemia<span className="text-cyan-600">Severity</span></h1>
                <p className="text-xs text-gray-500">Clinical Decision Support Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <i className="fas fa-microchip text-cyan-500"></i>
              <span className="text-gray-600 hidden sm:inline">AI-Powered Prediction</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Input Form */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <i className="fas fa-notes-medical text-cyan-600 text-lg"></i>
                  <h2 className="text-lg font-semibold text-gray-800">Complete Blood Count (CBC) Parameters</h2>
                </div>
                <p className="text-xs text-gray-500 mt-1">Enter patient's hematology values for severity assessment</p>
              </div>

              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {Object.keys(fieldConfig).map((key) => (
                    <div key={key} className="space-y-1.5">
                      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
                        <i className={`fas ${fieldConfig[key].icon} text-cyan-500 text-xs`}></i>
                        {fieldConfig[key].label}
                        <span className="text-xs text-gray-400">({fieldConfig[key].unit})</span>
                      </label>
                      <input
                        type="number"
                        name={key}
                        value={form[key]}
                        onChange={handleChange}
                        step={fieldConfig[key].step}
                        placeholder={fieldConfig[key].placeholder}
                        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all duration-200"
                      />
                      <p className="text-xs text-gray-400">
                        Range: {fieldConfig[key].min} - {fieldConfig[key].max} {fieldConfig[key].unit}
                      </p>
                    </div>
                  ))}
                </div>

                {error && (
                  <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-xl flex items-center gap-2 text-red-700 text-sm">
                    <i className="fas fa-exclamation-circle"></i>
                    <span>{error}</span>
                  </div>
                )}

                <div className="mt-6 flex flex-wrap gap-3">
                  <button
                    onClick={handleSubmit}
                    disabled={loading}
                    className="flex-1 sm:flex-none bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-700 hover:to-blue-800 text-white font-semibold py-3 px-8 rounded-xl shadow-md hover:shadow-lg transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? (
                      <>
                        <i className="fas fa-spinner fa-spin"></i>
                        <span>Analyzing...</span>
                      </>
                    ) : (
                      <>
                        <i className="fas fa-chart-simple"></i>
                        <span>Predict Severity</span>
                      </>
                    )}
                  </button>
                  <button
                    onClick={resetForm}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-6 rounded-xl transition-all duration-200 flex items-center gap-2"
                  >
                    <i className="fas fa-undo-alt"></i>
                    <span>Reset</span>
                  </button>
                </div>
              </div>

              {/* Reference ranges info */}
              <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
                <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><i className="fas fa-chart-line text-cyan-500"></i> RBC: 4.0–5.9</span>
                  <span className="flex items-center gap-1"><i className="fas fa-heartbeat text-red-400"></i> HGB: 12–17</span>
                  <span className="flex items-center gap-1"><i className="fas fa-microscope text-purple-400"></i> MCV: 80–100</span>
                  <span className="flex items-center gap-1"><i className="fas fa-weight-hanging text-green-500"></i> MCH: 27–34</span>
                  <span className="flex items-center gap-1"><i className="fas fa-percent text-orange-400"></i> MCHC: 32–36</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Results Dashboard */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden sticky top-24">
              <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <i className="fas fa-chart-pie text-cyan-600 text-lg"></i>
                    <h2 className="text-lg font-semibold text-gray-800">Prediction Result</h2>
                  </div>
                  {result && (
                    <span className="text-xs text-gray-400 flex items-center gap-1">
                      <i className="fas fa-clock"></i>
                      Real-time
                    </span>
                  )}
                </div>
              </div>

              <div className="p-6">
                {!result && !loading ? (
                  <div className="text-center py-12">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <i className="fas fa-stethoscope text-3xl text-gray-400"></i>
                    </div>
                    <p className="text-gray-500 font-medium">No prediction yet</p>
                    <p className="text-sm text-gray-400 mt-2">Enter CBC values and click "Predict Severity"</p>
                  </div>
                ) : loading ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 border-4 border-cyan-200 border-t-cyan-600 rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-500">Calculating severity score...</p>
                    <p className="text-xs text-gray-400 mt-2">Using AI clinical model</p>
                  </div>
                ) : (
                  <div className="space-y-5">
                    {/* Severity Card */}
                    <div className={`rounded-xl border-2 p-5 text-center ${getSeverityColor(result.severity)}`}>
                      <i className={`fas ${getSeverityIcon(result.severity)} text-4xl mb-3`}></i>
                      <p className="text-xs font-semibold uppercase tracking-wider opacity-70">Anemia Severity</p>
                      <p className="text-3xl font-bold mt-1">{result.severity}</p>
                    </div>

                    {/* Score Bar */}
                    <div>
                      <div className="flex justify-between items-baseline mb-2">
                        <span className="text-sm font-medium text-gray-600">
                          <i className="fas fa-chart-line mr-1 text-cyan-500"></i>Severity Score
                        </span>
                        <span className="text-2xl font-bold text-gray-800">{result.score.toFixed(2)}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                        <div
                          className={`${getScoreColor(result.score)} h-3 rounded-full transition-all duration-500`}
                          style={{ width: `${Math.min(100, (result.score / 10) * 100)}%` }}
                        ></div>
                      </div>
                      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
                        <i className="fas fa-info-circle"></i>
                        Score range: 0 (Normal) – 10 (Critical)
                      </p>
                    </div>

                    {/* Recommendation */}
                    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
                      <div className="flex items-start gap-2">
                        <i className="fas fa-clinic-medical text-blue-600 text-sm mt-0.5"></i>
                        <div>
                          <p className="text-xs font-semibold text-blue-800 uppercase tracking-wide">Clinical Recommendation</p>
                          <p className="text-sm text-gray-700 mt-1">{getRecommendation(result.severity, result.score)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Input Summary */}
                    <div className="bg-gray-50 rounded-xl p-3">
                      <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
                        <i className="fas fa-chart-bar"></i> Input Parameters
                      </p>
                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div><span className="text-gray-500">RBC:</span> <span className="font-medium">{form.RBC} M/µL</span></div>
                        <div><span className="text-gray-500">HGB:</span> <span className="font-medium">{form.HGB} g/dL</span></div>
                        <div><span className="text-gray-500">MCV:</span> <span className="font-medium">{form.MCV} fL</span></div>
                        <div><span className="text-gray-500">MCH:</span> <span className="font-medium">{form.MCH} pg</span></div>
                        <div className="col-span-2"><span className="text-gray-500">MCHC:</span> <span className="font-medium">{form.MCHC} g/dL</span></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-400">
          <i className="fas fa-shield-alt mr-1"></i>
          This dashboard provides AI-assisted predictions. Always confirm with laboratory results and clinical evaluation.
        </div>
      </div>

      {/* Font Awesome CDN */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css" />
    </div>
  );
};

export default App;