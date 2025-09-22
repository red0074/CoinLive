import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const steps = [
  "Initializing Crypto Tracker...",
  "Connecting to Market Data...",
  "Loading Real-time Prices...",
  "Preparing Dashboard...",
];

const LandingPage = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => navigate("/coins"), 1000);
          return 100;
        }
        return prev + 2;
      });
    }, 50);

    return () => clearInterval(timer);
  }, [navigate]);

  useEffect(() => {
    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < steps.length - 1) return prev + 1;
        clearInterval(stepTimer);
        return prev;
      });
    }, 1000);

    return () => clearInterval(stepTimer);
  }, []);

  return (
    <div className="landing-container">
      <div className="landing-content">
        <div className="logo-container">
          <div className="logo-circle">
            <span className="logo-bitcoin">₿</span>
          </div>
          <div className="logo-pulse"></div>
          <div className="logo-pulse delay"></div>
        </div>
        <div className="landing-title">
          <h1>Crypto Tracker</h1>
          <p>Real-time cryptocurrency market data</p>
        </div>
        <div className="landing-progress">
          <p>{steps[currentStep]}</p>
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <p>{Math.round(progress)}%</p>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
