import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const MovingButton = ({ onAttempt, attempts }) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [buttonSize, setButtonSize] = useState(1);
  const buttonRef = useRef(null);
  const containerRef = useRef(null);

  // توليد موضع عشوائي آمن داخل الحاوية
  const getRandomPosition = () => {
    if (!containerRef.current || !buttonRef.current) return { x: 0, y: 0 };
    
    const container = containerRef.current.getBoundingClientRect();
    const button = buttonRef.current.getBoundingClientRect();
    
    const maxX = container.width - button.width - 20;
    const maxY = container.height - button.height - 20;
    
    return {
      x: Math.random() * maxX,
      y: Math.random() * maxY
    };
  };

  // تحديث الموضع عند كل محاولة
  useEffect(() => {
    if (attempts > 0) {
      const newPos = getRandomPosition();
      setPosition(newPos);
      setButtonSize(prev => Math.max(0.8, prev - 0.05));
    }
  }, [attempts]);

  // تتبع حركة المؤشر/اللمس
  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!buttonRef.current) return;
      
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;
      
      // حساب المسافة بين المؤشر والزر
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;
      const distance = Math.sqrt(
        Math.pow(mouseX - buttonCenterX, 2) + 
        Math.pow(mouseY - buttonCenterY, 2)
      );
      
      // إذا اقترب المؤشر كثيراً، حرك الزر
      if (distance < 100) {
        const newPos = getRandomPosition();
        setPosition(newPos);
        onAttempt();
      }
    };

    const handleTouchMove = (e) => {
      if (!buttonRef.current || e.touches.length === 0) return;
      
      const touch = e.touches[0];
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const touchX = touch.clientX;
      const touchY = touch.clientY;
      
      const buttonCenterX = buttonRect.left + buttonRect.width / 2;
      const buttonCenterY = buttonRect.top + buttonRect.height / 2;
      const distance = Math.sqrt(
        Math.pow(touchX - buttonCenterX, 2) + 
        Math.pow(touchY - buttonCenterY, 2)
      );
      
      if (distance < 120) {
        const newPos = getRandomPosition();
        setPosition(newPos);
        onAttempt();
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, [onAttempt]);

  return (
    <div 
      ref={containerRef}
      style={{
        position: 'relative',
        width: '300px',
        height: '100px',
        margin: '1rem 0'
      }}
    >
      <motion.button
        ref={buttonRef}
        animate={{
          x: position.x,
          y: position.y,
          scale: buttonSize
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 20
        }}
        whileHover={{ scale: buttonSize * 1.1 }}
        style={{
          position: 'absolute',
          background: 'linear-gradient(45deg, #FF6B6B, #FF8E53)',
          color: '#F5F5F5',
          border: 'none',
          padding: '1rem 2.5rem',
          borderRadius: '50px',
          fontSize: '1.5rem',
          fontWeight: 500,
          cursor: 'pointer',
          fontFamily: 'Montserrat, sans-serif',
          boxShadow: '0 5px 20px rgba(255, 107, 107, 0.3)',
          whiteSpace: 'nowrap',
          minWidth: '120px'
        }}
      >
        لا 🙂
      </motion.button>
    </div>
  );
};

export default MovingButton;