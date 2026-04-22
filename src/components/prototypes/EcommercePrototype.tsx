"use client";

import React, { useState, useMemo } from 'react';
import { ArrowLeft, ShoppingCart, Heart, Search, Star, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

const products = [
  { id: 1, name: 'Astron Chronograph', price: 2450, rating: 4.9, image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&h=800&fit=crop', tag: 'Limited Edition', category: 'Luxury' },
  { id: 2, name: 'Midnight Onyx', price: 1890, rating: 4.8, image: 'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600&h=800&fit=crop', tag: 'Bestseller', category: 'Classic' },
  { id: 3, name: 'Rose Gold Heritage', price: 3100, rating: 5.0, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=600&h=800&fit=crop', tag: 'Premium', category: 'Luxury' },
  { id: 4, name: 'Titanium Diver', price: 2150, rating: 4.7, image: 'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=600&h=800&fit=crop', tag: 'New Arrival', category: 'Sport' }
];

export default function EcommercePrototype() {
  const [cart, setCart] = useState<{id: number, qty: number}[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [showNotification, setShowNotification] = useState<string | null>(null);

  const filteredProducts = useMemo(() => {
    if (activeCategory === "All") return products;
    return products.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const addToCart = (id: number, name: string) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === id);
      if (existing) return prev.map(item => item.id === id ? { ...item, qty: item.qty + 1 } : item);
      return [...prev, { id, qty: 1 }];
    });
    setShowNotification(`${name} added to vault`);
    setTimeout(() => setShowNotification(null), 3000);
  };

  const toggleWishlist = (id: number) => {
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const totalItems = cart.reduce((acc, curr) => acc + curr.qty, 0);

  return (
    <div className="proto-page luxura-theme">
      {/* Notification Toast */}
      {showNotification && (
        <div className="fixed top-28 right-8 z-[2000] bg-white text-black px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 animate-in slide-in-from-right duration-500 font-bold border-l-4 border-gold uppercase tracking-widest text-[10px]">
          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
          {showNotification}
        </div>
      )}

      {/* Navigation */}
      <nav className="proto-nav glass">
        <div className="proto-container flex-between">
          <Link href="/#work" className="back-link"><ArrowLeft className="w-4 h-4" /> <span>Back</span></Link>
          <div className="proto-logo">LUXURA</div>
          <div className="proto-nav-right">
            <Search className="proto-icon" />
            <div className="relative cursor-pointer group" onClick={() => setShowNotification("Wishlist synchronized")}>
              <Heart className={`proto-icon ${wishlist.length > 0 ? 'text-rose-500 fill-current' : ''}`} />
              {wishlist.length > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping" />}
            </div>
            <div className="proto-cart">
              <ShoppingCart className="proto-icon" />
              {totalItems > 0 && <span className="cart-badge">{totalItems}</span>}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="proto-hero">
        <div className="proto-container">
          <div className="hero-content animate-fade-in">
            <span className="hero-subtitle">Est. 1924</span>
            <h1>Timeless Elegance Reimagined</h1>
            <p>Discover our curated collection of artisanal timepieces crafted for the modern connoisseur.</p>
            <button className="btn-gold" onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}>
              Explore Collection
            </button>
          </div>
        </div>
      </header>

      {/* Product Grid */}
      <section className="proto-section" id="collection">
        <div className="proto-container">
          <div className="section-header">
            <h2>Featured Timepieces</h2>
            <div className="filter-tabs">
              {["All", "Classic", "Sport", "Luxury"].map(cat => (
                <span 
                  key={cat}
                  className={activeCategory === cat ? "active" : ""}
                  onClick={() => setActiveCategory(cat)}
                >
                  {cat}
                </span>
              ))}
            </div>
          </div>

          <div className="proto-grid-4">
            {filteredProducts.map((product) => (
              <div key={product.id} className="product-card glass animate-in fade-in duration-700">
                <div className="product-image">
                  <span className="product-tag">{product.tag}</span>
                  <img src={product.image} alt={product.name} />
                  <div className="product-actions">
                    <button onClick={() => addToCart(product.id, product.name)}>Secure to Vault</button>
                  </div>
                </div>
                <div className="product-info">
                  <div className="product-meta">
                    <span className="rating"><Star className="w-4 h-4 fill-gold text-gold mr-1" /> {product.rating}</span>
                    <Heart 
                      className={`wishlist-btn ${wishlist.includes(product.id) ? 'text-rose-500 fill-current' : ''}`} 
                      onClick={() => toggleWishlist(product.id)}
                    />
                  </div>
                  <h3>{product.name}</h3>
                  <p className="price">${product.price.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style dangerouslySetInnerHTML={{ __html: `
        .luxura-theme {
          background: #050505;
          color: #fff;
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
        }
        .proto-page { overflow-x: hidden; }
        .proto-container { max-width: 1400px; margin: 0 auto; padding: 0 40px; }
        .flex-between { display: flex; align-items: center; justify-content: space-between; height: 100%; }
        
        .proto-nav {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          height: 100px;
          z-index: 1000;
          border-bottom: 1px solid rgba(255,215,0,0.1);
        }
        .proto-nav.glass { background: rgba(5,5,5,0.95); backdrop-filter: blur(20px); }
        .back-link { display: flex; align-items: center; gap: 10px; color: #aaa; text-decoration: none; font-size: 0.8rem; transition: color 0.3s; font-weight: 700; text-transform: uppercase; letter-spacing: 0.2em; }
        .back-link:hover { color: gold; }
        .proto-logo { font-family: 'Space Grotesk', sans-serif; font-size: 2.2rem; font-weight: 800; letter-spacing: 8px; color: gold; position: absolute; left: 50%; transform: translateX(-50%); }
        .proto-nav-right { display: flex; gap: 30px; align-items: center; }
        .proto-icon { font-size: 1.4rem; transition: all 0.3s; cursor: pointer; color: #fff; }
        .proto-icon:hover { color: gold; transform: translateY(-2px); }
        .proto-cart { position: relative; cursor: pointer; }
        .cart-badge { position: absolute; top: -10px; right: -10px; background: gold; color: black; width: 22px; height: 22px; border-radius: 50%; font-size: 0.8rem; display: flex; align-items: center; justify-content: center; font-weight: 900; box-shadow: 0 0 15px rgba(255,215,0,0.5); }
        .fill-gold { fill: gold; }

        .proto-hero {
          height: 100vh;
          background: linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url('https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1600&h=900&fit=crop');
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding-top: 100px;
        }
        .hero-content h1 { font-family: 'Space Grotesk', sans-serif; font-size: 5.5rem; font-weight: 800; margin: 30px 0; max-width: 1000px; line-height: 1.1; letter-spacing: -2px; text-transform: uppercase; }
        .hero-subtitle { color: gold; font-weight: 700; text-transform: uppercase; letter-spacing: 10px; font-size: 1.1rem; }
        .hero-content p { font-size: 1.4rem; color: #aaa; max-width: 800px; margin: 0 auto 60px; line-height: 1.6; font-weight: 300; }
        .btn-gold { padding: 22px 55px; background: gold; color: black; border: none; border-radius: 4px; font-weight: 800; text-transform: uppercase; letter-spacing: 4px; cursor: pointer; transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275); }
        .btn-gold:hover { transform: translateY(-10px); box-shadow: 0 25px 50px rgba(255,215,0,0.4); background: #fff; }

        .proto-section { padding: 120px 0; }
        .section-header { display: flex; flex-direction: column; align-items: center; text-align: center; margin-bottom: 80px; gap: 30px; width: 100%; }
        .section-header h2 { font-size: 4rem; font-family: 'Space Grotesk', sans-serif; letter-spacing: -1px; font-weight: 800; text-transform: uppercase; }
        .filter-tabs { display: flex; gap: 50px; color: #444; font-weight: 700; text-transform: uppercase; font-size: 1rem; letter-spacing: 3px; }
        .filter-tabs span { cursor: pointer; transition: all 0.3s; position: relative; padding-bottom: 12px; }
        .filter-tabs span:hover { color: #fff; }
        .filter-tabs span.active { color: gold; }
        .filter-tabs span.active::after { content: ''; position: absolute; bottom: 0; left: 0; width: 100%; height: 3px; background: gold; box-shadow: 0 0 15px gold; }

        .proto-grid-4 { display: grid; grid-template-columns: repeat(4, 1fr); gap: 40px; width: 100%; }
        .product-card { padding: 0; border-radius: 20px; overflow: hidden; transition: all 0.6s cubic-bezier(0.165, 0.84, 0.44, 1); border: 1px solid rgba(255,255,255,0.08); background: #0a0a0a; }
        .product-card:hover { transform: translateY(-20px); border-color: gold; box-shadow: 0 40px 80px rgba(0,0,0,0.6); }
        .product-image { height: 450px; position: relative; overflow: hidden; background: #111; }
        .product-image img { width: 100%; height: 100%; object-fit: cover; transition: transform 1s cubic-bezier(0.2, 1, 0.3, 1); }
        .product-card:hover .product-image img { transform: scale(1.15); }
        .product-tag { position: absolute; top: 25px; left: 25px; background: gold; color: #000; padding: 6px 14px; font-size: 0.7rem; font-weight: 800; border-radius: 4px; z-index: 2; text-transform: uppercase; letter-spacing: 1.5px; }
        .product-actions { position: absolute; bottom: -80px; left: 0; right: 0; transition: all 0.5s; padding: 40px; text-align: center; background: linear-gradient(transparent, rgba(0,0,0,0.95)); }
        .product-card:hover .product-actions { bottom: 0; }
        .product-actions button { width: 100%; padding: 18px; background: #fff; color: #000; border: none; font-weight: 900; cursor: pointer; text-transform: uppercase; letter-spacing: 2px; border-radius: 4px; transition: all 0.3s; }
        .product-actions button:hover { background: gold; transform: scale(1.02); }

        .product-info { padding: 30px; }
        .product-meta { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
        .rating { display: flex; align-items: center; gap: 10px; color: gold; font-size: 1rem; font-weight: 800; }
        .wishlist-btn { cursor: pointer; transition: all 0.3s; font-size: 1.5rem; color: #333; }
        .wishlist-btn:hover { color: #ff4757; transform: scale(1.3); }
        .product-info h3 { font-size: 1.4rem; margin-bottom: 10px; font-weight: 800; letter-spacing: 0.5px; }
        .price { font-size: 1.6rem; font-weight: 900; color: #fff; font-family: 'Space Grotesk', sans-serif; }

        @media (max-width: 1400px) { .proto-grid-4 { grid-template-columns: repeat(2, 1fr); gap: 40px; } .hero-content h1 { font-size: 4.5rem; } }
        @media (max-width: 1024px) { .proto-logo { position: static; transform: none; } .back-link span { display: none; } }
        @media (max-width: 768px) { 
          .proto-container { padding: 0 30px; }
          .section-header h2 { font-size: 3rem; }
          .filter-tabs { gap: 25px; font-size: 0.85rem; }
          .product-image { height: 400px; }
        }
        @media (max-width: 500px) { .proto-grid-4 { grid-template-columns: 1fr; } .hero-content h1 { font-size: 3rem; } }

      ` }} />
    </div>
  );
}
