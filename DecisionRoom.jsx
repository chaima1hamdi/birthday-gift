import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import MovingButton from '../components/MovingButton';

const DecisionRoom = () => {
  const navigate = useNavigate();
  const [noAttempts, setNoAttempts] = useState(0);
  const [showSecretMessage, setShowSecretMessage] = useState(false);
  const [isYesHovered, setIsYesHovered] = useState(false);
  const roomRef = useRef(null);

  useEffect(() => {
    const updateSpotlight = (e) => {
      const spotlight = document.getElementById('spotlight');
      if (spotlight && e) {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        spotlight.style.background = `radial-gradient(circle at ${x}% ${y}%, rgba(212, 175, 55, 0.2) 0%, transparent 60%)`;
      }
    };

    const handleMouseMove = (e) => updateSpotlight(e);
    const handleTouchMove = (e) => updateSpotlight(e.touches[0]);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  const handleNoClick = () => {
    const newAttempts = noAttempts + 1;
    setNoAttempts(newAttempts);

    if (newAttempts >= 3) {
      setShowSecretMessage(true);
      setTimeout(() => {
        setShowSecretMessage(false);
      }, 1500);
    }
  };

  const handleYesClick = () => {
    if (roomRef.current) {
      roomRef.current.style.transition = 'all 1.2s ease-in-out';
      roomRef.current.style.opacity = '0.7';
      roomRef.current.style.filter = 'blur(5px)';
    }

    setTimeout(() => {
      requestAnimationFrame(() => {
        navigate('/letter');
      });
    }, 1200);
  };

  if (showSecretMessage) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'rgba(13, 27, 30, 0.95)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          backdropFilter: 'blur(10px)'
        }}
      >
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            textAlign: 'center',
            maxWidth: '90%'
          }}
        >
          <motion.div
            animate={{ 
              rotate: [0, 10, -10, 10, 0],
              scale: [1, 1.1, 1, 1.1, 1]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{
              marginBottom: '2rem',
              display: 'flex',
              justifyContent: 'center'
            }}
          >
            <img 
              src="/images/H.jpg" 
              alt="H" 
              style={{
                width: '150px',
                height: '150px',
                borderRadius: '50%',
                border: '4px solid rgba(212, 175, 55, 0.5)',
                boxShadow: '0 0 50px rgba(212, 175, 55, 0.3)',
                objectFit: 'cover'
              }}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = '/images/H.png';
              }}
            />
          </motion.div>
          
          <motion.h2
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{
              fontSize: '2.5rem',
              marginBottom: '1rem',
              color: '#F5F5F5',
              fontFamily: 'Playfair Display, serif',
              fontWeight: 600
            }}
          >
            أعتقد أنك تقصد اختيار "نعم"
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            style={{
              fontSize: '1.2rem',
              color: 'rgba(245, 245, 245, 0.7)',
              marginTop: '1rem'
            }}
          >
            المحاولات الفاشلة: {noAttempts} 
          </motion.p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={roomRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0D1B1E 0%, #102A2E 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div
        id="spotlight"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none',
          transition: 'background 0.3s ease',
          zIndex: 0
        }}
      />

      <div style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        right: '10%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent)',
        opacity: 0.5
      }} />
      
      <div style={{
        position: 'absolute',
        bottom: '20%',
        left: '10%',
        right: '10%',
        height: '1px',
        background: 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.2), transparent)',
        opacity: 0.5
      }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        textAlign: 'center',
        maxWidth: '600px',
        width: '100%'
      }}>
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          style={{
            fontSize: '3.5rem',
            marginBottom: '1rem',
            color: '#F5F5F5',
            fontFamily: 'Playfair Display, serif',
            fontWeight: 700,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
          }}
        >
          اختر بحكمة😇😇
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
          style={{
            fontSize: '1.4rem',
            marginBottom: '4rem',
            color: 'rgba(245, 245, 245, 0.8)',
            fontFamily: 'Montserrat, sans-serif',
            fontWeight: 300,
            lineHeight: 1.6
          }}
        >
          خيار واحد يقربك ...
          <br />
          والآخر... دعونا لا نذهب إلى هناك
        </motion.p>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '2rem',
          alignItems: 'center',
          marginTop: '3rem'
        }}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
            onHoverStart={() => setIsYesHovered(true)}
            onHoverEnd={() => setIsYesHovered(false)}
            onClick={handleYesClick}
            style={{
              background: 'linear-gradient(45deg, #2F6F64, #1F7A63)',
              color: '#F5F5F5',
              border: 'none',
              padding: '1.5rem 4rem',
              borderRadius: '50px',
              fontSize: '1.8rem',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              position: 'relative',
              overflow: 'hidden',
              transition: 'all 0.3s ease',
              boxShadow: isYesHovered 
                ? '0 0 40px rgba(47, 111, 100, 0.5)' 
                : '0 0 20px rgba(47, 111, 100, 0.3)',
              minWidth: '250px'
            }}
          >
            <motion.span
              animate={isYesHovered ? { x: [0, 5, 0] } : {}}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', alignItems: 'center', gap: '10px' }}
            >
              نعم 😈😈😈
            </motion.span>
            
            {isYesHovered && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  height: '100%',
                  background: 'radial-gradient(circle, rgba(255,255,255,0.1) 0%, transparent 70%)',
                  borderRadius: '50px',
                  pointerEvents: 'none'
                }}
              />
            )}
          </motion.button>

          <MovingButton
            onAttempt={handleNoClick}
            attempts={noAttempts}
          />
        </div>

        {noAttempts > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              marginTop: '3rem',
              fontSize: '1rem',
              color: 'rgba(245, 245, 245, 0.5)',
              fontStyle: 'italic'
            }}
          >
            المحاولات الفاشلة: {noAttempts} 😂😂
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default DecisionRoom;