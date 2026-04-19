import React from "react";
import { getScoreColor } from "../utils/helpers";

const ScoreBar = ({ score }) => {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <span className="text-sm font-medium text-gray-600">
          <i className="fas fa-chart-line mr-1 text-cyan-500"></i>Severity Score
        </span>
        <span className="text-2xl font-bold text-gray-800">{score.toFixed(2)}</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
        <div
          className={`${getScoreColor(score)} h-3 rounded-full transition-all duration-500`}
          style={{ width: `${Math.min(100, (score / 10) * 100)}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-500 mt-2 flex items-center gap-1">
        <i className="fas fa-info-circle"></i>
        Score range: 0 (Normal) – 10 (Critical)
      </p>
    </div>
  );
};

export default ScoreBar;