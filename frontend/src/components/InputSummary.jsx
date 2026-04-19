import React from "react";

const InputSummary = ({ form }) => {
  return (
    <div className="bg-gray-50 rounded-xl p-3">
      <p className="text-xs font-semibold text-gray-500 mb-2 flex items-center gap-1">
        <i className="fas fa-chart-bar"></i> Input Parameters
      </p>
      <div className="grid grid-cols-3 gap-2 text-xs">
        <div>
          <span className="text-gray-500">RBC:</span>{" "}
          <span className="font-medium">{form.RBC} M/µL</span>
        </div>
        <div>
          <span className="text-gray-500">HGB:</span>{" "}
          <span className="font-medium">{form.HGB} g/dL</span>
        </div>
        <div>
          <span className="text-gray-500">MCV:</span>{" "}
          <span className="font-medium">{form.MCV} fL</span>
        </div>
        <div>
          <span className="text-gray-500">MCH:</span>{" "}
          <span className="font-medium">{form.MCH} pg</span>
        </div>
        <div className="col-span-2">
          <span className="text-gray-500">MCHC:</span>{" "}
          <span className="font-medium">{form.MCHC} g/dL</span>
        </div>
      </div>
    </div>
  );
};

export default InputSummary;