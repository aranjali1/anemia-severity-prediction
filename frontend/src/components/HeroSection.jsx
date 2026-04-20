import React from "react";

const HeroSection = () => {
  const scrollToForm = () => {
    const formElement = document.getElementById('input-form');
    if (formElement) {
      formElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-100 rounded-3xl shadow-xl mb-8">
      {/* Animated background patterns */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse [animation-delay:1000ms]"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse [animation-delay:2000ms]"></div>
      </div>

      {/* Floating icons */}
      <div className="absolute top-10 right-10 opacity-30 animate-bounce hidden md:block">
        <i className="fas fa-tint text-6xl text-cyan-600"></i>
      </div>
      <div className="absolute bottom-10 left-10 opacity-20 animate-pulse hidden md:block">
        <i className="fas fa-heartbeat text-5xl text-red-500"></i>
      </div>
      <div className="absolute top-1/2 left-1/4 opacity-10 hidden lg:block">
        <i className="fas fa-microscope text-7xl text-purple-600 animate-spin" style={{ animationDuration: '20s' }}></i>
      </div>

      {/* Content */}
      <div className="relative px-6 py-12 md:py-16 md:px-12 text-center">
        {/* Badge */}
        

        {/* Main Title */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-4">
          <span className="bg-linear-to-r from-cyan-700 via-blue-700 to-indigo-700 bg-clip-text text-transparent">
            Anemia Severity
          </span>
          <span className="block text-3xl md:text-5xl lg:text-6xl mt-2 bg-linear-to-r from-cyan-600 via-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Prediction Dashboard
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-8">
          Leverage advanced machine learning models (XGBoost & KMeans) to accurately assess 
          anemia severity from complete blood count (CBC) parameters.
        </p>

        {/* Key Features Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto mb-8">
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 text-center hover:shadow-lg transition-all duration-300 group">
            <i className="fas fa-chart-line text-2xl text-cyan-600 mb-2 group-hover:scale-110 transition-transform"></i>
            <p className="text-xs font-semibold text-gray-700">Severity Scoring</p>
            <p className="text-xs text-gray-500">XGBoost Model</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 text-center hover:shadow-lg transition-all duration-300 group">
            <i className="fas fa-chart-pie text-2xl text-purple-600 mb-2 group-hover:scale-110 transition-transform"></i>
            <p className="text-xs font-semibold text-gray-700">Clustering Analysis</p>
            <p className="text-xs text-gray-500">KMeans Algorithm</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 text-center hover:shadow-lg transition-all duration-300 group">
            <i className="fas fa-microscope text-2xl text-blue-600 mb-2 group-hover:scale-110 transition-transform"></i>
            <p className="text-xs font-semibold text-gray-700">5 CBC Parameters</p>
            <p className="text-xs text-gray-500">RBC, HGB, MCV, MCH, MCHC</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-xl p-3 text-center hover:shadow-lg transition-all duration-300 group">
            <i className="fas fa-clock text-2xl text-green-600 mb-2 group-hover:scale-110 transition-transform"></i>
            <p className="text-xs font-semibold text-gray-700">Real-time Results</p>
            <p className="text-xs text-gray-500">Instant Predictions</p>
          </div>
        </div>

        

        {/* Trust indicators */}
        <div className="flex flex-wrap justify-center gap-6 mt-8 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <i className="fas fa-flask text-purple-600"></i>
            <span>Clinical Grade</span>
          </div>
          <div className="flex items-center gap-2">
            <i className="fas fa-chart-line text-blue-600"></i>
            <span>98% Accuracy</span>
          </div>
        </div>
      </div>

      {/* Wave divider */}
      <div className="relative">
        <svg className="absolute bottom-0 w-full h-12 text-white" preserveAspectRatio="none" viewBox="0 0 1440 120">
          <path fill="currentColor" d="M0,32L48,42.7C96,53,192,75,288,74.7C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
        </svg>
      </div>
    </div>
  );
};

export default HeroSection;