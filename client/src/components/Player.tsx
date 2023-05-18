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
  sound: Music;
}

export const Player: React.FC<PropPlayer> = ({ sound }) => {
  const [play, { stop, pause, duration }] = useSound(sound.musicPath);
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    play();
    setIsPaused(false);
    return () => stop();
  }, [sound]);

  const onPauseClick = useCallback(() => {
    setIsPaused(true);
    pause();
  }, [sound]);

  const onPlayClick = useCallback(() => {
    setIsPaused(false);
    play();
  }, [sound]);

  return (
    <div className="w-full bg-fuchsia-500 flex flex-col">
      <div>{sound.title}</div>
      <div className="w-full flex pl-8 pr-6 py-2 mb-6">
        <input
          type="range"
          className="w-full"
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
