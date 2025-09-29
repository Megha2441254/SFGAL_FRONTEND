import React, { useEffect, useState } from 'react';
// import './Home.css'; // Uncomment if you're using external styles
 
const Home = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [typedText, setTypedText] = useState('');
 const fullText = 'GATESENSE';
 
  useEffect(() => {
  let index = 0;
  let buffer = '';
 
  const typingInterval = setInterval(() => {
    if (index < fullText.length) {
      buffer += fullText[index];
      setTypedText(buffer);
      index++;
    } else {
      clearInterval(typingInterval);
      setTimeout(() => setShowIntro(false), 500);
    }
  }, 100);
 
  // Card hover logic...
  const handleCardHover = (event) => {
    const color = event.currentTarget.dataset.color;
    if (color) document.body.style.backgroundColor = color;
  };
 
  const handleCardLeave = () => {
    document.body.style.backgroundColor = '';
  };
 
  const cards = document.querySelectorAll('.card');
  cards.forEach(card => {
    card.addEventListener('mouseenter', handleCardHover);
    card.addEventListener('mouseleave', handleCardLeave);
  });
 
  return () => {
    clearInterval(typingInterval);
    cards.forEach(card => {
      card.removeEventListener('mouseenter', handleCardHover);
      card.removeEventListener('mouseleave', handleCardLeave);
    });
  };
}, []);
 
  return (
    <>
      {showIntro && (
        <div className="intro-overlay">
          <h1 className="typing-text">{typedText || ''}</h1>
        </div>
      )}
 
      {!showIntro && (
        <div className="main-content">
         
          <div className="hero-section">
            <div className="container welcome-section">
             
              <h1>Welcome to the GateSense</h1>
              <h3 className='para'>Your secure solution for managing employee access and monitoring activity logs.</h3>
             
            </div>
          </div>
 
          <div className="scrolling-text">
            <p>⚠️ <strong>ANNOUNCEMENT:</strong> The factory will be shutting down from 6:00 PM to 7:00 AM daily for maintenance. Access is restricted during this period. The factory is open from 7:00 AM to 6:00 PM.</p>
          </div>
 
          <div className="cards-section">
            <div className="cards-row">
              <div className="card" data-color="#F0F8FF">
                <h3>Efficiency</h3>
                <p>Automate access logs and streamline entry/exit points to improve operational efficiency.</p>
              </div>
              <div className="card" data-color="#F5FFFA">
                <h3>Security</h3>
                <p>Enhance factory security with a robust system that tracks every entry and exit.</p>
              </div>
            </div>
            <div className="card" data-color="#FFF0F5">
              <h3>Analytics</h3>
              <p>Gain valuable insights with detailed logs and data on factory access patterns.</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
 
export default Home;