"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { ArrowLeft, Clock, MapPin, Star, ShoppingBag, ChevronRight, Search, Heart, User, ListOrdered } from 'lucide-react';
import Link from 'next/link';

const categories = [
  { name: 'All', icon: '🌈' },
  { name: 'Pizza', icon: '🍕' },
  { name: 'Burger', icon: '🍔' },
  { name: 'Sushi', icon: '🍣' },
  { name: 'Dessert', icon: '🍰' },
  { name: 'Salad', icon: '🥗' },
];

const restaurants = [
  {
    id: 1,
    name: 'Urban Slice Pizza',
    rating: 4.8,
    time: '20-30 min',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=500&h=300&fit=crop',
    type: 'Italian • Pizza',
    category: 'Pizza'
  },
  {
    id: 2,
    name: 'Burger Craft',
    rating: 4.6,
    time: '15-25 min',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop',
    type: 'Gourmet • Burgers',
    category: 'Burger'
  },
  {
    id: 3,
    name: 'Sushi Zen',
    rating: 4.9,
    time: '30-40 min',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=500&h=300&fit=crop',
    type: 'Japanese • Sushi',
    category: 'Sushi'
  }
];

export default function FoodDeliveryPrototype() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeNav, setActiveNav] = useState('home');
  const [orderStatus, setOrderStatus] = useState('Preparing');
  const [orderProgress, setOrderProgress] = useState(30);

  useEffect(() => {
    const timer = setInterval(() => {
      setOrderProgress(prev => {
        if (prev >= 100) {
          setOrderStatus('Delivered');
          return 100;
        }
        if (prev > 70) setOrderStatus('Out for Delivery');
        else if (prev > 40) setOrderStatus('On the Way');
        return prev + 0.5;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

  const filteredRestaurants = useMemo(() => {
    return restaurants.filter(r => {
      const matchesCat = activeCategory === 'All' || r.category === activeCategory;
      const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <div className="proto-page swiftbites-theme">
      <div className="phone-frame animate-slide-up">
        {/* Phone Header */}
        <header className="phone-header">
          <div className="status-bar">
            <span>9:41</span>
            <div className="status-icons">📶 🔋</div>
          </div>
          <div className="nav-bar">
            <Link href="/#work" className="back-btn"><ArrowLeft className="w-5 h-5" /></Link>
            <div className="location">
              <MapPin className="pin w-4 h-4" />
              <span>Downtown, NYC</span>
            </div>
            <div className="profile-pic">
              <img src="https://i.pravatar.cc/100?u=yash" alt="User" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="phone-content custom-scrollbar">
          {activeNav === 'home' ? (
            <>
              {/* Search */}
              <div className="search-bar-proto">
                <Search className="bag-icon w-4 h-4" />
                <input 
                  type="text" 
                  placeholder="Search for food or restaurants" 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Banner */}
              <div className="promo-banner group">
                <div className="promo-text">
                  <h3 className="font-bold">50% OFF</h3>
                  <p>On your first 3 orders!</p>
                  <button className="group-hover:scale-105 transition-transform">Order Now</button>
                </div>
                <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop" alt="Food" />
              </div>

              {/* Categories */}
              <div className="section-title-proto">Categories</div>
              <div className="categories-scroll">
                {categories.map((cat, i) => (
                  <div 
                    key={i} 
                    className={`cat-item ${activeCategory === cat.name ? 'active' : ''}`}
                    onClick={() => setActiveCategory(cat.name)}
                  >
                    <div className="cat-icon">{cat.icon}</div>
                    <span>{cat.name}</span>
                  </div>
                ))}
              </div>

              {/* Popular */}
              <div className="section-title-proto">Popular Near You</div>
              <div className="rest-list">
                {filteredRestaurants.map((rest) => (
                  <div key={rest.id} className="rest-card group cursor-pointer">
                    <div className="rest-image overflow-hidden">
                      <img src={rest.image} alt={rest.name} className="group-hover:scale-110 transition-transform duration-700" />
                      <div className="rest-badge"><Clock className="w-3 h-3" /> {rest.time}</div>
                    </div>
                    <div className="rest-info-proto">
                      <div className="rest-header">
                        <h4 className="group-hover:text-red-500 transition-colors">{rest.name}</h4>
                        <span className="rating"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> {rest.rating}</span>
                      </div>
                      <p>{rest.type}</p>
                    </div>
                  </div>
                ))}
                {filteredRestaurants.length === 0 && (
                  <div className="text-center py-20 opacity-40 italic">No restaurants found...</div>
                )}
              </div>
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-full opacity-50 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center">
                <Clock className="w-10 h-10" />
              </div>
              <p className="font-bold uppercase tracking-widest text-[10px]">Navigating to {activeNav.toUpperCase()}...</p>
            </div>
          )}

          {/* Live Tracking Overlay */}
          {activeNav === 'home' && (
            <div className="tracking-card">
              <div className="track-header">
                <div className="track-info">
                  <h5 className="font-bold">Current Order</h5>
                  <p>SwiftBites Express • #4421</p>
                </div>
                <div className="track-status">{orderStatus}</div>
              </div>
              <div className="track-progress-container">
                <div className="track-progress-bar" style={{ width: `${orderProgress}%` }} />
              </div>
              <div className="track-footer">
                <div className="eta">ETA: {Math.max(0, 15 - Math.floor(orderProgress/7))} mins</div>
                <button className="track-btn">Track Live</button>
              </div>
            </div>
          )}
        </div>

        {/* Bottom Nav */}
        <nav className="phone-bottom-nav">
          <div className={`nav-item ${activeNav === 'home' ? 'active' : ''}`} onClick={() => setActiveNav('home')}><ShoppingBag className="w-6 h-6" /></div>
          <div className={`nav-item ${activeNav === 'search' ? 'active' : ''}`} onClick={() => setActiveNav('search')}><Search className="w-6 h-6" /></div>
          <div className={`nav-item ${activeNav === 'orders' ? 'active' : ''}`} onClick={() => setActiveNav('orders')}><ListOrdered className="w-6 h-6" /></div>
          <div className={`nav-item ${activeNav === 'profile' ? 'active' : ''}`} onClick={() => setActiveNav('profile')}><User className="w-6 h-6" /></div>
        </nav>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .swiftbites-theme {
          background: #f8f9fa;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 40px 0;
          font-family: 'Plus Jakarta Sans', sans-serif;
          color: #333;
        }

        .phone-frame {
          width: 375px;
          height: 812px;
          background: white;
          border-radius: 40px;
          box-shadow: 0 50px 100px rgba(0,0,0,0.1), 0 0 0 10px #111;
          position: relative;
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .phone-header { padding: 20px; padding-top: 15px; }
        .status-bar { display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 700; margin-bottom: 20px; }
        .nav-bar { display: flex; justify-content: space-between; align-items: center; }
        .back-btn { font-size: 1.2rem; color: #333; text-decoration: none; }
        .location { display: flex; align-items: center; gap: 5px; font-weight: 700; font-size: 0.9rem; }
        .pin { color: #ff4757; }
        .profile-pic { width: 40px; height: 40px; border-radius: 50%; overflow: hidden; border: 2px solid white; box-shadow: 0 4px 10px rgba(0,0,0,0.1); }
        .profile-pic img { width: 100%; height: 100%; object-fit: cover; }

        .phone-content { flex: 1; overflow-y: auto; padding: 0 20px; position: relative; }
        .custom-scrollbar::-webkit-scrollbar { width: 0; }
        
        .search-bar-proto { background: #f1f2f6; padding: 15px; border-radius: 12px; display: flex; align-items: center; gap: 10px; margin-bottom: 25px; transition: all 0.3s; }
        .search-bar-proto:focus-within { background: white; box-shadow: 0 5px 15px rgba(0,0,0,0.05); }
        .bag-icon { color: #ff4757; }
        .search-bar-proto input { background: none; border: none; font-size: 0.85rem; width: 100%; outline: none; font-weight: 500; }

        .promo-banner { 
          background: #ff4757; 
          border-radius: 20px; 
          padding: 20px; 
          color: white; 
          display: flex; 
          align-items: center; 
          justify-content: space-between;
          margin-bottom: 25px;
          cursor: pointer;
        }
        .promo-text h3 { font-size: 1.8rem; margin-bottom: 5px; }
        .promo-text p { font-size: 0.8rem; opacity: 0.9; margin-bottom: 12px; }
        .promo-text button { background: white; color: #ff4757; border: none; padding: 8px 15px; border-radius: 8px; font-weight: 700; font-size: 0.75rem; cursor: pointer; }
        .promo-banner img { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; }

        .section-title-proto { font-weight: 800; font-size: 1.1rem; margin-bottom: 15px; }
        .categories-scroll { display: flex; gap: 15px; overflow-x: auto; padding-bottom: 20px; scrollbar-width: none; }
        .categories-scroll::-webkit-scrollbar { display: none; }
        .cat-item { display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 65px; cursor: pointer; }
        .cat-icon { width: 55px; height: 55px; background: #fff; box-shadow: 0 5px 15px rgba(0,0,0,0.05); border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; transition: all 0.3s; }
        .cat-item.active .cat-icon { background: #ff4757; color: white; transform: scale(1.1); }
        .cat-item span { font-size: 0.75rem; font-weight: 600; color: #666; transition: color 0.3s; }
        .cat-item.active span { color: #ff4757; font-weight: 800; }

        .rest-list { display: flex; flex-direction: column; gap: 20px; padding-bottom: 150px; }
        .rest-card { border-radius: 20px; overflow: hidden; background: white; box-shadow: 0 5px 20px rgba(0,0,0,0.05); border: 1px solid #f1f2f6; }
        .rest-image { height: 160px; position: relative; }
        .rest-image img { width: 100%; height: 100%; object-fit: cover; }
        .rest-badge { position: absolute; bottom: 12px; right: 12px; background: rgba(0,0,0,0.7); color: white; padding: 5px 12px; border-radius: 100px; font-size: 0.7rem; display: flex; align-items: center; gap: 5px; backdrop-filter: blur(5px); }
        .rest-info-proto { padding: 15px; }
        .rest-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
        .rest-header h4 { font-size: 1rem; font-weight: 700; }
        .rating { color: #f1c40f; font-size: 0.85rem; font-weight: 700; display: flex; align-items: center; gap: 3px; }
        .rest-info-proto p { font-size: 0.8rem; color: #888; }

        .tracking-card {
          position: sticky;
          bottom: 20px;
          margin-top: -120px;
          background: #2f3542;
          border-radius: 20px;
          padding: 20px;
          color: white;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          z-index: 10;
        }
        .track-header { display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 15px; }
        .track-info h5 { font-size: 0.95rem; margin-bottom: 3px; }
        .track-info p { font-size: 0.7rem; opacity: 0.6; }
        .track-status { background: #2ed573; color: white; font-size: 0.6rem; font-weight: 800; padding: 3px 8px; border-radius: 100px; text-transform: uppercase; }
        .track-progress-container { height: 4px; background: rgba(255,255,255,0.1); border-radius: 10px; margin-bottom: 15px; overflow: hidden; }
        .track-progress-bar { height: 100%; background: #2ed573; border-radius: 10px; transition: width 0.5s ease; box-shadow: 0 0 10px #2ed573; }
        .track-footer { display: flex; justify-content: space-between; align-items: center; }
        .eta { font-size: 0.8rem; font-weight: 700; color: #2ed573; }
        .track-btn { background: rgba(255,255,255,0.1); border: none; color: white; padding: 6px 12px; border-radius: 8px; font-size: 0.75rem; font-weight: 600; cursor: pointer; }

        .phone-bottom-nav { 
          height: 80px; 
          background: white; 
          border-top: 1px solid #f1f2f6; 
          display: flex; 
          justify-content: space-around; 
          align-items: center; 
          padding-bottom: 20px;
        }
        .nav-item { color: #ccc; cursor: pointer; transition: all 0.3s; padding: 10px; border-radius: 12px; }
        .nav-item.active { color: #ff4757; background: #fff1f2; }
      ` }} />
    </div>
  );
}
