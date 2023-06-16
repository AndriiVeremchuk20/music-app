import React from "react";

export const AnimationPlayed = () => {
  return (
    <div className="flex gap-1">
      <div className="w-2 h-10 bg-gray-900 rounded-lg animate-bounce"></div>
      <div className="w-2 h-12 bg-gray-900 rounded-lg animate-bounce-slow"></div>
      <div className="w-2 h-8 bg-gray-900 rounded-lg animate-bounce"></div>
      <div className="w-2 h-9 bg-gray-900 rounded-lg animate-bounce-slow"></div>
      <div className="w-2 h-13 bg-gray-900 rounded-lg animate-bounce"></div>
      <div className="w-2 h-4 bg-gray-900 rounded-lg animate-bounce-slow"></div>
    </div>
  );
};
