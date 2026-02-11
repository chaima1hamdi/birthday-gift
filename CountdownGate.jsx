import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import DoorAnimation from './DoorAnimation';

const CountdownGate = ({ onComplete }) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [showDoor, setShowDoor] = useState(false);
  const [showWelcome, setShowWelcome] = useState(false);
  const intervalRef = useRef(null);
  const seconds = 10;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';

    const preventDefault = (e) => {
      if (e.key === 'F5' || e.key === 'r' || (e.ctrlKey && e.key === 'r') || e.key === 'Refresh') {
        e.preventDefault();
      }
    };

    document.addEventListener('keydown', preventDefault);
    document.addEventListener('contextmenu', e => e.preventDefault());

    intervalRef.current = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setTimeout(() => {
            setShowDoor(true);
            setTimeout(() => {
              setShowWelcome(true);
              setTimeout(() => {
                onComplete();
                document.body.style.overflow = '';
                document.body.style.position = '';
              }, 2000);
            }, 2000);
          }, 500);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(intervalRef.current);
      document.body.style.overflow = '';
      document.body.style.position = '';
      document.removeEventListener('keydown', preventDefault);
      document.removeEventListener('contextmenu', e => e.preventDefault());
    };
  }, [onComplete]);

  const intensity = 1 - timeLeft / seconds;
  const pulseSpeed = 1.5 - intensity * 0.8;

  if (showDoor) {
    return (
      <DoorAnimation onAnimationComplete={() => setShowWelcome(true)}>
        {showWelcome && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              zIndex: 1000,
              background: 'rgba(13, 27, 30, 0.9)',
              padding: 'clamp(1.5rem, 6vw, 3rem)',
              borderRadius: '20px',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(212, 175, 55, 0.3)',
              maxWidth: '90%',
              width: 'clamp(280px, 80%, 600px)',
              margin: '0 auto',
              boxSizing: 'border-box',
            }}
          >
            <motion.h1
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              style={{
                fontSize: 'clamp(1.8rem, 6vw, 3.5rem)',
                marginBottom: '1rem',
                background: 'linear-gradient(45deg, #D4AF37, #FFD700)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'Playfair Display, serif',
                fontWeight: 700,
                lineHeight: 1.2,
              }}
            >
              مرحباً بك في لعبتك
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              style={{
                fontSize: 'clamp(1.2rem, 4.5vw, 1.8rem)',
                marginBottom: '1.5rem',
                color: '#F5F5F5',
                fontFamily: 'Montserrat, sans-serif',
                fontWeight: 400,
                lineHeight: 1.6,
                padding: '0 0.5rem',
              }}
            >
              اختر بحكمة...
              <br />
              مصير هديتك بين يديك
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8, duration: 1 }}
              style={{
                fontSize: 'clamp(0.8rem, 3vw, 1rem)',
                color: 'rgba(245, 245, 245, 0.7)',
                marginTop: '1rem',
                fontStyle: 'italic',
              }}
            >
              ⚠️ كل نقطة لها عواقب...
            </motion.div>
          </motion.div>
        )}
      </DoorAnimation>
    );
  }

  return (
    <motion.div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(180deg, #0a0a0a 0%, #0F3D2E 100%)',
        direction: 'rtl',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* ... (rest of your countdown UI – unchanged) ... */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at center, #1F7A63, transparent 70%)',
        }}
        animate={{ opacity: [0.05, 0.15, 0.05] }}
        transition={{ duration: pulseSpeed, repeat: Infinity, ease: 'easeInOut' }}
      />

      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            background: '#9EC5AB',
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 0.8, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      <motion.p
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontSize: 'clamp(1.2rem, 4vw, 1.8rem)',
          marginBottom: '3rem',
          textAlign: 'center',
          padding: '0 1rem',
          color: '#9EC5AB',
          fontFamily: 'Playfair Display, serif',
        }}
      >
        مفاجأتك تفتح خلال...
      </motion.p>

      <motion.div
        style={{ position: 'relative' }}
        animate={{ scale: [1, 1.02, 1] }}
        transition={{ duration: pulseSpeed, repeat: Infinity }}
      >
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '200%',
            height: '200%',
            borderRadius: '50%',
            filter: 'blur(40px)',
            background: `radial-gradient(circle, rgba(31,122,99,${0.3 + intensity * 0.4}) 0%, transparent 70%)`,
          }}
        />
        <div
          style={{
            position: 'relative',
            width: 'clamp(12rem, 50vw, 16rem)',
            height: 'clamp(12rem, 50vw, 16rem)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid',
            borderColor: `rgba(31,122,99,${0.5 + intensity * 0.5})`,
          }}
        >
          <motion.span
            key={timeLeft}
            initial={{ scale: 1.3, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            style={{
              fontSize: 'clamp(3rem, 8vw, 5rem)',
              fontWeight: 'bold',
              fontFamily: 'Montserrat, monospace',
              color: timeLeft <= 3 ? '#FF6B6B' : '#9EC5AB',
              textShadow: `0 0 30px ${timeLeft <= 3 ? 'rgba(255,107,107,0.5)' : 'rgba(31,122,99,0.5)'}`,
            }}
          >
            {timeLeft.toString().padStart(2, '0')}
          </motion.span>
        </div>
      </motion.div>

      <motion.div
        style={{
          marginTop: '3rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
        }}
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ duration: pulseSpeed, repeat: Infinity }}
      >
        <span style={{ color: '#C0C0C0', fontSize: '1.5rem' }}>💓</span>
        <div style={{ display: 'flex', gap: '0.125rem' }}>
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              style={{
                width: '4px',
                background: '#1F7A63',
                borderRadius: '2px',
              }}
              animate={{ height: [4, 12 + intensity * 8, 4] }}
              transition={{
                duration: pulseSpeed,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          fontSize: '0.9rem',
          color: 'rgba(158, 197, 171, 0.6)',
          fontFamily: 'Montserrat, sans-serif',
          letterSpacing: '1px',
        }}
      >
        🔒 الوصول الحصري مفعل
      </motion.p>
    </motion.div>
  );
};

export default CountdownGate;