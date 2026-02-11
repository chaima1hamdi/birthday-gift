import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';

const SpecialButton = () => {
  const [clicks, setClicks] = useState(0);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleClick = () => {
    const next = clicks + 1;
    setClicks(next);

    if (next === 1) {
      setMessage('ينمو بالحب... 💚');
    } else if (next === 2) {
      setMessage('أكثر... أكثر! ✨');
    } else if (next === 3) {
      setMessage('استعد... 🎆');
      // تأثير الاهتزاز
      document.body.style.animation = 'shake 0.5s ease-in-out';
      setTimeout(() => { 
        document.body.style.animation = ''; 
      }, 500);
    } else if (next >= 4) {
      setMessage('🎉 المفاجأة! 🎉');
      
      // انفجار كونفيتي احترافي
      confetti({
        particleCount: 200,
        spread: 160,
        origin: { y: 0.5 },
        colors: ['#D4AF37', '#1F7A63', '#9EC5AB', '#FF6B6B'],
      });
      
      // كونفيتي إضافي من الجوانب
      setTimeout(() => {
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { y: 0.6, x: 0 },
          colors: ['#D4AF37', '#FFD700']
        });
        confetti({
          particleCount: 100,
          spread: 60,
          origin: { y: 0.6, x: 1 },
          colors: ['#1F7A63', '#9EC5AB']
        });
      }, 200);
      
      // التنقل إلى صفحة عيد الميلاد
      setTimeout(() => {
        requestAnimationFrame(() => {
          navigate('/birthday');
        });
      }, 1500);
    }
  };

  // حجم الزر يزيد مع كل نقرة
  const scale = 1 + clicks * 0.4;

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '1rem',
      width: '100%'
    }}>
      <motion.button
        onClick={handleClick}
        animate={{
          scale,
          boxShadow: clicks >= 2
            ? '0 0 40px rgba(212, 175, 55, 0.6)'
            : '0 0 20px rgba(31, 122, 99, 0.3)',
        }}
        whileHover={{ scale: scale * 1.05 }}
        whileTap={{ scale: scale * 0.95 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        style={{
          background: 'linear-gradient(135deg, #D4AF37, #B8860B)',
          color: '#0a0a0a',
          fontWeight: 'bold',
          padding: '1.5rem 3rem',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          fontSize: '1.3rem',
          position: 'relative',
          overflow: 'hidden',
          fontFamily: 'Montserrat, sans-serif',
          width: '100%',
          maxWidth: '400px',
          border: '2px solid rgba(255, 255, 255, 0.2)'
        }}
      >
        <motion.span
          animate={clicks >= 2 ? { 
            textShadow: ['0 0 10px rgba(255,255,255,0.5)', '0 0 20px rgba(255,255,255,0.8)', '0 0 10px rgba(255,255,255,0.5)']
          } : {}}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}
        >
           🥰🥰🥰Minoutaa
        </motion.span>
        
        {/* عداد النقرات */}
        {clicks > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: [0, 1.5, 1] }}
            style={{
              position: 'absolute',
              top: '-10px',
              right: '-10px',
              background: clicks >= 3 ? '#FF4757' : '#FF6B6B',
              color: 'white',
              borderRadius: '50%',
              width: '35px',
              height: '35px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1rem',
              fontWeight: 'bold',
              boxShadow: '0 0 20px rgba(255, 107, 107, 0.5)',
              border: '2px solid rgba(255, 255, 255, 0.5)'
            }}
          >
            {clicks}
          </motion.span>
        )}
      </motion.button>

      {/* رسالة تفاعلية */}
      {message && (
        <motion.p
          key={message}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          style={{
            fontSize: '1.1rem',
            color: clicks >= 3 ? '#FF6B6B' : '#D4AF37',
            fontFamily: 'Playfair Display, serif',
            fontStyle: 'italic',
            marginTop: '0.5rem',
            textShadow: '0 0 10px rgba(212, 175, 55, 0.3)',
            background: 'rgba(0, 0, 0, 0.3)',
            padding: '0.5rem 1.5rem',
            borderRadius: '30px',
            backdropFilter: 'blur(5px)',
            border: '1px solid rgba(212, 175, 55, 0.3)'
          }}
        >
          {message}
        </motion.p>
      )}

      {/* إضافة CSS للاهتزاز إذا لم يكن موجوداً */}
      <style>
        {`
          @keyframes shake {
            0% { transform: translate(1px, 1px) rotate(0deg); }
            10% { transform: translate(-1px, -2px) rotate(-1deg); }
            20% { transform: translate(-3px, 0px) rotate(1deg); }
            30% { transform: translate(3px, 2px) rotate(0deg); }
            40% { transform: translate(1px, -1px) rotate(1deg); }
            50% { transform: translate(-1px, 2px) rotate(-1deg); }
            60% { transform: translate(-3px, 1px) rotate(0deg); }
            70% { transform: translate(3px, 1px) rotate(-1deg); }
            80% { transform: translate(-1px, -1px) rotate(1deg); }
            90% { transform: translate(1px, 2px) rotate(0deg); }
            100% { transform: translate(1px, -2px) rotate(-1deg); }
          }
        `}
      </style>
    </div>
  );
};

export default SpecialButton;