import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './LogoTransition.css';
import logoImg from '../assets/logo_transparent.png';

const LogoTransition = ({ children }) => {
  const [stage, setStage] = useState('loading'); // loading, transitioning, complete

  useEffect(() => {
    // Stage 1: Big in center (1.5s — quick brand impression)
    const timer1 = setTimeout(() => {
      setStage('transitioning');
    }, 1500);

    // Stage 2: Move to Navbar (done by 2.8s)
    const timer2 = setTimeout(() => {
      setStage('complete');
    }, 2800);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  return (
    <>
      <AnimatePresence>
        {stage !== 'complete' && (
          <motion.div
            className="logo-overlay"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <motion.div
              className="center-logo-container"
              initial={{ scale: 0.3, opacity: 0, filter: 'blur(10px)' }}
              animate={stage === 'loading' 
                ? { scale: 1, opacity: 1, filter: 'blur(0px)' } 
                : { 
                    scale: 0.08, 
                    x: '-44vw', 
                    y: '-46vh',
                    opacity: 0.8,
                    filter: 'blur(0px)'
                  }
              }
              transition={{ 
                duration: stage === 'loading' ? 1 : 0.9, 
                ease: "circOut",
                type: "spring",
                stiffness: 80,
                damping: 18
              }}
            >
              <img src={logoImg} alt="Metrobrain Logo" className="transition-logo" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.div
        initial={{ opacity: 0 }}
        animate={stage === 'complete' || stage === 'transitioning' ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {children}
      </motion.div>
    </>
  );
};

export default LogoTransition;
