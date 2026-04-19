import React from "react";
import { getRecommendation } from "../utils/helpers";

const Recommendation = ({ severity, score }) => {
  const recommendation = getRecommendation(severity, score);
  
  return (
    <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
      <div className="flex items-start gap-2">
        <i className="fas fa-clinic-medical text-blue-600 text-sm mt-0.5"></i>
        <div>
          <p className="text-xs font-semibold text-blue-800 uppercase tracking-wide">
            Clinical Recommendation
          </p>
          <p className="text-sm text-gray-700 mt-1">{recommendation}</p>
        </div>
      </div>
    </div>
  );
};

export default Recommendation;