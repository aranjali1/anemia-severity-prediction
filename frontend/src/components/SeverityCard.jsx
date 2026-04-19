import React from "react";
import { getSeverityColor, getSeverityIcon } from "../utils/helpers";

const SeverityCard = ({ severity }) => {
  return (
    <div className={`rounded-xl border-2 p-5 text-center ${getSeverityColor(severity)}`}>
      <i className={`fas ${getSeverityIcon(severity)} text-4xl mb-3`}></i>
      <p className="text-xs font-semibold uppercase tracking-wider opacity-70">
        Anemia Severity
      </p>
      <p className="text-3xl font-bold mt-1">{severity}</p>
    </div>
  );
};

export default SeverityCard;