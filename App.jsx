import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// ✅ IMPORT ALL PAGE COMPONENTS
import Home from './pages/Home';
import DecisionRoom from './pages/DecisionRoom';
import Letter from './pages/Letter';
import WrongAnswer from './pages/WrongAnswer';
import HappyBirthday from './pages/HappyBirthday';

// ✅ IMPORT COUNTDOWN GATE
import CountdownGate from './components/CountdownGate';

function App() {
  const [countdownComplete, setCountdownComplete] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  if (!countdownComplete) {
    return (
      <CountdownGate
        onComplete={() => {
          setCountdownComplete(true);
          document.body.style.overflow = 'auto';
        }}
      />
    );
  }

  return (
    <div className="app-container">
      <Routes>
        {/* ✅ Add a unique key to Home to force fresh mount on every visit */}
        <Route path="/" element={<Home key={Date.now()} />} />
        <Route path="/decision" element={<DecisionRoom />} />
        <Route path="/letter" element={<Letter />} />
        <Route path="/wrong" element={<WrongAnswer />} />
        <Route path="/birthday" element={<HappyBirthday />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;   // ← MUST HAVE THIS