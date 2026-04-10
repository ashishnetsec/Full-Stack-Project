// components/CleanLoader.jsx
import { useEffect, useState } from "react";

const text = "Loading category details";

export default function SmartLoader() {
  const [displayText, setDisplayText] = useState("");
  const [dots, setDots] = useState("");

  // typing effect
  useEffect(() => {
    let i = 0;
    const typing = setInterval(() => {
      setDisplayText(text.slice(0, i));
      i++;
      if (i > text.length) clearInterval(typing);
    }, 40);

    return () => clearInterval(typing);
  }, []);

  // animated dots
  useEffect(() => {
    const dotAnim = setInterval(() => {
      setDots((prev) => (prev.length >= 3 ? "" : prev + "."));
    }, 500);

    return () => clearInterval(dotAnim);
  }, []);

  return (
    <div className="flex items-center justify-center h-[50vh]">
      
      <div className="text-center">
        
        {/* Text */}
        <h1 className="text-lg font-medium text-gray-700">
          {displayText}
          <span className="text-gray-500">{dots}</span>
        </h1>

        {/* Subtle Line */}
        <div className="mt-3 h-[2px] w-32 mx-auto bg-gray-200 overflow-hidden rounded">
          <div className="h-full w-1/2 bg-gray-500 animate-slide"></div>
        </div>

      </div>

    </div>
  );
}