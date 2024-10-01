import React, { useEffect, useState } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const Circular24HourTimer = () => {
  const [percentage, setPercentage] = useState(0);
  const [time, setTime] = useState("");

  // Function to calculate the percentage of the day passed
  const calculatePercentage = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Calculate the total seconds passed in the day
    const totalSeconds = hours * 3600 + minutes * 60 + seconds;
    // Percentage of the 24 hours
    const dayPercentage = (totalSeconds / 86400) * 100; // 86400 = 24 * 3600 seconds in a day
    setPercentage(dayPercentage);

    // Update the time display
    setTime(`${String(hours).padStart(2, "0")}:
    ${String(minutes).padStart(2, "0")}
    `);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      calculatePercentage();
    }, 1000); // Update every second

    return () => clearInterval(interval); // Cleanup the interval on unmount
  }, []);

  return (
    <div style={{ width: 45, height: 45, marginRight: "20px" }}>
      <svg style={{ height: 0 }}>
        <defs>
          <radialGradient
            id="gradient"
            cx="50%"
            cy="50%"
            r="50%"
            fx="50%"
            fy="50%"
          >
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#7012CE" />
          </radialGradient>
        </defs>
      </svg>
      <CircularProgressbar
        value={percentage}
        text={time}
        styles={buildStyles({
          pathColor: "url(#gradient)",
          textColor: "#000000",
          trailColor: "#d6d6d6",
          backgroundColor: "#3e98c7",
          strokeWidth: 4,
        })}
      />
    </div>
  );
};

export default Circular24HourTimer;
