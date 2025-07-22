import { useState, useEffect } from "react";

const Index = () => {
  const [clickCount, setClickCount] = useState(0);
  const [buttonPosition, setButtonPosition] = useState({ x: 50, y: 50 });
  const [isRaining, setIsRaining] = useState(false);
  const [ripples, setRipples] = useState([]);

  useEffect(() => {
    // Auto-play background music
    const audio = new Audio("https://www.soundjay.com/misc/sounds/heart-beat-01.wav");
    audio.loop = true;
    audio.volume = 0.3;
    
    // Play music when component mounts
    const playMusic = () => {
      audio.play().catch(e => console.log("Audio play failed:", e));
    };
    
    // Try to play immediately, but also on first user interaction
    playMusic();
    document.addEventListener('click', playMusic, { once: true });
    
    return () => {
      audio.pause();
      document.removeEventListener('click', playMusic);
    };
  }, []);

  const handleMainHeartClick = () => {
    // Create ripple effect
    const newRipple = {
      id: Date.now(),
      x: 50, // Center of main heart
      y: 50
    };
    setRipples(prev => [...prev, newRipple]);
    
    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(r => r.id !== newRipple.id));
    }, 1000);
  };

  const handleHeartClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);
    
    // Generate random position for the button
    const newX = Math.random() * 80 + 10; // 10% to 90% of screen width
    const newY = Math.random() * 80 + 10; // 10% to 90% of screen height
    setButtonPosition({ x: newX, y: newY });
    
    // After 5 clicks, start raining hearts
    if (newCount >= 5) {
      setIsRaining(true);
      // Reset after animation
      setTimeout(() => {
        setIsRaining(false);
        setClickCount(0);
      }, 5000);
    }
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8 bg-cover bg-center bg-no-repeat" style={{backgroundImage: 'url("https://i.ibb.co/HLG6F8xt/images-1.jpg")'}}>

      {/* Floating Hearts Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 text-primary/20 text-2xl float">♥</div>
        <div className="absolute top-20 right-16 text-accent/20 text-xl float" style={{animationDelay: '1s'}}>♥</div>
        <div className="absolute bottom-32 left-20 text-primary/20 text-lg float" style={{animationDelay: '2s'}}>♥</div>
        <div className="absolute bottom-20 right-10 text-accent/20 text-2xl float" style={{animationDelay: '0.5s'}}>♥</div>
        <div className="absolute top-1/3 left-1/4 text-primary/20 text-sm float" style={{animationDelay: '1.5s'}}>♥</div>
        <div className="absolute top-2/3 right-1/4 text-accent/20 text-sm float" style={{animationDelay: '2.5s'}}>♥</div>
      </div>

      {/* Main Content */}
      <div className="text-center z-10">
        {/* Beating Heart */}
        <div className="mb-8 md:mb-12 relative">
          <div 
            className="heart-beat text-[16rem] md:text-[18rem] lg:text-[24rem] text-primary drop-shadow-lg cursor-pointer relative z-10"
            onClick={handleMainHeartClick}
          >
            ♥
          </div>
          
          {/* Heart Ripples */}
          {ripples.map(ripple => (
            <div
              key={ripple.id}
              className="heart-ripple absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                fontSize: '16rem',
              }}
            >
              ♥
            </div>
          ))}
        </div>

        {/* Romantic Message */}
        <div className="max-w-4xl mx-auto">
          <h1 className="romantic-text text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-8 text-white">
            I LOVE YOU AYO MY NIGERIAN BESTIE
          </h1>
        </div>

        {/* Subtle Sparkle Effects */}
        <div className="mt-8 flex justify-center space-x-4">
          <div className="animate-pulse text-yellow-300 text-xl">✨</div>
          <div className="animate-pulse text-yellow-300 text-lg" style={{animationDelay: '0.5s'}}>✨</div>
          <div className="animate-pulse text-yellow-300 text-xl" style={{animationDelay: '1s'}}>✨</div>
        </div>
      </div>

      {/* Heart-shaped Button */}
      <button
        onClick={handleHeartClick}
        className="heart-button absolute z-20 transition-all duration-300 hover:scale-110 cursor-pointer"
        style={{
          left: `${buttonPosition.x}%`,
          top: `${buttonPosition.y}%`,
          transform: 'translate(-50%, -50%)',
          fontSize: `${3 + clickCount * 0.5}rem`,
          filter: `brightness(${1 + clickCount * 0.3}) drop-shadow(0 0 ${8 + clickCount * 4}px hsl(var(--primary) / ${0.3 + clickCount * 0.1}))`,
          textShadow: `0 0 ${10 + clickCount * 5}px hsl(var(--primary) / ${0.5 + clickCount * 0.1})`,
        }}
      >
        ♥
      </button>

      {/* Click Counter */}
      <div className="absolute top-4 right-4 z-20 bg-black/20 backdrop-blur-sm rounded-lg px-4 py-2">
        <span className="text-white font-semibold">
          Clicks: {clickCount}/5
        </span>
      </div>

      {/* Raining Hearts Effect */}
      {isRaining && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-30">
          {[...Array(80)].map((_, i) => (
            <div
              key={i}
              className="heart-rain absolute text-red-500"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                fontSize: `${Math.random() * 40 + 30}px`,
                animationDuration: `${Math.random() * 2 + 4}s`,
              }}
            >
              ♥
            </div>
          ))}
        </div>
      )}

      {/* Bottom decorative hearts */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 text-primary/40">
        <span className="text-sm animate-pulse">♥</span>
        <span className="text-xs animate-pulse" style={{animationDelay: '0.3s'}}>♥</span>
        <span className="text-sm animate-pulse" style={{animationDelay: '0.6s'}}>♥</span>
      </div>
    </div>
  );
};

export default Index;
