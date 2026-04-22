"use client";

import React, { useState, useMemo } from 'react';
import { ArrowLeft, Play, CheckCircle, BookOpen, Clock, Star, ChevronRight, LayoutDashboard, GraduationCap, History, Settings } from 'lucide-react';
import Link from 'next/link';

const courses = [
  { id: 1, title: 'Advancing with Neural Networks', instructor: 'Dr. Sarah Chen', duration: '6h 45m', rating: 4.9, progress: 100, lesson: "Building Recurrent Nodes", desc: "Dive deep into the architecture of neural systems and recurrent connections." },
  { id: 2, title: 'UI/UX Design Systems', instructor: 'Marcus Volt', duration: '12h 20m', rating: 4.8, progress: 45, lesson: "Building Scalable Components", desc: "In this lesson, we explore the architecture of design systems and how to build reusable React components that scale." },
  { id: 3, title: 'Fullstack Mastery 2024', instructor: 'Leo Brooks', duration: '24h 00m', rating: 5.0, progress: 0, lesson: "Initialization & Architecture", desc: "Setting up the foundation for a modern enterprise-grade fullstack application." }
];

export default function LMSPrototype() {
  const [activeCourseId, setActiveCourseId] = useState(2);
  const [activeNav, setActiveNav] = useState('courses');
  const [isPlaying, setIsPlaying] = useState(false);

  const activeCourse = useMemo(() => {
    return courses.find(c => c.id === activeCourseId) || courses[0];
  }, [activeCourseId]);

  return (
    <div className="proto-page educore-theme">
      {/* Top Bar */}
      <header className="educore-top">
        <div className="educore-container">
          <Link href="/#work" className="back-link"><ArrowLeft className="w-4 h-4" /> Back</Link>
          <div className="educore-logo">EDU<span>CORE</span></div>
          <div className="user-profile">
            <div className="text-right hidden sm:block">
              <p className="name">Alex Johnson</p>
              <p className="role">Senior Developer</p>
            </div>
            <img src="https://i.pravatar.cc/100?u=alex" alt="" className="cursor-pointer hover:ring-2 ring-purple-500 transition-all" />
          </div>
        </div>
      </header>

      <main className="educore-main educore-container">
        {/* Left Sidebar */}
        <aside className="educore-side">
          <nav className="side-nav">
            {[
              { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
              { id: 'courses', icon: GraduationCap, label: 'My Courses' },
              { id: 'history', icon: History, label: 'History' },
              { id: 'settings', icon: Settings, label: 'Settings' }
            ].map(item => (
              <div 
                key={item.id}
                className={`nav-item ${activeNav === item.id ? 'active' : ''}`}
                onClick={() => setActiveNav(item.id)}
              >
                <item.icon className="w-5 h-5" /> {item.label}
              </div>
            ))}
          </nav>
          
          <div className="learning-goal-card glass group cursor-default">
            <h4 className="font-bold">Weekly Goal</h4>
            <div className="goal-progress">
              <div className="goal-bar"><div className="bg-purple-500 shadow-[0_0_15px_rgba(108,92,231,0.5)]" style={{ width: '70%' }} /></div>
              <span>14 / 20 hrs</span>
            </div>
            <p className="text-xs">You're on track! Only 6 hours left to reach your weekly milestone.</p>
          </div>
        </aside>

        {/* Content */}
        <section className="educore-content">
          {activeNav === 'courses' ? (
            <>
              <div className="active-lesson-card animate-in fade-in slide-in-from-bottom-4 duration-700">
                <div className="video-placeholder group" onClick={() => setIsPlaying(!isPlaying)}>
                  {!isPlaying && (
                    <div className="play-btn-circle group-hover:scale-110 transition-transform">
                      <Play className="w-8 h-8 fill-white ml-1" />
                    </div>
                  )}
                  <img 
                    src={`https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1000&h=400&fit=crop&q=80&u=${activeCourseId}`} 
                    alt="" 
                    className={`transition-all duration-1000 ${isPlaying ? 'scale-105 opacity-40' : 'opacity-60'}`}
                  />
                  {isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-white font-black tracking-widest uppercase text-xs animate-pulse bg-black/40 px-6 py-3 rounded-full backdrop-blur-md">
                        Neural Stream Active...
                      </div>
                    </div>
                  )}
                  <div className="video-controls">
                    <div className="progress-track"><div className="progress-fill" style={{ width: isPlaying ? '65%' : `${activeCourse.progress}%` }} /></div>
                  </div>
                </div>
                <div className="lesson-info">
                  <span className="lesson-tag">Module 4 • Lesson 2</span>
                  <h2 className="font-bold text-3xl mb-4">{activeCourse.lesson}</h2>
                  <p className="text-gray-500 leading-relaxed">{activeCourse.desc}</p>
                </div>
              </div>

              <div className="course-list-section">
                <h3 className="font-bold">Continue Learning</h3>
                <div className="course-grid">
                  {courses.map((course) => (
                    <div 
                      key={course.id} 
                      className={`course-card glass transition-all ${activeCourseId === course.id ? 'ring-2 ring-purple-500 shadow-xl' : 'hover:scale-102'}`} 
                      onClick={() => { setActiveCourseId(course.id); setIsPlaying(false); }}
                    >
                      <div className="c-info">
                        <h4 className="font-bold line-clamp-1">{course.title}</h4>
                        <p className="text-xs mb-4">{course.instructor}</p>
                      </div>
                      <div className="c-meta">
                        <span><Clock className="w-3 h-3" /> {course.duration}</span>
                        <span className="rating"><Star className="w-3 h-3 fill-yellow-500 text-yellow-500" /> {course.rating}</span>
                      </div>
                      <div className="c-progress">
                        <div className="c-bar"><div className={course.progress === 100 ? "bg-emerald-500" : "bg-purple-500"} style={{ width: `${course.progress}%` }} /></div>
                        <span>{course.progress}%</span>
                      </div>
                      {course.progress === 100 && <CheckCircle className="done-icon w-5 h-5" />}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center py-32 opacity-30 text-center space-y-4">
              <div className="w-24 h-24 rounded-3xl bg-white flex items-center justify-center shadow-inner">
                <BookOpen className="w-10 h-10" />
              </div>
              <p className="font-bold uppercase tracking-widest text-[10px]">Accessing {activeNav} node...</p>
            </div>
          )}
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .educore-theme {
          background: #f8fafc;
          color: #1e293b;
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
        }

        .educore-container { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
        
        .educore-top { height: 90px; background: #fff; border-bottom: 1px solid #e2e8f0; display: flex; align-items: center; position: sticky; top: 0; z-index: 100; }
        .educore-top .educore-container { display: flex; justify-content: space-between; align-items: center; width: 100%; }
        .educore-logo { font-size: 1.6rem; font-weight: 800; letter-spacing: -1px; }
        .educore-logo span { color: #6c5ce7; }
        .user-profile { display: flex; gap: 15px; align-items: center; }
        .user-profile img { width: 45px; height: 45px; border-radius: 14px; }
        .text-right { text-align: right; }
        .text-right .name { font-weight: 700; font-size: 0.9rem; }
        .text-right .role { font-size: 0.7rem; color: #64748b; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; }
        .back-link { color: #94a3b8; text-decoration: none; display: flex; align-items: center; gap: 8px; font-weight: 700; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; }
        .back-link:hover { color: #6c5ce7; }

        .educore-main { display: grid; grid-template-columns: 280px 1fr; gap: 60px; padding-top: 50px; padding-bottom: 80px; }
        
        .side-nav { display: flex; flex-direction: column; gap: 8px; margin-bottom: 50px; }
        .side-nav .nav-item { padding: 16px 20px; border-radius: 16px; display: flex; align-items: center; gap: 15px; font-weight: 700; color: #64748b; cursor: pointer; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
        .side-nav .nav-item:hover { background: #f1f5f9; color: #1e293b; }
        .side-nav .nav-item.active { background: #6c5ce7; color: #fff; box-shadow: 0 20px 40px rgba(108, 92, 231, 0.25); }

        .learning-goal-card { padding: 25px; background: #fff; border-radius: 24px; border: 1px solid #e2e8f0; box-shadow: 0 10px 30px rgba(0,0,0,0.02); }
        .learning-goal-card h4 { font-size: 0.9rem; margin-bottom: 20px; text-transform: uppercase; letter-spacing: 0.1em; color: #94a3b8; }
        .goal-progress { display: flex; justify-content: space-between; align-items: center; font-size: 0.75rem; font-weight: 800; margin-bottom: 15px; }
        .goal-bar { flex: 1; height: 6px; background: #f1f5f9; border-radius: 10px; margin-right: 15px; position: relative; overflow: hidden; }
        .goal-bar div { position: absolute; left: 0; top: 0; height: 100%; border-radius: 10px; }
        .learning-goal-card p { font-size: 0.75rem; line-height: 1.6; color: #64748b; font-weight: 500; }

        .active-lesson-card { background: #fff; border-radius: 40px; overflow: hidden; border: 1px solid #e2e8f0; margin-bottom: 60px; box-shadow: 0 30px 60px rgba(0,0,0,0.05); }
        .video-placeholder { height: 480px; background: #0f172a; position: relative; display: flex; align-items: center; justify-content: center; overflow: hidden; cursor: pointer; }
        .video-placeholder img { width: 100%; height: 100%; object-fit: cover; }
        .play-btn-circle { width: 90px; height: 90px; background: #6c5ce7; color: #fff; border-radius: 50%; display: flex; align-items: center; justify-content: center; position: absolute; z-index: 2; box-shadow: 0 0 40px rgba(108,92,231,0.6); }
        .video-controls { position: absolute; bottom: 0; left: 0; right: 0; height: 6px; z-index: 2; }
        .progress-track { width: 100%; height: 100%; background: rgba(255,255,255,0.1); }
        .progress-fill { height: 100%; background: #6c5ce7; transition: width 0.5s ease; box-shadow: 0 0 20px #6c5ce7; }
        .lesson-info { padding: 50px; }
        .lesson-tag { font-size: 0.7rem; font-weight: 800; color: #6c5ce7; text-transform: uppercase; letter-spacing: 2px; margin-bottom: 15px; display: block; }
        .lesson-info h2 { font-weight: 800; }

        .course-list-section h3 { font-size: 1.4rem; font-weight: 800; margin-bottom: 30px; text-transform: uppercase; letter-spacing: 0.05em; color: #64748b; }
        .course-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 30px; }
        .course-card { padding: 30px; background: #fff; border-radius: 28px; border: 1px solid #e2e8f0; position: relative; cursor: pointer; }
        .c-info h4 { font-size: 1rem; font-weight: 800; margin-bottom: 8px; }
        .c-meta { display: flex; justify-content: space-between; font-size: 0.75rem; font-weight: 700; color: #64748b; margin-bottom: 25px; }
        .c-meta span { display: flex; align-items: center; gap: 6px; }
        .c-progress { display: flex; align-items: center; gap: 15px; font-size: 0.7rem; font-weight: 800; color: #94a3b8; }
        .c-bar { flex: 1; height: 6px; background: #f1f5f9; border-radius: 10px; position: relative; overflow: hidden; }
        .c-bar div { position: absolute; height: 100%; }
        .done-icon { position: absolute; top: 25px; right: 25px; color: #10b981; }

        @media (max-width: 1200px) { .course-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 1024px) { .educore-main { grid-template-columns: 1fr; } }
        @media (max-width: 640px) { .course-grid { grid-template-columns: 1fr; } .video-placeholder { height: 300px; } .lesson-info { padding: 30px; } }
      ` }} />
    </div>
  );
}
