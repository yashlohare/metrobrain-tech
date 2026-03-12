import React, { useState } from 'react';
import { FiArrowLeft, FiMapPin, FiMaximize, FiNavigation, FiInfo, FiCamera } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const properties = [
  { id: 1, name: 'Glass Pavilion', location: 'Malibu, CA', price: '$8.5M', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop' },
  { id: 2, name: 'The Azure Loft', location: 'New York, NY', price: '$4.2M', img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop' }
];

const RealEstatePrototype = () => {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <div className="proto-page estate-theme">
      {/* Sidebar Nav */}
      <aside className="estate-side">
        <div className="estate-logo">ESTATE<span>FLOW</span></div>
        <nav className="estate-nav">
          <div className="nav-item active">Discovery</div>
          <div className="nav-item">Collections</div>
          <div className="nav-item">Agents</div>
          <div className="nav-item">Tours</div>
        </nav>
        <Link to="/" className="estate-back"><FiArrowLeft /> Back</Link>
      </aside>

      {/* Main Content */}
      <main className="estate-main">
        <header className="estate-header">
          <div className="search-pill">
            <FiMapPin /> <span>Malibu, California</span>
          </div>
          <div className="header-actions">
            <button className="btn-white">List Property</button>
            <div className="avatar-small"><img src="https://i.pravatar.cc/100?u=adinath" alt="" /></div>
          </div>
        </header>

        <section className="property-showcase">
          <div className="showcase-content animate-fade-in">
            <div className="showcase-img-box">
              <img src={properties[activeImg].img} alt="" className="main-img" />
              <div className="tour-hotspot" style={{ top: '40%', left: '30%' }}><FiCamera /><span>Living Room</span></div>
              <div className="tour-hotspot" style={{ top: '60%', left: '70%' }}><FiCamera /><span>Infinity Pool</span></div>
              <div className="img-overlay">
                <div className="p-details">
                  <h2>{properties[activeImg].name}</h2>
                  <p><FiMapPin /> {properties[activeImg].location}</p>
                </div>
                <div className="p-price">{properties[activeImg].price}</div>
              </div>
            </div>

            <div className="showcase-footer">
              <div className="p-specs">
                <div className="spec">4 <span>Beds</span></div>
                <div className="spec">5 <span>Baths</span></div>
                <div className="spec">5,200 <span>sqft</span></div>
              </div>
              <button className="book-btn">Request Private Tour <FiNavigation /></button>
            </div>
          </div>

          <div className="property-list-vertical">
            <h3>Recommendations</h3>
            {properties.map((p, i) => (
              <div key={p.id} className={`p-thumb ${activeImg === i ? 'active' : ''}`} onClick={() => setActiveImg(i)}>
                <img src={p.img} alt="" />
                <div className="p-thumb-info">
                  <h4>{p.name}</h4>
                  <p>{p.price}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .estate-theme {
          background: #fdfdfd;
          color: #111;
          font-family: 'Plus Jakarta Sans', sans-serif;
          height: 100vh;
          display: flex;
        }

        .estate-side { width: 300px; padding: 50px; border-right: 1px solid #eee; display: flex; flex-direction: column; background: #fff; }
        .estate-logo { font-family: 'Space Grotesk', sans-serif; font-size: 1.5rem; font-weight: 800; letter-spacing: -1px; margin-bottom: 60px; }
        .estate-logo span { color: #888; font-weight: 400; }
        .estate-nav { display: flex; flex-direction: column; gap: 35px; }
        .estate-nav .nav-item { font-size: 1rem; font-weight: 700; color: #aaa; cursor: pointer; transition: color 0.3s; }
        .estate-nav .nav-item:hover, .estate-nav .nav-item.active { color: #111; }
        .estate-back { margin-top: auto; color: #111; text-decoration: none; font-weight: 700; display: flex; align-items: center; gap: 10px; }

        .estate-main { flex: 1; padding: 50px; overflow-y: auto; }
        .estate-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 50px; }
        .search-pill { padding: 12px 25px; background: #f5f5f5; border-radius: 100px; display: flex; align-items: center; gap: 12px; font-weight: 700; color: #666; font-size: 0.9rem; }
        .btn-white { padding: 12px 25px; background: #fff; border: 1px solid #eee; border-radius: 100px; font-weight: 700; cursor: pointer; }
        .avatar-small { width: 45px; height: 45px; border-radius: 50%; overflow: hidden; border: 2px solid #fff; box-shadow: 0 4px 15px rgba(0,0,0,0.05); }
        .avatar-small img { width: 100%; height: 100%; object-fit: cover; }
        .header-actions { display: flex; gap: 20px; align-items: center; }

        .property-showcase { display: grid; grid-template-columns: 2fr 1fr; gap: 40px; }
        .showcase-img-box { position: relative; border-radius: 30px; overflow: hidden; height: 550px; box-shadow: 0 30px 60px rgba(0,0,0,0.1); }
        .main-img { width: 100%; height: 100%; object-fit: cover; }
        .tour-hotspot { position: absolute; background: rgba(255,255,255,0.8); backdrop-filter: blur(10px); padding: 12px; border-radius: 50%; width: 45px; height: 45px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: all 0.3s; box-shadow: 0 10px 20px rgba(0,0,0,0.1); }
        .tour-hotspot span { position: absolute; left: 60px; background: #111; color: #fff; padding: 5px 15px; border-radius: 5px; font-size: 0.75rem; white-space: nowrap; font-weight: 700; opacity: 0; transform: translateX(-10px); transition: all 0.3s; pointer-events: none; }
        .tour-hotspot:hover { background: #111; color: #fff; transform: scale(1.1); }
        .tour-hotspot:hover span { opacity: 1; transform: translateX(0); }
        
        .img-overlay { position: absolute; bottom: 0; left: 0; right: 0; padding: 50px; background: linear-gradient(transparent, rgba(0,0,0,0.8)); color: #fff; display: flex; justify-content: space-between; align-items: flex-end; }
        .img-overlay h2 { font-size: 2.5rem; font-weight: 800; }
        .img-overlay p { opacity: 0.8; font-weight: 600; font-size: 1rem; display: flex; align-items: center; gap: 8px; }
        .p-price { font-size: 2rem; font-family: 'Space Grotesk', sans-serif; font-weight: 800; border: 1px solid rgba(255,255,255,0.3); padding: 10px 25px; border-radius: 15px; backdrop-filter: blur(10px); }

        .showcase-footer { display: flex; justify-content: space-between; align-items: center; margin-top: 30px; }
        .p-specs { display: flex; gap: 40px; }
        .spec { font-size: 1.5rem; font-weight: 800; display: flex; flex-direction: column; }
        .spec span { font-size: 0.8rem; color: #888; font-weight: 600; text-transform: uppercase; }
        .book-btn { padding: 18px 35px; background: #111; color: #fff; border: none; border-radius: 100px; font-weight: 700; display: flex; align-items: center; gap: 15px; cursor: pointer; transition: transform 0.3s; }
        .book-btn:hover { transform: scale(1.05); }

        .property-list-vertical h3 { font-size: 1.25rem; font-weight: 800; margin-bottom: 25px; }
        .p-thumb { display: flex; gap: 20px; padding: 15px; border-radius: 20px; cursor: pointer; transition: background 0.3s; margin-bottom: 10px; }
        .p-thumb:hover, .p-thumb.active { background: #f5f5f5; }
        .p-thumb img { width: 100px; height: 80px; border-radius: 15px; object-fit: cover; }
        .p-thumb-info h4 { font-size: 1rem; margin-bottom: 5px; }
        .p-thumb-info p { color: #888; font-weight: 700; font-size: 0.9rem; }

        @media (max-width: 1200px) { .property-showcase { grid-template-columns: 1fr; } .estate-side { width: 220px; } }
      ` }} />
    </div>
  );
};

export default RealEstatePrototype;
