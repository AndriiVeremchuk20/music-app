import { getRandomInt } from "@/utils/random";
import React, { useState, useEffect } from "react";

export const Loader = () => {
  const [sticks, setSticks] = useState<any>([]);

  useEffect(() => {
    if (sticks.length === 20) {
      return;
    }

    const intervalId = setInterval(() => {
      setSticks((prevSticks: any) => [
        ...prevSticks,
        <Stick key={prevSticks.length} />,
      ]);
    }, getRandomInt(200, 400));
    return () => clearInterval(intervalId);
  }, [sticks]);

  return (
    <div className="w-full h-screen fixed flex z-20 bg-orange-400 bg-opacity-30">
      <div className="flex m-auto w-96 h-32">{sticks}</div>
    </div>
  );
};

const Stick = () => {
  return (
    <div className="w-3 h-full mx-1 rounded-md bg-blue-700 animate-bounce"></div>
  );
};
