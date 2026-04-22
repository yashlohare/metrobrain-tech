"use client";

import React, { useState, useMemo } from 'react';
import { ArrowLeft, MapPin, Star, Home, Search, Heart, SlidersHorizontal, Map as MapIcon, Grid } from 'lucide-react';
import Link from 'next/link';

const properties = [
  { id: 1, name: 'Glass Pavilion', location: 'Malibu, CA', price: '$8.5M', img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop', type: 'Villa' },
  { id: 2, name: 'The Azure Loft', location: 'New York, NY', price: '$4.2M', img: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&h=600&fit=crop', type: 'Penthouse' },
  { id: 3, name: 'Emerald Sanctuary', location: 'Aspen, CO', price: '$12.0M', img: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800&h=600&fit=crop', type: 'Cabin' },
  { id: 4, name: 'Obsidian Manor', location: 'Austin, TX', price: '$6.8M', img: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop', type: 'Mansion' }
];

export default function RealEstatePrototype() {
  const [searchQuery, setSearchQuery] = useState("");
  const [liked, setLiked] = useState<number[]>([]);
  const [viewMode, setViewMode] = useState<"grid" | "map">("grid");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const filteredProperties = useMemo(() => {
    return properties.filter(p => 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  const toggleLike = (id: number) => {
    setLiked(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  return (
    <div className="proto-page aura-theme">
      {/* Search Header */}
      <header className="aura-header">
        <div className="aura-container flex-between">
          <Link href="/#work" className="back-link"><ArrowLeft className="w-4 h-4" /> Back</Link>
          <div className="search-pill">
            <MapPin className="w-4 h-4 text-rose-500" />
            <input 
              type="text" 
              placeholder="Search Luxury Properties" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent border-none outline-none flex-1 text-sm font-semibold text-gray-800 placeholder:text-gray-400"
            />
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <div className="avatar-small"><img src="https://i.pravatar.cc/100?u=adinath" alt="" className="rounded-full w-10 h-10 border-2 border-white shadow-sm" /></div>
        </div>
      </header>

      <main className="aura-container py-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Discover Your Sanctuary</h1>
            <p className="text-gray-500">Exquisite properties curated for the extraordinary life.</p>
          </div>
          <div className="flex gap-4">
             <button 
               onClick={() => setIsFilterOpen(!isFilterOpen)}
               className={`px-6 py-3 rounded-full border border-gray-200 font-bold flex items-center gap-2 transition-all ${isFilterOpen ? 'bg-black text-white' : 'hover:bg-gray-50'}`}
             >
               <SlidersHorizontal className="w-4 h-4" />
               Filters
             </button>
             <button 
               onClick={() => setViewMode(viewMode === "grid" ? "map" : "grid")}
               className="px-6 py-3 rounded-full bg-black text-white font-bold hover:scale-105 transition-all flex items-center gap-2 shadow-lg"
             >
               {viewMode === "grid" ? <MapIcon className="w-4 h-4" /> : <Grid className="w-4 h-4" />}
               {viewMode === "grid" ? "Map View" : "Grid View"}
             </button>
          </div>
        </div>

        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {filteredProperties.map((prop) => (
              <div key={prop.id} className="prop-card group">
                <div className="relative h-[450px] rounded-[2.5rem] overflow-hidden mb-6 shadow-2xl transition-all duration-500 hover:shadow-cyan-500/10">
                  <img src={prop.img} alt={prop.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-6 left-6 px-4 py-2 bg-black/40 backdrop-blur-md rounded-full text-white text-[10px] font-bold uppercase tracking-widest">
                    {prop.type}
                  </div>

                  <div 
                    onClick={() => toggleLike(prop.id)}
                    className={`absolute top-6 right-6 p-3 rounded-full backdrop-blur-md cursor-pointer transition-all ${liked.includes(prop.id) ? 'bg-rose-500 text-white' : 'bg-white/20 text-white hover:bg-white/40'}`}
                  >
                    <Heart className={`w-5 h-5 ${liked.includes(prop.id) ? 'fill-current' : ''}`} />
                  </div>

                  <div className="absolute bottom-6 left-6 p-6 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 text-white w-[calc(100%-3rem)] transition-all duration-500 group-hover:translate-y-[-5px]">
                     <div className="flex justify-between items-center mb-2">
                       <h3 className="text-2xl font-bold">{prop.name}</h3>
                       <span className="text-2xl font-black">{prop.price}</span>
                     </div>
                     <p className="text-white/70 flex items-center gap-2 text-sm"><MapPin className="w-4 h-4 text-rose-400" /> {prop.location}</p>
                  </div>
                </div>
              </div>
            ))}
            {filteredProperties.length === 0 && (
              <div className="col-span-2 py-32 text-center">
                <div className="text-4xl font-bold text-gray-200 mb-4">NO PROPERTIES MATCHING YOUR QUERY</div>
                <button onClick={() => setSearchQuery("")} className="text-cyan-500 font-bold hover:underline">Clear Search</button>
              </div>
            )}
          </div>
        ) : (
          <div className="relative h-[600px] rounded-[3rem] overflow-hidden border border-gray-200 shadow-2xl animate-in zoom-in duration-500">
            <div className="absolute inset-0 bg-[#f0f2f5] flex items-center justify-center">
              <div className="text-center">
                <MapIcon className="w-16 h-16 text-gray-300 mx-auto mb-4 animate-bounce" />
                <p className="font-bold text-gray-400 tracking-widest uppercase">Initializing Geospatial Neural Map...</p>
              </div>
            </div>
            {/* Mock Markers */}
            {filteredProperties.map((prop, i) => (
              <div 
                key={prop.id}
                className="absolute p-3 bg-white rounded-xl shadow-xl border border-gray-200 flex items-center gap-3 animate-in fade-in duration-1000"
                style={{ top: `${20 + i*15}%`, left: `${30 + i*20}%` }}
              >
                <img src={prop.img} className="w-10 h-10 rounded-lg object-cover" />
                <div>
                   <div className="text-[10px] font-bold">{prop.name}</div>
                   <div className="text-[10px] text-rose-500 font-black">{prop.price}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <style dangerouslySetInnerHTML={{ __html: `
        .aura-theme {
          background: #fff;
          color: #000;
          font-family: 'Plus Jakarta Sans', sans-serif;
          min-height: 100vh;
        }
        .aura-container { max-width: 1400px; margin: 0 auto; padding: 0 20px; }
        @media (min-width: 768px) { .aura-container { padding: 0 40px; } }
        .aura-header { height: 100px; border-bottom: 1px solid #f0f0f0; position: sticky; top: 0; background: #fff; z-index: 100; display: flex; align-items: center; }
        .search-pill { display: flex; align-items: center; gap: 10px; padding: 10px 20px; background: #f8f9fa; border-radius: 100px; border: 1px solid #f0f0f0; width: 100%; max-width: 400px; cursor: pointer; transition: all 0.3s; }
        .search-pill:focus-within { border-color: #000; box-shadow: 0 10px 30px rgba(0,0,0,0.05); background: #fff; }
        .flex-between { display: flex; align-items: center; justify-content: space-between; width: 100%; }
        .back-link { color: #888; text-decoration: none; font-weight: 700; display: flex; align-items: center; gap: 8px; font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.1em; }
        .back-link:hover { color: #000; }
      ` }} />
    </div>
  );
}
