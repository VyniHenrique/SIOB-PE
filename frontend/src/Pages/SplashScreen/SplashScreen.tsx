import { useEffect, useState } from "react";
import "./SplashScreen.css";
import logo from "../../assets/logo.svg"; 

type SplashProps = {
  onFinish: () => void; // callback quando a animação terminar
};

export default function SplashScreen({ onFinish }: SplashProps) {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const start = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(start); 
  }, []);

  return (
    <div className="splash-container">
      <img
        src={logo} 
        alt="Logo"
        className={`splash-logo ${animate ? "animate" : ""}`}
        onTransitionEnd={onFinish}
      />
    </div>
  );
}
