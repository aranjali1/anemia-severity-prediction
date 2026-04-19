import React from "react";

const FormField = ({ name, config, value, onChange }) => {
  return (
    <div className="space-y-1.5">
      <label className="flex items-center gap-2 text-sm font-medium text-gray-700">
        <i className={`fas ${config.icon} text-cyan-500 text-xs`}></i>
        {config.label}
        <span className="text-xs text-gray-400">({config.unit})</span>
      </label>
      <input
        type="number"
        name={name}
        value={value}
        onChange={onChange}
        step={config.step}
        placeholder={config.placeholder}
        className="w-full px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50/50 focus:bg-white focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200 transition-all duration-200"
      />
      <p className="text-xs text-gray-400">
        Range: {config.min} - {config.max} {config.unit}
      </p>
    </div>
  );
};

export default FormField;