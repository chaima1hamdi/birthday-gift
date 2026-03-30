import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Letter = () => {
  const navigate = useNavigate();
  const [text, setText] = useState('');
  const [showSeal, setShowSeal] = useState(false);
  const fullText = `

  useEffect(() => {
    let index = 0;
    const typingInterval = setInterval(() => {
      if (index <= fullText.length) {
        setText(fullText.slice(0, index));
        index++;
        
        if (index === 7) { // عند كتابة "عزيزي..."
          setTimeout(() => {
            document.querySelector('.letter-content').style.animation = 'pulse 2s';
          }, 500);
        }
      } else {
        clearInterval(typingInterval);
        setTimeout(() => {
          setShowSeal(true);
        }, 1000);
      }
    }, 50);

    return () => clearInterval(typingInterval);
  }, [fullText]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        minHeight: '100vh',
        padding: '2rem',
        background: 'linear-gradient(135deg, #F5E6D3 0%, #E8D0B3 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      {/* ختم الشمع */}
      {showSeal && (
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200 }}
          style={{
            position: 'absolute',
            top: '2rem',
            left: '2rem',
            width: '80px',
            height: '80px',
            background: 'radial-gradient(circle at 30% 30%, #C41E3A, #8B0000)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            border: '2px solid #8B0000',
            boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
            zIndex: 2
          }}
        >
          <span style={{
            color: '#FFD700',
            fontSize: '2rem',
            fontFamily: 'Playfair Display, serif',
            transform: 'rotate(-15deg)'
          }}>
            
          </span>
        </motion.div>
      )}

   
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="letter-content"
        style={{
          position: 'relative',
          width: '90%',
          maxWidth: '600px',
          minHeight: '70vh',
          background: `
            linear-gradient(to bottom, transparent 95%, rgba(139, 69, 19, 0.1) 100%),
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%238B4513' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")
          `,
          padding: '3rem',
          borderRadius: '2px',
          boxShadow: '0 10px 40px rgba(0,0,0,0.3)',
          border: '1px solid #D2B48C',
          fontFamily: "'Playfair Display', serif",
          fontSize: '1.2rem',
          lineHeight: '2',
          color: '#5D4037',
          whiteSpace: 'pre-line',
          textAlign: 'right',
          direction: 'rtl'
        }}
      >
        {text}
        {showSeal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              position: 'absolute',
              bottom: '2rem',
              left: '2rem',
              fontSize: '0.9rem',
              color: '#8B4513',
              fontStyle: 'italic'
            }}
          >
           
          </motion.div>
        )}
      </motion.div>

      {/* زر العودة */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => navigate('/')}
        style={{
          marginTop: '3rem',
          background: 'linear-gradient(45deg, #8B4513, #D2691E)',
          color: 'white',
          border: 'none',
          padding: '1rem 2rem',
          borderRadius: '50px',
          cursor: 'pointer',
          fontSize: '1rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'Montserrat, sans-serif'
        }}
      >
        📩 العودة إلى البوابة
      </motion.button>
    </motion.div>
  );
};

export default Letter;
