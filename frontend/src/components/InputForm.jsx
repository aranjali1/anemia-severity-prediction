import React from "react";

const fieldConfig = {
  RBC: {
    label: "RBC",
    unit: "M/µL",
    icon: "fa-tint",
    min: 2.5,
    max: 6.5,
    step: 0.1,
    placeholder: "e.g., 4.5",
  },
  HGB: {
    label: "HGB",
    unit: "g/dL",
    icon: "fa-heartbeat",
    min: 5,
    max: 18,
    step: 0.1,
    placeholder: "e.g., 13.5",
  },
  MCV: {
    label: "MCV",
    unit: "fL",
    icon: "fa-microscope",
    min: 50,
    max: 120,
    step: 1,
    placeholder: "e.g., 90",
  },
  MCH: {
    label: "MCH",
    unit: "pg",
    icon: "fa-weight-hanging",
    min: 18,
    max: 40,
    step: 0.1,
    placeholder: "e.g., 30",
  },
  MCHC: {
    label: "MCHC",
    unit: "g/dL",
    icon: "fa-percent",
    min: 25,
    max: 40,
    step: 0.1,
    placeholder: "e.g., 33",
  },
};

const InputForm = ({ form, onChange, onSubmit, onReset, loading, error }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
      <div className="bg-gradient-to-r from-gray-50 to-white px-6 py-4 border-b border-gray-100">
        <div className="flex items-center gap-2">
          <i className="fas fa-notes-medical text-cyan-600 text-lg"></i>
          <h2 className="text-lg font-semibold text-gray-800">
            Complete Blood Count (CBC) Parameters
          </h2>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Enter patient's hematology values for severity assessment
        </p>
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
                onChange={onChange}
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
            onClick={onSubmit}
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
            onClick={onReset}
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
          <span className="flex items-center gap-1">
            <i className="fas fa-chart-line text-cyan-500"></i> RBC: 4.0–5.9
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-heartbeat text-red-400"></i> HGB: 12–17
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-microscope text-purple-400"></i> MCV: 80–100
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-weight-hanging text-green-500"></i> MCH: 27–34
          </span>
          <span className="flex items-center gap-1">
            <i className="fas fa-percent text-orange-400"></i> MCHC: 32–36
          </span>
        </div>
      </div>
    </div>
  );
};

export default InputForm;