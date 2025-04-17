"use client";

import { useState, useEffect } from "react";

export default function LoadingDots() {
  const [dotsVisible, setDotsVisible] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDotsVisible((prev) => (prev + 1) % 4); // 0, 1, 2, 3, 0, 1, 2, 3...
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Render dots in a fixed-width container
  return (
    <span className="loading-dots inline-block w-12 text-left">
      {".".repeat(dotsVisible)}
    </span>
  );
}
