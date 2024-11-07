import { useState } from "react";
import "./App.css";
import { useEffect } from "react";

function App() {
  const [click, setClick] = useState(false);
  const [time, setTime] = useState(new Date());

  const toggleClick = () => {
    setClick((previousClick) => !previousClick);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const secondDegrees = (time.getSeconds() / 60) * 360;
  const minuteDegrees =
    (time.getMinutes() / 60) * 360 + (time.getSeconds() / 60) * 6;
  const hourDegrees =
    ((time.getHours() % 12) / 12) * 360 + (time.getMinutes() / 60) * 30;

  return (
    <div className="test">
      <button onClick={() => toggleClick()} className="toggle">
        Dark Mode
      </button>
      <div className="clock-container">
        <div className="clock">
          <div
            className="needle hour"
            style={{
              transform: `translate(-50%, -100%) rotate(${hourDegrees}deg)`,
            }}
          ></div>
          <div
            className="needle minute"
            style={{
              transform: `translate(-50%, -100%) rotate(${minuteDegrees}deg)`,
            }}
          ></div>
          <div
            className="needle second"
            style={{
              transform: `translate(-50%, -100%) rotate(${secondDegrees}deg)`,
            }}
          ></div>
          <div className="center-point"></div>
        </div>
      </div>

      <div className="time">
        {time.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
        })}
      </div>
      <div className="date">
        {time.toLocaleDateString("en-US", { weekday: "long", month: "short" })}
        <span className="circle">
          {time.toLocaleDateString("en-US", { day: "numeric" })}
        </span>
      </div>
    </div>
  );
}

export default App;
