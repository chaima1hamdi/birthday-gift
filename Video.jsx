import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Video = () => {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = React.useState(false);

  const handlePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      style={{
        minHeight: '100vh',
        background: '#000',
        position: 'relative'
      }}
    >
      {/* فيديو الخلفية */}
      <video
        ref={videoRef}
        style={{
          width: '100%',
          height: '100vh',
          objectFit: 'cover',
          opacity: 0.8
        }}
        muted
        loop
        playsInline
      >
        <source src="https://assets.mixkit.co/videos/preview/mixkit-romantic-couple-on-a-bridge-at-sunset-3442-large.mp4" type="video/mp4" />
      </video>

      {/* طبقة تدرج لوني */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        background: 'linear-gradient(to bottom, rgba(15, 61, 46, 0.7), rgba(26, 26, 26, 0.9))'
      }} />

      {/* المحتوى */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        textAlign: 'center',
        width: '90%',
        maxWidth: '800px',
        zIndex: 2
      }}>
        <motion.h1
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            fontSize: '3rem',
            marginBottom: '2rem',
            color: 'white',
            fontFamily: 'Playfair Display, serif',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}
        >
          قصتنا في فيديو
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 1 }}
          style={{
            fontSize: '1.2rem',
            marginBottom: '3rem',
            color: 'rgba(255, 255, 255, 0.9)',
            lineHeight: '1.8'
          }}
        >
          بعض اللحظات لا يمكن للكلمات وصفها...
          <br />
          لكن الفيديو يمكنه أن ينقل المشاعر كما هي.
        </motion.p>

        {/* زر التحكم بالفيديو */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={handlePlay}
          style={{
            background: 'linear-gradient(45deg, #D4AF37, #FFD700)',
            color: '#000',
            border: 'none',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            fontSize: '2rem',
            cursor: 'pointer',
            marginBottom: '3rem',
            boxShadow: '0 0 30px rgba(212, 175, 55, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 3rem'
          }}
        >
          {isPlaying ? '⏸️' : '▶️'}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate('/')}
          style={{
            background: 'rgba(255, 255, 255, 0.2)',
            color: 'white',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            padding: '1rem 2rem',
            borderRadius: '50px',
            fontSize: '1rem',
            cursor: 'pointer',
            backdropFilter: 'blur(10px)',
            fontFamily: 'Montserrat, sans-serif'
          }}
        >
          ↩️ العودة إلى البوابة
        </motion.button>
      </div>
    </motion.div>
  );
};

export default Video;