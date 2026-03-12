import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiActivity, FiHeart, FiZap, FiTarget, FiTrendingUp } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const FitnessPrototype = () => {
  const [heartRate, setHeartRate] = useState(72);
  const [calories, setCalories] = useState(452);
  const [progress, setProgress] = useState(65);

  useEffect(() => {
    const pulse = setInterval(() => {
      setHeartRate(prev => 70 + Math.floor(Math.random() * 8));
      setCalories(prev => prev + (Math.random() > 0.7 ? 1 : 0));
    }, 2000);
    return () => clearInterval(pulse);
  }, []);

  return (
    <div className="proto-page pulsefit-theme">
      <div className="fitness-app">
        {/* Header */}
        <header className="fitness-header">
          <Link to="/" className="back-circle"><FiArrowLeft /></Link>
          <div className="header-text">
            <span>Good Morning,</span>
            <h2>Coach Arjun AI</h2>
          </div>
          <div className="notif-dot" />
        </header>

        {/* Main Stats */}
        <div className="main-stat-card animate-scale-in">
          <div className="stat-main">
            <div className="stat-circle">
              <svg viewBox="0 0 100 100">
                <circle className="bg" cx="50" cy="50" r="45" />
                <circle className="fg" cx="50" cy="50" r="45" style={{ strokeDashoffset: 282 - (282 * progress) / 100 }} />
              </svg>
              <div className="stat-center">
                <FiZap className="zap" />
                <span className="val">{progress}%</span>
                <span className="lbl">Daily Goal</span>
              </div>
            </div>
          </div>
          <div className="stat-grid">
            <div className="stat-mini">
              <span className="lbl">Heart Rate</span>
              <span className="val pulse-text"><FiHeart /> {heartRate} <span>BPM</span></span>
            </div>
            <div className="stat-mini">
              <span className="lbl">Calories</span>
              <span className="val"><FiTrendingUp /> {calories} <span>Kcal</span></span>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="fitness-grid">
          <div className="f-card glass animate-slide-up" style={{ transitionDelay: '0.1s' }}>
            <div className="f-icon-box blue"><FiActivity /></div>
            <h4>Activity</h4>
            <div className="chart-sim">
              <div style={{ height: '40%' }} /><div style={{ height: '60%' }} /><div style={{ height: '50%' }} /><div style={{ height: '80%' }} /><div style={{ height: '30%' }} />
            </div>
          </div>
          <div className="f-card glass animate-slide-up" style={{ transitionDelay: '0.2s' }}>
            <div className="f-icon-box green"><FiTarget /></div>
            <h4>Goals</h4>
            <p>Weight: 72kg</p>
            <p>Target: 68kg</p>
          </div>
        </div>

        {/* Workout Session */}
        <div className="session-card glass animate-slide-up" style={{ transitionDelay: '0.3s' }}>
          <div className="session-info">
            <h4>Morning Cardio</h4>
            <p>AI Personalized Plan • 45 min</p>
          </div>
          <button className="start-btn">Resume</button>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .pulsefit-theme {
          background: #000;
          color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
          display: flex;
          justify-content: center;
          padding: 40px 20px;
        }

        .fitness-app { max-width: 450px; width: 100%; display: flex; flex-direction: column; gap: 30px; }

        .fitness-header { display: flex; align-items: center; gap: 20px; position: relative; }
        .back-circle { width: 50px; height: 50px; border-radius: 50%; background: #111; display: flex; align-items: center; justify-content: center; color: #fff; text-decoration: none; border: 1px solid #222; transition: all 0.3s; }
        .back-circle:hover { background: #33e1ff; color: #000; transform: scale(1.1); }
        .header-text span { font-size: 0.8rem; color: #666; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
        .header-text h2 { font-size: 1.5rem; font-weight: 800; }
        .notif-dot { position: absolute; top: 10px; right: 0; width: 12px; height: 12px; background: #33e1ff; border-radius: 50%; box-shadow: 0 0 10px #33e1ff; }

        .main-stat-card { background: #0a0a0a; border-radius: 40px; padding: 40px; border: 1px solid #1a1a1a; display: flex; flex-direction: column; align-items: center; position: relative; overflow: hidden; }
        .stat-circle { position: relative; width: 200px; height: 200px; margin-bottom: 40px; }
        .stat-circle svg { transform: rotate(-90deg); }
        .stat-circle circle { fill: none; stroke-width: 6; stroke-linecap: round; }
        .stat-circle circle.bg { stroke: #151515; }
        .stat-circle circle.fg { stroke: #33e1ff; stroke-dasharray: 282; transition: stroke-dashoffset 1s ease; }
        .stat-center { position: absolute; inset: 0; display: flex; flex-direction: column; align-items: center; justify-content: center; }
        .zap { color: #33e1ff; font-size: 1.5rem; margin-bottom: 5px; }
        .stat-center .val { font-size: 2.5rem; font-weight: 800; font-family: 'Space Grotesk', sans-serif; }
        .stat-center .lbl { font-size: 0.8rem; color: #666; font-weight: 600; text-transform: uppercase; }

        .stat-grid { width: 100%; display: flex; justify-content: space-between; border-top: 1px solid #1a1a1a; padding-top: 30px; }
        .stat-mini { display: flex; flex-direction: column; gap: 5px; }
        .stat-mini .lbl { font-size: 0.75rem; color: #666; font-weight: 600; text-transform: uppercase; }
        .stat-mini .val { font-size: 1.25rem; font-weight: 800; display: flex; align-items: center; gap: 8px; }
        .stat-mini .val span { font-size: 0.8rem; opacity: 0.5; }
        .pulse-text { color: #ff3366; }
        .pulse-text svg { animation: heartbeat 1.5s infinite; }
        @keyframes heartbeat { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.2); } }

        .fitness-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .f-card { background: rgba(10,10,10,0.8); border: 1px solid #1a1a1a; padding: 25px; border-radius: 30px; }
        .f-icon-box { width: 45px; height: 45px; border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 1.25rem; margin-bottom: 15px; }
        .f-icon-box.blue { background: rgba(51, 225, 255, 0.1); color: #33e1ff; }
        .f-icon-box.green { background: rgba(51, 255, 136, 0.1); color: #33ff88; }
        .f-card h4 { font-size: 1rem; margin-bottom: 10px; }
        .f-card p { font-size: 0.8rem; color: #666; font-weight: 600; }
        .chart-sim { display: flex; align-items: flex-end; gap: 5px; height: 40px; }
        .chart-sim div { flex: 1; background: #33e1ff; border-radius: 2px; opacity: 0.3; transition: height 0.3s; }

        .session-card { background: #33e1ff; color: #000; padding: 30px; border-radius: 30px; display: flex; justify-content: space-between; align-items: center; }
        .session-info h4 { font-size: 1.2rem; font-weight: 800; margin-bottom: 5px; }
        .session-info p { font-size: 0.85rem; font-weight: 600; opacity: 0.7; }
        .start-btn { padding: 12px 25px; background: #000; color: #fff; border: none; border-radius: 15px; font-weight: 800; cursor: pointer; transition: transform 0.3s; }
        .start-btn:hover { transform: scale(1.05); }

        .glass { backdrop-filter: blur(10px); }
      ` }} />
    </div>
  );
};

export default FitnessPrototype;
