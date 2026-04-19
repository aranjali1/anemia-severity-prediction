import React from "react";

const Navbar = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-2 rounded-xl shadow-md">
              <i className="fas fa-tint text-white text-xl"></i>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                Anemia<span className="text-cyan-600">Severity</span>
              </h1>
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
  );
};

export default Navbar;