import React, { useState, useEffect } from 'react';
import { FiArrowLeft, FiClock, FiMapPin, FiStar, FiShoppingBag, FiChevronRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const categories = [
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
    type: 'Italian • Pizza'
  },
  {
    id: 2,
    name: 'Burger Craft',
    rating: 4.6,
    time: '15-25 min',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&h=300&fit=crop',
    type: 'Gourmet • Burgers'
  }
];

const FoodDeliveryPrototype = () => {
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
        return prev + 1;
      });
    }, 2000);
    return () => clearInterval(timer);
  }, []);

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
            <Link to="/" className="back-btn"><FiArrowLeft /></Link>
            <div className="location">
              <FiMapPin className="pin" />
              <span>Downtown, NYC</span>
            </div>
            <div className="profile-pic">
              <img src="https://i.pravatar.cc/100?u=yash" alt="User" />
            </div>
          </div>
        </header>

        {/* Content Area */}
        <div className="phone-content custom-scrollbar">
          {/* Search */}
          <div className="search-bar-proto">
            <FiShoppingBag className="bag-icon" />
            <input type="text" placeholder="Search for food or restaurants" disabled />
          </div>

          {/* Banner */}
          <div className="promo-banner">
            <div className="promo-text">
              <h3>50% OFF</h3>
              <p>On your first 3 orders!</p>
              <button>Order Now</button>
            </div>
            <img src="https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400&h=400&fit=crop" alt="Food" />
          </div>

          {/* Categories */}
          <div className="section-title-proto">Categories</div>
          <div className="categories-scroll">
            {categories.map((cat, i) => (
              <div key={i} className="cat-item">
                <div className="cat-icon">{cat.icon}</div>
                <span>{cat.name}</span>
              </div>
            ))}
          </div>

          {/* Popular */}
          <div className="section-title-proto">Popular Near You</div>
          <div className="rest-list">
            {restaurants.map((rest) => (
              <div key={rest.id} className="rest-card">
                <div className="rest-image">
                  <img src={rest.image} alt={rest.name} />
                  <div className="rest-badge"><FiClock /> {rest.time}</div>
                </div>
                <div className="rest-info-proto">
                  <div className="rest-header">
                    <h4>{rest.name}</h4>
                    <span className="rating"><FiStar /> {rest.rating}</span>
                  </div>
                  <p>{rest.type}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Live Tracking Overlay */}
          <div className="tracking-card">
            <div className="track-header">
              <div className="track-info">
                <h5>Current Order</h5>
                <p>SwiftBites Express • #4421</p>
              </div>
              <div className="track-status">{orderStatus}</div>
            </div>
            <div className="track-progress-container">
              <div className="track-progress-bar" style={{ width: `${orderProgress}%` }} />
            </div>
            <div className="track-footer">
              <div className="eta">ETA: 12 mins</div>
              <button className="track-btn">Track Live</button>
            </div>
          </div>
        </div>

        {/* Bottom Nav */}
        <nav className="phone-bottom-nav">
          <div className="nav-item active">🏠</div>
          <div className="nav-item">🔍</div>
          <div className="nav-item">📋</div>
          <div className="nav-item">👤</div>
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

        .phone-content { flex: 1; overflow-y: auto; padding: 0 20px; }
        .custom-scrollbar::-webkit-scrollbar { width: 0; }
        
        .search-bar-proto { background: #f1f2f6; padding: 15px; border-radius: 12px; display: flex; align-items: center; gap: 10px; margin-bottom: 25px; }
        .bag-icon { color: #ff4757; }
        .search-bar-proto input { background: none; border: none; font-size: 0.85rem; width: 100%; outline: none; }

        .promo-banner { 
          background: #ff4757; 
          border-radius: 20px; 
          padding: 20px; 
          color: white; 
          display: flex; 
          align-items: center; 
          justify-content: space-between;
          margin-bottom: 25px;
        }
        .promo-text h3 { font-size: 1.8rem; margin-bottom: 5px; }
        .promo-text p { font-size: 0.8rem; opacity: 0.9; margin-bottom: 12px; }
        .promo-text button { background: white; color: #ff4757; border: none; padding: 8px 15px; border-radius: 8px; font-weight: 700; font-size: 0.75rem; cursor: pointer; }
        .promo-banner img { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; }

        .section-title-proto { font-weight: 800; font-size: 1.1rem; margin-bottom: 15px; }
        .categories-scroll { display: flex; gap: 15px; overflow-x: auto; padding-bottom: 20px; scrollbar-width: none; }
        .categories-scroll::-webkit-scrollbar { display: none; }
        .cat-item { display: flex; flex-direction: column; align-items: center; gap: 8px; min-width: 65px; }
        .cat-icon { width: 55px; height: 55px; background: #fff; box-shadow: 0 5px 15px rgba(0,0,0,0.05); border-radius: 15px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; transition: all 0.3s; cursor: pointer; }
        .cat-item:hover .cat-icon { background: #ff4757; color: white; transform: translateY(-5px); }
        .cat-item span { font-size: 0.75rem; font-weight: 600; color: #666; }

        .rest-list { display: flex; flex-direction: column; gap: 20px; padding-bottom: 150px; }
        .rest-card { border-radius: 20px; overflow: hidden; background: white; box-shadow: 0 5px 20px rgba(0,0,0,0.05); }
        .rest-image { height: 160px; position: relative; }
        .rest-image img { width: 100%; height: 100%; object-fit: cover; }
        .rest-badge { position: absolute; bottom: 12px; right: 12px; background: rgba(0,0,0,0.7); color: white; padding: 5px 12px; border-radius: 100px; font-size: 0.7rem; display: flex; align-items: center; gap: 5px; backdrop-filter: blur(5px); }
        .rest-info-proto { padding: 15px; }
        .rest-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 5px; }
        .rest-header h4 { font-size: 1rem; font-weight: 700; }
        .rating { color: #f1c40f; font-size: 0.85rem; font-weight: 700; display: flex; align-items: center; gap: 3px; }
        .rest-info-proto p { font-size: 0.8rem; color: #888; }

        .tracking-card {
          position: absolute;
          bottom: 100px;
          left: 20px;
          right: 20px;
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
        .nav-item { font-size: 1.5rem; color: #ccc; cursor: pointer; transition: color 0.3s; }
        .nav-item.active { color: #ff4757; }
      ` }} />
    </div>
  );
};

export default FoodDeliveryPrototype;
