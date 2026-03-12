import React, { useState } from 'react';
import { FiArrowLeft, FiPlay, FiCheckCircle, FiBookOpen, FiClock, FiStar, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const courses = [
  { id: 1, title: 'Advancing with Neural Networks', instructor: 'Dr. Sarah Chen', duration: '6h 45m', rating: 4.9, progress: 100 },
  { id: 2, title: 'UI/UX Design Systems', instructor: 'Marcus Volt', duration: '12h 20m', rating: 4.8, progress: 45 },
  { id: 3, title: 'Fullstack Mastery 2024', instructor: 'Leo Brooks', duration: '24h 00m', rating: 5.0, progress: 0 }
];

const LMSPrototype = () => {
  const [activeCourse, setActiveCourse] = useState(courses[1]);

  return (
    <div className="proto-page educore-theme">
      {/* Top Bar */}
      <header className="educore-top">
        <div className="educore-container">
          <Link to="/" className="back-link"><FiArrowLeft /> Back to Dashboard</Link>
          <div className="educore-logo">EDU<span>CORE</span></div>
          <div className="user-profile">
            <div className="text-right">
              <p className="name">Alex Johnson</p>
              <p className="role">Senior Developer</p>
            </div>
            <img src="https://i.pravatar.cc/100?u=alex" alt="" />
          </div>
        </div>
      </header>

      <main className="educore-main educore-container">
        {/* Left Sidebar */}
        <aside className="educore-side">
          <nav className="side-nav">
            <div className="nav-item active"><FiBookOpen /> My Courses</div>
            <div className="nav-item"><FiStar /> Certifications</div>
            <div className="nav-item"><FiClock /> Learning History</div>
          </nav>
          
          <div className="learning-goal-card glass">
            <h4>Weekly Goal</h4>
            <div className="goal-progress">
              <div className="goal-bar"><div style={{ width: '70%' }} /></div>
              <span>14 / 20 hours</span>
            </div>
            <p>You're on track! Only 6 hours left to reach your weekly milestone.</p>
          </div>
        </aside>

        {/* Content */}
        <section className="educore-content">
          <div className="active-lesson-card animate-fade-in">
            <div className="video-placeholder">
              <div className="play-btn-circle"><FiPlay /></div>
              <img src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&h=400&fit=crop" alt="" />
              <div className="video-controls">
                <div className="progress-track"><div className="progress-fill" style={{ width: '45%' }} /></div>
              </div>
            </div>
            <div className="lesson-info">
              <span className="lesson-tag">Module 4 • Lesson 2</span>
              <h2>Building Scalable Components</h2>
              <p>In this lesson, we explore the architecture of design systems and how to build reusable React components that scale across large organizations.</p>
            </div>
          </div>

          <div className="course-list-section">
            <h3>Continue Learning</h3>
            <div className="course-grid">
              {courses.map((course) => (
                <div key={course.id} className="course-card glass" onClick={() => setActiveCourse(course)}>
                  <div className="c-info">
                    <h4>{course.title}</h4>
                    <p>{course.instructor}</p>
                  </div>
                  <div className="c-meta">
                    <span><FiClock /> {course.duration}</span>
                    <span className="rating"><FiStar /> {course.rating}</span>
                  </div>
                  <div className="c-progress">
                    <div className="c-bar"><div style={{ width: `${course.progress}%` }} /></div>
                    <span>{course.progress}%</span>
                  </div>
                  {course.progress === 100 && <FiCheckCircle className="done-icon" />}
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .educore-theme {
          background: #f4f7fa;
          color: #2d3436;
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
        }

        .educore-container { max-width: 1400px; margin: 0 auto; padding: 0 30px; }
        
        .educore-top { height: 80px; background: #fff; border-bottom: 1px solid #e1e8ef; display: flex; align-items: center; position: sticky; top: 0; z-index: 100; }
        .educore-top .educore-container { display: flex; justify-content: space-between; align-items: center; width: 100%; }
        .educore-logo { font-size: 1.5rem; font-weight: 800; letter-spacing: -0.5px; }
        .educore-logo span { color: #6c5ce7; }
        .user-profile { display: flex; gap: 15px; align-items: center; }
        .user-profile img { width: 45px; height: 45px; border-radius: 12px; }
        .text-right { text-align: right; }
        .text-right .name { font-weight: 700; font-size: 0.9rem; }
        .text-right .role { font-size: 0.75rem; color: #888; }
        .back-link { color: #888; text-decoration: none; display: flex; align-items: center; gap: 8px; font-weight: 600; font-size: 0.9rem; }

        .educore-main { display: grid; grid-template-columns: 280px 1fr; gap: 40px; padding-top: 40px; padding-bottom: 60px; }
        
        .side-nav { display: flex; flex-direction: column; gap: 10px; margin-bottom: 40px; }
        .side-nav .nav-item { padding: 15px 20px; border-radius: 12px; display: flex; align-items: center; gap: 15px; font-weight: 700; color: #888; cursor: pointer; transition: all 0.3s; }
        .side-nav .nav-item:hover, .side-nav .nav-item.active { background: #6c5ce7; color: #fff; box-shadow: 0 10px 20px rgba(108, 92, 231, 0.2); }

        .learning-goal-card { padding: 25px; background: #fff; border-radius: 20px; border: 1px solid #e1e8ef; }
        .learning-goal-card h4 { font-size: 1rem; margin-bottom: 20px; }
        .goal-progress { display: flex; justify-content: space-between; align-items: center; font-size: 0.8rem; font-weight: 700; margin-bottom: 15px; }
        .goal-bar { flex: 1; height: 6px; background: #f0f3f6; border-radius: 10px; margin: 0 15px; position: relative; overflow: hidden; }
        .goal-bar div { position: absolute; left: 0; top: 0; height: 100%; background: #6c5ce7; border-radius: 10px; }
        .learning-goal-card p { font-size: 0.8rem; line-height: 1.6; color: #888; font-weight: 500; }

        .active-lesson-card { background: #fff; border-radius: 30px; overflow: hidden; border: 1px solid #e1e8ef; margin-bottom: 50px; }
        .video-placeholder { height: 450px; background: #000; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; }
        .video-placeholder img { width: 100%; height: 100%; object-fit: cover; opacity: 0.6; }
        .play-btn-circle { width: 80px; height: 80px; background: #6c5ce7; color: #fff; border-radius: 50%; font-size: 2rem; display: flex; align-items: center; justify-content: center; position: absolute; z-index: 2; cursor: pointer; transition: transform 0.3s; box-shadow: 0 0 30px rgba(108,92,231,0.5); }
        .play-btn-circle:hover { transform: scale(1.1); }
        .video-controls { position: absolute; bottom: 0; left: 0; right: 0; height: 4px; z-index: 2; }
        .progress-track { width: 100%; height: 100%; background: rgba(255,255,255,0.2); }
        .progress-fill { height: 100%; background: #6c5ce7; }
        .lesson-info { padding: 40px; }
        .lesson-tag { font-size: 0.75rem; font-weight: 800; color: #6c5ce7; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 15px; display: block; }
        .lesson-info h2 { font-size: 2rem; margin-bottom: 20px; font-weight: 800; }
        .lesson-info p { font-size: 1rem; color: #636e72; line-height: 1.7; max-width: 800px; }

        .course-list-section h3 { font-size: 1.5rem; font-weight: 800; margin-bottom: 30px; }
        .course-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 25px; }
        .course-card { padding: 25px; background: #fff; border-radius: 20px; border: 1px solid #e1e8ef; position: relative; transition: transform 0.3s; cursor: pointer; }
        .course-card:hover { transform: translateY(-5px); border-color: #6c5ce7; }
        .c-info h4 { font-size: 1.1rem; font-weight: 800; margin-bottom: 5px; }
        .c-info p { font-size: 0.85rem; color: #888; font-weight: 600; margin-bottom: 20px; }
        .c-meta { display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; color: #636e72; margin-bottom: 20px; }
        .c-meta span { display: flex; align-items: center; gap: 6px; }
        .rating { color: #fdcb6e; }
        .c-progress { display: flex; align-items: center; gap: 15px; font-size: 0.75rem; font-weight: 800; color: #888; }
        .c-bar { flex: 1; height: 5px; background: #f0f3f6; border-radius: 10px; position: relative; overflow: hidden; }
        .c-bar div { position: absolute; height: 100%; background: #00b894; }
        .done-icon { position: absolute; top: 20px; right: 20px; color: #00b894; font-size: 1.5rem; }

        @media (max-width: 1024px) { .educore-main { grid-template-columns: 1fr; } .course-grid { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .course-grid { grid-template-columns: 1fr; } .video-placeholder { height: 250px; } }
      ` }} />
    </div>
  );
};

export default LMSPrototype;
