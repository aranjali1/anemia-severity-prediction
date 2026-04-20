import React, { useState } from "react";
import Navbar from "./components/Navbar";
import InputForm from "./components/InputForm";
import ResultDashboard from "./components/ResultDashboard";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";

function App() {
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
      // Prepare data for both APIs (lowercase field names as expected by backend)
      const apiData = {
        mcv: parseFloat(form.MCV),
        mch: parseFloat(form.MCH),
        mchc: parseFloat(form.MCHC),
        rbc: parseFloat(form.RBC),
        hgb: parseFloat(form.HGB),
      };

      // Call both endpoints in parallel
      const [xgbResponse, kmeansResponse] = await Promise.all([
        fetch("http://127.0.0.1:5000/predict-xgb", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(apiData),
        }),
        fetch("http://127.0.0.1:5000/predict-kmeans", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(apiData),
        }),
      ]);

      // Check if both requests were successful
      if (!xgbResponse.ok) {
        const errorData = await xgbResponse.json();
        throw new Error(errorData.error || "XGBoost prediction failed");
      }
      if (!kmeansResponse.ok) {
        const errorData = await kmeansResponse.json();
        throw new Error(errorData.error || "KMeans prediction failed");
      }

      const xgbData = await xgbResponse.json();
      const kmeansData = await kmeansResponse.json();

      // Combine results from both models - using API data directly
      const combinedResult = {
        // XGBoost results (severity score AND condition)
        severity_score: xgbData.severity_score,
        xgb_model: xgbData.model,
        
        // KMeans results
        kmeans_cluster: kmeansData.cluster,
        kmeans_condition: kmeansData.condition,
        kmeans_severity: kmeansData.level,
        kmeans_model: kmeansData.model,
      };

      setResult(combinedResult);
    } catch (err) {
      console.error("API Error:", err);
      setError(err.message || "Failed to get prediction. Please check if backend is running.");
      setResult(null);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setForm({ RBC: "", HGB: "", MCV: "", MCH: "", MCHC: "" });
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <HeroSection />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <InputForm
              form={form}
              onChange={handleChange}
              onSubmit={handleSubmit}
              onReset={resetForm}
              loading={loading}
              error={error}
            />
          </div>
          <div className="lg:col-span-1">
            <ResultDashboard
              result={result}
              loading={loading}
              form={form}
            />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;