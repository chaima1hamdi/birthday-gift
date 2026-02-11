import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const PreEntry = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [showText, setShowText] = useState(true);

  useEffect(() => {
    // شريط التحميل الوهمي
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            onComplete();
          }, 1000);
          return 100;
        }
        return prev + 1;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <div className="pre-entry-screen" style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, #0A291F 0%, #111 100%)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 9999,
      overflow: 'hidden'
    }}>
      {/* ضباب متحرك */}
      <motion.div
        style={{
          position: 'absolute',
          width: '200%',
          height: '200%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.03) 0%, transparent 70%)',
        }}
        animate={{
          x: [0, 100, 0],
          y: [0, 50, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear"
        }}
      />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ textAlign: 'center', zIndex: 1 }}
      >
        <h1 style={{
          fontFamily: 'Playfair Display, serif',
          fontSize: '3rem',
          marginBottom: '2rem',
          background: 'linear-gradient(45deg, #9EC5AB, #C0C0C0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent'
        }}>
          الدخول مقصور فقط
        </h1>
        
        <p style={{
          fontSize: '1.2rem',
          marginBottom: '3rem',
          opacity: 0.8
        }}>
         😏😏😏 جارٍ تهيئة المفاجأة...
        </p>
        
        {/* شريط التحميل */}
        <div style={{
          width: '300px',
          height: '8px',
          background: 'rgba(255, 255, 255, 0.1)',
          borderRadius: '4px',
          overflow: 'hidden',
          marginBottom: '1rem'
        }}>
          <motion.div
            style={{
              width: `${progress}%`,
              height: '100%',
              background: 'linear-gradient(90deg, #1F7A63, #D4AF37)',
              borderRadius: '4px'
            }}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
        
        <p style={{ fontSize: '0.9rem', opacity: 0.6 }}>
          {progress}%
        </p>
      </motion.div>
    </div>
  );
};

export default PreEntry;