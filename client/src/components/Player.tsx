import React, { useCallback, useEffect, useState } from "react";
import { AiFillPauseCircle } from "react-icons/ai";
import { FiPlay } from "react-icons/fi";
import { AiOutlineStepBackward } from "react-icons/ai";
import { AiOutlineStepForward } from "react-icons/ai";
import { useAtom } from "jotai";
import { currentSoundAtom } from "@/atom";
import useSound from "use-sound";
import { Music } from "@/types/music";

interface PropPlayer {
  sound: Music | null;
}

export const Player: React.FC<PropPlayer> = ({ sound }) => {
  const [currSound] = useAtom(currentSoundAtom);
  const [play, { stop, pause, duration }] = useSound(
    currSound?.musicPath || ""
  );
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    console.log(currSound);
    play();
    setIsPaused(false);
    return stop();
  }, [currSound]);

  const onPauseClick = useCallback(() => {
    setIsPaused(true);
    pause();
  }, []);

  const onPlayClick = useCallback(() => {
    setIsPaused(true);
    play();
  }, []);

  return (
    <div className="fixed bottom-0 w-full bg-fuchsia-500 flex flex-col">
      <div className="w-full flex pl-8 pr-6 py-2 mb-6">
        <input
          type="range"
          className="w-full bg-green-700"
          max={duration ? duration : 1}
          value={1}
        />
        <div className="px-3">{duration}</div>
      </div>
      <div className="flex text-4xl mx-auto  mb-5">
        <AiOutlineStepBackward className="cursor-pointer" />
        {isPaused ? (
          <FiPlay className="cursor-pointer" onClick={onPlayClick} />
        ) : (
          <AiFillPauseCircle className="cursor-poiter" onClick={onPauseClick} />
        )}
        <AiOutlineStepForward className="cursor-pointer" />
      </div>
    </div>
  );
};

// const [isPaused, setIsPaused] = useState<boolean>(true);
// //  const [currentSound, setCurrentSound] = useAtom(currentSoundAtom);
// const [play, { pause, duration, sound }] = useSound(music.musicPath);

// const onPlayClick = () => {
//   //setCurrentSound(music);
//   setIsPaused(false);
//   play();
// };

// const onPauseClick = () => {
//   setIsPaused(true);
//   pause();
// };
