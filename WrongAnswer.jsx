import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const WrongAnswer = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(() => {
    const saved = localStorage.getItem('wrongAttempts');
    return saved ? parseInt(saved, 10) : 0;
  });

  useEffect(() => {
    const newAttempts = wrongAttempts + 1;
    setWrongAttempts(newAttempts);
    localStorage.setItem('wrongAttempts', newAttempts.toString());
  }, []);

  const handleVideoClick = async () => {
    if (!videoRef.current) return;

    try {
      if (isVideoPlaying) {
        videoRef.current.pause();
        setIsVideoPlaying(false);
      } else {
        videoRef.current.muted = false;
        await videoRef.current.play();
        setIsVideoPlaying(true);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        console.error('Video play error:', error);
      }
      setIsVideoPlaying(false);
    }
  };

  const handleNavigateHome = () => {
    requestAnimationFrame(() => {
      navigate('/');
    });
  };

  const getConfidenceLevel = () => {
    if (wrongAttempts <= 2) return 'ساذج قليلاً 😄';
    if (wrongAttempts <= 4) return 'مشبوه 🤔';
    if (wrongAttempts <= 6) return 'مريب للغاية 🕵️';
    return 'خبير في الأخطاء! 🏆';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: 'easeOut' }}
      style={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0D1B1E 0%, #1A2B2E 100%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
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
          width: '80%',
          height: '80%',
          background:
            'radial-gradient(circle, rgba(255, 107, 107, 0.05) 0%, transparent 70%)',
          borderRadius: '50%',
          filter: 'blur(40px)',
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: '800px',
          width: '100%',
        }}
      >
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          style={{
            fontSize: '6rem',
            marginBottom: '2rem',
            color: '#FF6B6B',
          }}
        >
          ❌
        </motion.div>

        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          style={{
            fontSize: '3rem',
            marginBottom: '1rem',
            color: '#F5F5F5',
            fontFamily: 'Playfair Display, serif',
            fontWeight: 700,
            textShadow: '0 2px 10px rgba(0,0,0,0.3)',
          }}
        >
          🫢🫣🤔 إجابة خاطئة!
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          style={{
            fontSize: '1.5rem',
            marginBottom: '3rem',
            color: 'rgba(245, 245, 245, 0.9)',
            lineHeight: 1.6,
          }}
        >
          لكنك لا تزال تستحق هذا 😒😒
        </motion.p>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.6, duration: 1 }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            borderRadius: '20px',
            overflow: 'hidden',
            aspectRatio: '16/9',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
            border: '2px solid rgba(212, 175, 55, 0.3)',
            background: '#000',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background:
                'radial-gradient(circle at center, rgba(212, 175, 55, 0.1) 0%, transparent 70%)',
              pointerEvents: 'none',
              zIndex: 1,
            }}
          />

          <video
            ref={videoRef}
            style={{
              width: '100%',
              height: 'auto',
              minHeight: '300px',
              objectFit: 'cover',
              display: 'block',
              borderRadius: '18px',
            }}
            muted
            playsInline
            preload="auto"
            poster="/images/H.jpg"
          >
            {/* ✅ FIXED: video source to Q.mp4 */}
            <source src="/videos/X.mp4" type="video/mp4" />
            متصفحك لا يدعم تشغيل الفيديو.
          </video>

          {!isVideoPlaying && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              style={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '80px',
                height: '80px',
                background: 'rgba(212, 175, 55, 0.9)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 2,
                boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)',
                backdropFilter: 'blur(5px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
              }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleVideoClick}
            >
              <span style={{ fontSize: '2.5rem' }}>▶️</span>
            </motion.div>
          )}

          <div
            style={{
              position: 'absolute',
              top: '20px',
              left: 0,
              width: '100%',
              textAlign: 'center',
              color: '#F5F5F5',
              fontSize: '1rem',
              fontFamily: 'Montserrat, sans-serif',
              fontWeight: 300,
              zIndex: 2,
              background: 'rgba(0, 0, 0, 0.3)',
              padding: '10px',
              backdropFilter: 'blur(5px)',
            }}
          >
            {isVideoPlaying ? 'انقر للإيقاف' : 'انقر للتشغيل مع الصوت'}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 1 }}
          style={{
            background: 'rgba(255, 255, 255, 0.05)',
            padding: '1.5rem',
            borderRadius: '15px',
            margin: '2rem 0',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
          }}
        >
          <p
            style={{
              fontSize: '1.2rem',
              marginBottom: '0.5rem',
              color: 'rgba(245, 245, 245, 0.9)',
            }}
          >
            🥺🥺 خطأ 404: لم يتم العثور على هدية
          </p>

          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              gap: '2rem',
              marginTop: '1rem',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'rgba(245, 245, 245, 0.7)',
                  marginBottom: '0.3rem',
                }}
              >
                عدد المحاولات الخاطئة
              </p>
              <p
                style={{
                  fontSize: '2rem',
                  fontWeight: 'bold',
                  color: '#FF6B6B',
                }}
              >
                {wrongAttempts}
              </p>
            </div>

            <div style={{ textAlign: 'center' }}>
              <p
                style={{
                  fontSize: '0.9rem',
                  color: 'rgba(245, 245, 245, 0.7)',
                  marginBottom: '0.3rem',
                }}
              >
                مستوى الثقة
              </p>
              <p
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 500,
                  color: '#D4AF37',
                }}
              >
                {getConfidenceLevel()}
              </p>
            </div>
          </div>
        </motion.div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleNavigateHome}
          style={{
            background: 'linear-gradient(45deg, #2F6F64, #1F7A63)',
            color: '#F5F5F5',
            border: 'none',
            padding: '1rem 2.5rem',
            borderRadius: '50px',
            fontSize: '1.1rem',
            fontWeight: 500,
            cursor: 'pointer',
            fontFamily: 'Montserrat, sans-serif',
            marginTop: '1rem',
            boxShadow: '0 5px 20px rgba(47, 111, 100, 0.3)',
            transition: 'all 0.3s ease',
          }}
        >
          😏 حاول مرة أخرى
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          transition={{ delay: 1, duration: 1 }}
          style={{
            marginTop: '2rem',
            fontSize: '0.9rem',
            color: 'rgba(245, 245, 245, 0.5)',
            fontStyle: 'italic',
          }}
        >
          هل تعتقد أن هذا الشيء سهل جدًا؟ 😂😂😂
        </motion.p>
      </div>
    </motion.div>
  );
};

export default WrongAnswer;