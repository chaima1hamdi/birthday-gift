import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const DoorAnimation = ({ children, onAnimationComplete }) => {
  useEffect(() => {
    // تأثير الضوء الذهبي
    const lightInterval = setInterval(() => {
      const light = document.getElementById('golden-light');
      if (light) {
        light.style.opacity = Math.random() * 0.3 + 0.4;
      }
    }, 300);

    return () => clearInterval(lightInterval);
  }, []);

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: '#0A1A1C',
      overflow: 'hidden',
      zIndex: 9998
    }}>
      {/* الباب الأيسر */}
      <motion.div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(90deg, #0D1B1E 0%, #102A2E 100%)',
          borderRight: '3px solid rgba(212, 175, 55, 0.8)',
          zIndex: 2,
          boxShadow: '10px 0 30px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
          paddingRight: '40px'
        }}
        initial={{ x: 0 }}
        animate={{ x: '-100%' }}
        transition={{ 
          duration: 2, 
          ease: [0.22, 1, 0.36, 1], // منحنى فاخر
          delay: 0.5
        }}
        onAnimationComplete={onAnimationComplete}
      >
        {/* مقبض الباب */}
        <div style={{
          width: '24px',
          height: '24px',
          background: 'radial-gradient(circle at 30% 30%, #D4AF37, #8B7500)',
          borderRadius: '50%',
          border: '3px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)'
        }} />
      </motion.div>
      
      {/* الباب الأيمن */}
      <motion.div
        style={{
          position: 'absolute',
          right: 0,
          top: 0,
          width: '50%',
          height: '100%',
          background: 'linear-gradient(90deg, #102A2E 0%, #0D1B1E 100%)',
          borderLeft: '3px solid rgba(212, 175, 55, 0.8)',
          zIndex: 2,
          boxShadow: '-10px 0 30px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '40px'
        }}
        initial={{ x: 0 }}
        animate={{ x: '100%' }}
        transition={{ 
          duration: 2, 
          ease: [0.22, 1, 0.36, 1],
          delay: 0.5
        }}
      >
        <div style={{
          width: '24px',
          height: '24px',
          background: 'radial-gradient(circle at 30% 30%, #D4AF37, #8B7500)',
          borderRadius: '50%',
          border: '3px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)'
        }} />
      </motion.div>
      
      {/* الضوء الذهبي */}
      <motion.div
        id="golden-light"
        style={{
          position: 'absolute',
          left: '50%',
          top: 0,
          width: '0%',
          height: '100%',
          background: 'radial-gradient(circle at center, rgba(212, 175, 55, 0.4) 0%, transparent 70%)',
          zIndex: 1,
          transform: 'translateX(-50%)'
        }}
        initial={{ width: '0%' }}
        animate={{ width: '100%' }}
        transition={{ 
          duration: 1.5, 
          delay: 0.5,
          ease: "easeOut"
        }}
      />
      
      {children}
    </div>
  );
};

export default DoorAnimation;