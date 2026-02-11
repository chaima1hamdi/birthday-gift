import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import SpecialButton from '../components/SpecialButton';

const Home = () => {
  const navigate = useNavigate();

  // Direct, instant navigation – no setTimeout, no requestAnimationFrame
  const handleNavigate = (path) => {
    navigate(path);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: 'easeOut' }}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0D1B1E 0%, #102A2E 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ✨ Subtle background particles – luxury feel */}
      {[...Array(15)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            background: `rgba(47, 111, 100, ${Math.random() * 0.4 + 0.2})`,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -Math.random() * 100 - 50, 0],
            x: [0, (Math.random() - 0.5) * 100, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: Math.random() * 15 + 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}

      {/* 🎯 Main content – only buttons and the phrase */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%',
        }}
      >
        {/* 🔥 ARABIC PHRASE – choose wisely */}
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          style={{
            fontSize: 'clamp(2.2rem, 10vw, 3.5rem)',
            marginBottom: '3rem',
            color: '#F5F5F5',
            fontFamily: 'Playfair Display, serif',
            fontWeight: 700,
            textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
          }}
        >
          😌😌 اختر بحكمة.
        </motion.h1>

        {/* 🟢 BUTTONS – perfectly aligned */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {/* 1️⃣ Read My Heart – goes to DecisionRoom */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavigate('/decision')}
            style={{
              width: '100%',
              background: 'linear-gradient(45deg, #2F6F64, #1F7A63)',
              color: '#F5F5F5',
              border: 'none',
              padding: '1.3rem',
              borderRadius: '15px',
              fontSize: '1.3rem',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              boxShadow: '0 10px 30px rgba(47, 111, 100, 0.3)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            sanou3 chaima hamdi 😎😎😎
          </motion.button>

          {/* 2️⃣ Click Me – goes to WrongAnswer */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleNavigate('/wrong')}
            style={{
              width: '100%',
              background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
              color: '#F5F5F5',
              border: 'none',
              padding: '1.3rem',
              borderRadius: '15px',
              fontSize: '1.3rem',
              fontWeight: 500,
              cursor: 'pointer',
              fontFamily: 'Montserrat, sans-serif',
              boxShadow: '0 10px 30px rgba(255, 107, 107, 0.3)',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            😈😈😈😈 mozmoz
          </motion.button>

          {/* 3️⃣ The Special One */}
          <div style={{ marginTop: '1rem', width: '100%' }}>
            <SpecialButton />
          </div>
        </div>

        {/* 💫 Optional floating footer */}
        <motion.div
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 4, repeat: Infinity }}
          style={{
            marginTop: '4rem',
            fontSize: '0.9rem',
            color: 'rgba(212, 175, 55, 0.5)',
            fontStyle: 'italic',
          }}
        >
          ينمو بالحب... ❤️
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Home;