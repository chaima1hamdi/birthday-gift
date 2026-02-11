import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';

const HappyBirthday = () => {
  const navigate = useNavigate();
  const [candlesBlown, setCandlesBlown] = useState(0);
  const [showWish, setShowWish] = useState(false);
  const [showCake, setShowCake] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [showFinalImage, setShowFinalImage] = useState(false);
  const [glowIntensity, setGlowIntensity] = useState(1);
  const [isMobile, setIsMobile] = useState(false);
  const audioRef = useRef(null);
  const confettiIntervalRef = useRef(null);

  // ✅ Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    setShowCake(true);
    setTimeout(() => setShowMessage(true), 800);

    const startConfetti = () => {
      confetti({
        particleCount: 50,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#1F7A63', '#9EC5AB', '#F5F5F5'],
        decay: 0.9,
        startVelocity: 25,
        ticks: 200,
      });
    };

    confettiIntervalRef.current = setInterval(() => {
      if (!showWish && !showFinalImage) {
        startConfetti();
      }
    }, 3000);

    const glowInterval = setInterval(() => {
      setGlowIntensity((prev) => (prev === 1 ? 1.2 : 1));
    }, 1500);

    return () => {
      clearInterval(confettiIntervalRef.current);
      clearInterval(glowInterval);
    };
  }, [showWish, showFinalImage]);

  const handleCandleBlow = (index) => {
    if (candlesBlown <= index) {
      setCandlesBlown((prev) => prev + 1);

      setTimeout(() => {
        if (candlesBlown + 1 === 3) {
          setShowWish(true);

          confetti({
            particleCount: 200,
            spread: 100,
            origin: { y: 0.5, x: 0.5 },
            colors: ['#D4AF37', '#FFD700', '#1F7A63', '#9EC5AB'],
            startVelocity: 35,
            decay: 0.9,
            ticks: 300,
          });

          setTimeout(() => {
            confetti({
              particleCount: 100,
              spread: 60,
              origin: { y: 0.6, x: 0 },
              colors: ['#D4AF37', '#FFD700'],
            });
            confetti({
              particleCount: 100,
              spread: 60,
              origin: { y: 0.6, x: 1 },
              colors: ['#1F7A63', '#9EC5AB'],
            });
          }, 200);

          setTimeout(() => {
            setShowWish(false);
            setShowFinalImage(true);

            confetti({
              particleCount: 150,
              spread: 80,
              origin: { y: 0.6 },
              colors: ['#D4AF37', '#FFD700', '#F5F5F5'],
              startVelocity: 30,
            });
          }, 3000);
        }
      }, 300);
    }
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  // 📱 Responsive values
  const cakeWidth = isMobile ? '200px' : '240px';
  const cakeHeight = isMobile ? '100px' : '120px';
  const candleBottom = isMobile ? '100px' : '140px';
  const candleLeftOffset = isMobile ? 15 : 40;
  const candleSpacing = isMobile ? 22 : 80;
  const zImageMaxWidth = isMobile ? '300px' : '500px';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      style={{
        minHeight: '100vh',
        background:
          'linear-gradient(135deg, #0F3D2E 0%, #1A4A3A 50%, #0D1B1E 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '1rem' : '1.5rem',
        position: 'relative',
        overflow: 'hidden',
        direction: 'rtl',
      }}
    >
      {/* خلفية متحركة */}
      <motion.div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(circle at 30% 40%, rgba(212, 175, 55, 0.08) 0%, transparent 45%), radial-gradient(circle at 70% 60%, rgba(31, 122, 99, 0.08) 0%, transparent 45%)',
          opacity: 0.8,
        }}
        animate={{
          scale: [1, 1.1, 1],
          rotate: [0, 2, 0, -2, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: 'linear',
        }}
      />

      {/* جسيمات ذهبية – عدد أقل على الجوال */}
      {[...Array(isMobile ? 8 : 15)].map((_, i) => (
        <motion.div
          key={i}
          style={{
            position: 'absolute',
            width: Math.random() * 4 + 1,
            height: Math.random() * 4 + 1,
            background: `rgba(212, 175, 55, ${Math.random() * 0.3 + 0.2})`,
            borderRadius: '50%',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            filter: 'blur(1px)',
          }}
          animate={{
            y: [0, -Math.random() * 50 - 25, 0],
            x: [0, (Math.random() - 0.5) * 50, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: Math.random() * 8 + 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* المحتوى الرئيسي */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          maxWidth: '900px',
          width: '100%',
          textAlign: 'center',
        }}
      >
        {/* العنوان */}
        <motion.div
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.h1
            animate={{
              textShadow: [
                `0 0 20px rgba(212, 175, 55, ${glowIntensity * 0.3})`,
                `0 0 40px rgba(212, 175, 55, ${glowIntensity * 0.5})`,
                `0 0 20px rgba(212, 175, 55, ${glowIntensity * 0.3})`,
              ],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{
              fontSize: 'clamp(2.2rem, 10vw, 4.5rem)',
              marginBottom: '1rem',
              background: 'linear-gradient(135deg, #D4AF37, #FFD700, #F5F5F5)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontFamily: 'Playfair Display, serif',
              fontWeight: 700,
              letterSpacing: '2px',
            }}
          >
            عيد ميلاد سعيد!
          </motion.h1>
        </motion.div>

        {/* رسالة شخصية */}
        <AnimatePresence>
          {showMessage && !showWish && !showFinalImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              style={{ marginBottom: '1.5rem' }}
            >
              <p
                style={{
                  fontSize: 'clamp(1.1rem, 4.5vw, 1.6rem)',
                  color: '#F5F5F5',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 300,
                  lineHeight: 1.8,
                  maxWidth: '700px',
                  margin: '0 auto',
                  textShadow: '0 2px 10px rgba(0,0,0,0.3)',
                  padding: isMobile ? '0 1rem' : '0',
                }}
              >
                
                <br />
                <span style={{ color: '#D4AF37', fontWeight: 500 }}>
                  وجودك هو أجمل هدية
                </span>
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* حاوية الكعكة */}
        {!showFinalImage && (
          <div
            style={{
              position: 'relative',
              margin: isMobile ? '1rem auto' : '2rem auto',
              width: '100%',
              maxWidth: isMobile ? '320px' : '400px',
              height: isMobile ? '280px' : '350px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            {/* الكعكة */}
            <AnimatePresence>
              {showCake && !showFinalImage && (
                <motion.div
                  initial={{ scale: 0, y: 100 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, y: 100 }}
                  transition={{
                    type: 'spring',
                    stiffness: 150,
                    damping: 15,
                    delay: 0.6,
                  }}
                  style={{
                    position: 'relative',
                    width: cakeWidth,
                    height: cakeHeight,
                  }}
                >
                  {/* طبقات الكعكة */}
                  <div
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      height: isMobile ? '65px' : '80px',
                      background: 'linear-gradient(45deg, #8B4513, #A0522D)',
                      borderRadius: '12px 12px 25px 25px',
                      boxShadow: '0 10px 30px rgba(0,0,0,0.4)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      bottom: isMobile ? '50px' : '60px',
                      width: '100%',
                      height: isMobile ? '25px' : '30px',
                      background: 'linear-gradient(45deg, #D2691E, #CD853F)',
                      borderRadius: '12px 12px 0 0',
                      boxShadow: '0 -5px 15px rgba(0,0,0,0.2)',
                    }}
                  />
                  {/* الزينة */}
                  <div
                    style={{
                      position: 'absolute',
                      top: isMobile ? '15px' : '20px',
                      left: '10%',
                      right: '10%',
                      height: isMobile ? '16px' : '20px',
                      background:
                        'linear-gradient(90deg, #D4AF37, #FFD700, #D4AF37)',
                      borderRadius: '10px',
                      opacity: 0.9,
                      boxShadow: '0 0 20px rgba(212, 175, 55, 0.4)',
                    }}
                  />
                  {/* كريمة */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-5px',
                      left: '5%',
                      width: '90%',
                      height: isMobile ? '12px' : '15px',
                      background: 'linear-gradient(180deg, #FFF8E7, #FFE4C4)',
                      borderRadius: '10px',
                      filter: 'blur(2px)',
                    }}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* الشموع */}
            {!showFinalImage &&
              [0, 1, 2].map((index) => {
                const isBlown = candlesBlown > index;
                return (
                  <motion.div
                    key={index}
                    initial={{ scale: 0, y: 50 }}
                    animate={{ scale: 1, y: 0 }}
                    exit={{ scale: 0, y: 50 }}
                    transition={{
                      type: 'spring',
                      delay: 0.8 + index * 0.15,
                      stiffness: 200,
                    }}
                    style={{
                      position: 'absolute',
                      bottom: candleBottom,
                      left: `${candleLeftOffset + index * candleSpacing}px`,
                      cursor:
                        !isBlown && !showFinalImage ? 'pointer' : 'default',
                      zIndex: 20,
                    }}
                    whileHover={
                      !isBlown && !showFinalImage
                        ? { scale: 1.1, y: -5 }
                        : {}
                    }
                    whileTap={
                      !isBlown && !showFinalImage ? { scale: 0.95 } : {}
                    }
                    onClick={() =>
                      !isBlown && !showFinalImage && handleCandleBlow(index)
                    }
                  >
                    {/* الشمعة */}
                    <motion.div
                      animate={
                        !isBlown
                          ? {
                              boxShadow: [
                                '0 0 5px rgba(255,255,255,0.5)',
                                '0 0 15px rgba(255,255,255,0.8)',
                                '0 0 5px rgba(255,255,255,0.5)',
                              ],
                            }
                          : {}
                      }
                      transition={{ duration: 1.5, repeat: Infinity }}
                      style={{
                        width: '12px',
                        height: isMobile ? '50px' : '60px',
                        background: isBlown
                          ? 'linear-gradient(to bottom, #A9A9A9, #808080)'
                          : 'linear-gradient(to bottom, #FFFFFF, #F5F5F5)',
                        borderRadius: '3px',
                        boxShadow: '0 0 10px rgba(0,0,0,0.2)',
                        opacity: isBlown ? 0.7 : 1,
                      }}
                    />

                    {/* اللهب */}
                    {!isBlown && !showFinalImage && (
                      <motion.div
                        animate={{
                          scale: [1, 1.3, 1],
                          opacity: [0.8, 1, 0.8],
                          rotate: [-3, 3, -3],
                        }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: 'easeInOut',
                        }}
                        style={{
                          position: 'absolute',
                          top: '-20px',
                          left: '0px',
                          width: '12px',
                          height: isMobile ? '18px' : '20px',
                          background:
                            'radial-gradient(circle, #FFD700 0%, #FF8C00 50%, #FF4500 100%)',
                          borderRadius: '50% 50% 20% 20%',
                          filter: 'blur(2px)',
                          boxShadow: '0 -5px 20px rgba(255,69,0,0.5)',
                        }}
                      />
                    )}

                    {/* دخان بعد الإطفاء */}
                    {isBlown && (
                      <motion.div
                        initial={{ opacity: 0.6, y: 0, scale: 0.5 }}
                        animate={{ opacity: 0, y: -30, scale: 2 }}
                        transition={{ duration: 1 }}
                        style={{
                          position: 'absolute',
                          top: '-20px',
                          left: '-5px',
                          width: '20px',
                          height: '20px',
                          background: 'rgba(200,200,200,0.3)',
                          borderRadius: '50%',
                          filter: 'blur(5px)',
                        }}
                      />
                    )}
                  </motion.div>
                );
              })}
          </div>
        )}

        {/* رسالة التمني */}
        <AnimatePresence>
          {showMessage && !showWish && !showFinalImage && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
              style={{ marginTop: '0.5rem' }}
            >
              <p
                style={{
                  fontSize: isMobile ? '1.5rem' : '1.8rem',
                  color: '#9EC5AB',
                  fontFamily: 'Playfair Display, serif',
                  fontStyle: 'italic',
                }}
              >
                تمنى أمنية...
              </p>
              <p
                style={{
                  fontSize: isMobile ? '1rem' : '1.2rem',
                  color: 'rgba(212, 175, 55, 0.9)',
                  marginTop: '0.5rem',
                }}
              >
                ثم أطفئ الشموع ✨
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* رسالة الأمنية النهائية */}
      <AnimatePresence>
        {showWish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(13, 27, 30, 0.95)',
              backdropFilter: 'blur(15px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
              padding: '1.5rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{
                type: 'spring',
                stiffness: 100,
                damping: 15,
                delay: 0.2,
              }}
              style={{
                maxWidth: '600px',
                width: '90%',
                background: 'rgba(16, 42, 46, 0.9)',
                backdropFilter: 'blur(10px)',
                border: '2px solid rgba(212, 175, 55, 0.3)',
                borderRadius: '30px',
                padding: isMobile ? '2rem 1.5rem' : '3rem 2rem',
                textAlign: 'center',
                boxShadow: '0 30px 60px rgba(0,0,0,0.5)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  width: '100%',
                  height: '100%',
                  background:
                    'radial-gradient(circle at center, rgba(212,175,55,0.1) 0%, transparent 70%)',
                  pointerEvents: 'none',
                }}
              />

              <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                style={{ fontSize: 'clamp(3rem, 12vw, 5rem)', marginBottom: '1rem' }}
              >
                ✨
              </motion.div>

              <motion.h2
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                style={{
                  fontSize: 'clamp(1.8rem, 6vw, 2.8rem)',
                  marginBottom: '1.5rem',
                  background: 'linear-gradient(45deg, #D4AF37, #FFD700)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'Playfair Display, serif',
                  fontWeight: 700,
                }}
              >
                أمنيتي قد تحققت بالفعل...
              </motion.h2>

              <motion.p
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, type: 'spring' }}
                style={{
                  fontSize: 'clamp(1.6rem, 5vw, 2.4rem)',
                  color: '#F5F5F5',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 400,
                  marginBottom: '2rem',
                }}
              >
                كانت أنت ❤️
              </motion.p>

              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '100px' }}
                transition={{ delay: 1.2, duration: 0.8 }}
                style={{
                  height: '2px',
                  background:
                    'linear-gradient(90deg, transparent, #D4AF37, transparent)',
                  margin: '1rem auto',
                }}
              />

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.4 }}
                style={{
                  color: 'rgba(245,245,245,0.7)',
                  fontSize: '1rem',
                  marginTop: '1rem',
                  fontStyle: 'italic',
                }}
              >
                
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* الصورة النهائية مع الزر */}
      <AnimatePresence>
        {showFinalImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: 'rgba(13, 27, 30, 0.98)',
              backdropFilter: 'blur(20px)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 2000,
              padding: isMobile ? '1rem' : '2rem',
            }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              transition={{
                type: 'spring',
                stiffness: 120,
                damping: 12,
                delay: 0.3,
              }}
              style={{
                maxWidth: '800px',
                width: '100%',
                textAlign: 'center',
              }}
            >
              {/* صورة Z */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                style={{
                  marginBottom: '1.5rem',
                  position: 'relative',
                }}
              >
                <img
                  src="/images/Z.jpg"
                  alt="Z"
                  style={{
                    width: '100%',
                    maxWidth: zImageMaxWidth,
                    height: 'auto',
                    borderRadius: '20px',
                    border: '4px solid rgba(212, 175, 55, 0.5)',
                    boxShadow: '0 0 50px rgba(212, 175, 55, 0.3)',
                    objectFit: 'cover',
                  }}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = '/images/Z.png';
                  }}
                />

                {/* توهج حول الصورة */}
                <div
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: '110%',
                    height: '110%',
                    background:
                      'radial-gradient(circle, rgba(212,175,55,0.2) 0%, transparent 70%)',
                    borderRadius: '20px',
                    filter: 'blur(30px)',
                    zIndex: -1,
                    pointerEvents: 'none',
                  }}
                />
              </motion.div>

              {/* الكلمات تحت الصورة */}
              <motion.h2
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.8 }}
                style={{
                  fontSize: 'clamp(1.8rem, 6vw, 2.5rem)',
                  marginBottom: '0.5rem',
                  background: 'linear-gradient(45deg, #D4AF37, #FFD700)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  fontFamily: 'Playfair Display, serif',
                  fontWeight: 700,
                }}
              >
               شكراً 😌😌
              </motion.h2>

              <motion.p
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
                style={{
                  fontSize: 'clamp(1rem, 4vw, 1.5rem)',
                  color: '#F5F5F5',
                  fontFamily: 'Montserrat, sans-serif',
                  fontWeight: 300,
                  marginBottom: '2rem',
                  lineHeight: 1.8,
                  padding: isMobile ? '0 0.5rem' : '0',
                }}
              >
                <span style={{ color: '#9EC5AB', fontSize: 'clamp(0.9rem, 3.5vw, 1.1rem)' }}>
                  وإلى اللقاء في مغامرتنا القادمة ❤️
                </span>
              </motion.p>

              {/* زر العودة إلى الصفحة الرئيسية */}
              <motion.button
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.3, duration: 0.8 }}
                whileHover={{
                  scale: 1.05,
                  boxShadow: '0 0 40px rgba(212, 175, 55, 0.5)',
                }}
                whileTap={{ scale: 0.95 }}
                onClick={handleBackToHome}
                style={{
                  background: 'linear-gradient(45deg, #2F6F64, #1F7A63)',
                  color: '#F5F5F5',
                  border: 'none',
                  padding: isMobile ? '0.8rem 1.8rem' : '1.2rem 3rem',
                  borderRadius: '50px',
                  fontSize: isMobile ? '1.1rem' : '1.3rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'Montserrat, sans-serif',
                  boxShadow: '0 10px 30px rgba(47, 111, 100, 0.4)',
                  transition: 'all 0.3s ease',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  margin: '0 auto',
                  border: '2px solid rgba(212, 175, 55, 0.3)',
                  minWidth: isMobile ? '200px' : '250px',
                }}
              >
                <span>🏠</span>
                العودة إلى البداية
              </motion.button>

              {/* نص خفي تحت الزر */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.6 }}
                transition={{ delay: 1.6, duration: 1 }}
                style={{
                  marginTop: '2rem',
                  fontSize: '0.9rem',
                  color: 'rgba(245, 245, 245, 0.5)',
                  fontStyle: 'italic',
                }}
              >
                دائمًا في انتظارك... ✨
              </motion.p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default HappyBirthday;