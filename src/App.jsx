// import React, { useState, useRef, useEffect } from "react";
// import "./App.css";
// import ballImage from "../public/ball.png";

// const App = () => {
//   const canvasRef = useRef(null);
//   const ballImgRef = useRef(null); // Ref to hold the preloaded ball image
//   const [ball, setBall] = useState({ x: 300, y: 300, dx: 0, dy: 0 });
//   const [instructions, setInstructions] = useState("Click to launch the ball!");

//   const friction = 0.98; // Adjust friction for smoother slow-down
//   const radius = 36; // Adjusted for h-24 w-24 (72px diameter)
//   const speed = 20; // Increased speed for faster movement

//   const handleCanvasClick = (e) => {
//     const canvas = canvasRef.current;
//     const rect = canvas.getBoundingClientRect();
//     const clickX = e.clientX - rect.left;
//     const clickY = e.clientY - rect.top;

//     const angle = Math.atan2(clickY - ball.y, clickX - ball.x);
//     setBall((prevBall) => ({
//       ...prevBall,
//       dx: speed * Math.cos(angle),
//       dy: speed * Math.sin(angle),
//     }));
//     setInstructions(null); // Remove instructions when ball starts moving
//   };

//   const updateBallPosition = () => {
//     const canvas = canvasRef.current;
//     if (!canvas || !ballImgRef.current) return;

//     const context = canvas.getContext("2d");
//     const { width, height } = canvas;

//     let { x, y, dx, dy } = ball;

//     // Update position
//     x += dx;
//     y += dy;

//     // Check for collisions with canvas boundaries
//     if (x - radius < 0 || x + radius > width) {
//       dx = -dx;
//       x = x - radius < 0 ? radius : width - radius;
//     }

//     if (y - radius < 0 || y + radius > height) {
//       dy = -dy;
//       y = y - radius < 0 ? radius : height - radius;
//     }

//     // Apply friction
//     dx *= friction;
//     dy *= friction;

//     // Stop ball if speed is negligible
//     if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
//       dx = 0;
//       dy = 0;
//       setInstructions("Click to launch the ball!");
//     }

//     setBall({ x, y, dx, dy });

//     // Clear the canvas and draw the ball
//     context.clearRect(0, 0, width, height);
//     context.drawImage(ballImgRef.current, x - radius, y - radius, radius * 2, radius * 2);
//   };

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (canvas) {
//       canvas.width = window.innerWidth;
//       canvas.height = window.innerHeight;

//       // Preload ball image
//       const img = new Image();
//       img.src = ballImage;
//       img.onload = () => {
//         ballImgRef.current = img;
//         const context = canvas.getContext("2d");
//         context.drawImage(img, ball.x - radius, ball.y - radius, radius * 2, radius * 2);
//       };
//     }

//     const interval = setInterval(updateBallPosition, 16);
//     return () => clearInterval(interval);
//   }, [ball]);

//   return (
//     <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100">
//       <canvas
//         ref={canvasRef}
//         onClick={handleCanvasClick}
//         className="border border-gray-300"
//       ></canvas>
//       {instructions && (
//         <p className="absolute top-10 text-gray-600 text-lg">{instructions}</p>
//       )}
//     </div>
//   );
// };

// export default App;


import React, { useState, useRef, useEffect } from "react";
import "./App.css";
import ballImage from "../public/ball.png";

const App = () => {
  const canvasRef = useRef(null);
  const ballImgRef = useRef(null);
  const [ball, setBall] = useState({ x: 300, y: 300, dx: 0, dy: 0 });
  const [instructions, setInstructions] = useState("Click to launch the ball!");

  const friction = 0.98; // Adjust friction for smoother slow-down
  const radius = 36; // Ball radius for h-24 w-24 (72px diameter)
  const speed = 20; // Increased speed for faster movement

  const handleCanvasClick = (e) => {
    const canvas = canvasRef.current;
    const rect = canvas.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    const angle = Math.atan2(clickY - ball.y, clickX - ball.x);
    setBall((prevBall) => ({
      ...prevBall,
      dx: speed * Math.cos(angle),
      dy: speed * Math.sin(angle),
    }));
    setInstructions(null); // Remove instructions when ball starts moving
  };

  const updateBallPosition = () => {
    const canvas = canvasRef.current;
    if (!canvas || !ballImgRef.current) return;

    const context = canvas.getContext("2d");
    const { width, height } = canvas;

    let { x, y, dx, dy } = ball;

    // Update position
    x += dx;
    y += dy;

    // Check for collisions with canvas boundaries
    if (x - radius < 0 || x + radius > width) {
      dx = -dx;
      x = x - radius < 0 ? radius : width - radius;
    }

    if (y - radius < 0 || y + radius > height) {
      dy = -dy;
      y = y - radius < 0 ? radius : height - radius;
    }

    // Apply friction
    dx *= friction;
    dy *= friction;

    // Stop ball if speed is negligible
    if (Math.abs(dx) < 0.1 && Math.abs(dy) < 0.1) {
      dx = 0;
      dy = 0;
      setInstructions("Click to launch the ball!");
    }

    setBall({ x, y, dx, dy });

    // Clear the canvas and draw the ball
    context.clearRect(0, 0, width, height);
    context.drawImage(ballImgRef.current, x - radius, y - radius, radius * 2, radius * 2);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      // Preload ball image
      const img = new Image();
      img.src = ballImage;
      img.onload = () => {
        ballImgRef.current = img;
        const context = canvas.getContext("2d");
        context.drawImage(img, ball.x - radius, ball.y - radius, radius * 2, radius * 2);
      };
    }

    const interval = setInterval(() => {
      updateBallPosition();
    }, 16);

    return () => clearInterval(interval);
  }, [ball]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gray-100">
      <canvas
        ref={canvasRef}
        onClick={handleCanvasClick}
        className="w-full h-full border border-gray-300"
      ></canvas>
      {instructions && (
        <p className="absolute top-10 text-gray-600 text-lg">{instructions}</p>
      )}
    </div>
  );
};

export default App;
