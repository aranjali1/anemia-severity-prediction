export const getSeverityColor = (severity) => {
  switch (severity) {
    case "Normal":
      return "text-emerald-600 bg-emerald-50 border-emerald-200";
    case "Mild":
      return "text-amber-600 bg-amber-50 border-amber-200";
    case "Moderate":
      return "text-orange-600 bg-orange-50 border-orange-200";
    case "Severe":
      return "text-red-600 bg-red-50 border-red-200";
    case "Critical":
      return "text-purple-800 bg-purple-50 border-purple-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

export const getSeverityIcon = (severity) => {
  switch (severity) {
    case "Normal":
      return "fa-heartbeat";
    case "Mild":
      return "fa-smile";
    case "Moderate":
      return "fa-chart-line";
    case "Severe":
      return "fa-exclamation-triangle";
    case "Critical":
      return "fa-skull-crossbones";
    default:
      return "fa-stethoscope";
  }
};

export const getScoreColor = (score) => {
  if (score < 2) return "bg-emerald-500";
  if (score < 4) return "bg-amber-500";
  if (score < 6) return "bg-orange-500";
  if (score < 8) return "bg-red-500";
  return "bg-purple-700";
};

export const getRecommendation = (severity, score) => {
  switch (severity) {
    case "Normal":
      return "All parameters within reference range. Maintain healthy diet rich in iron and vitamins.";
    case "Mild":
      return "Mild reduction detected. Consider iron-rich foods (spinach, red meat, legumes) and follow up in 4-6 weeks.";
    case "Moderate":
      return "Moderate anemia. Clinical consultation recommended. Complete iron panel and further evaluation.";
    case "Severe":
      return "Severe anemia detected. Urgent hematology referral advised. Immediate intervention may be required.";
    case "Critical":
      return "CRITICAL VALUES. Seek immediate medical attention. Emergency evaluation strongly recommended.";
    default:
      return "Consult healthcare provider for proper interpretation.";
  }
};