import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiFillPauseCircle } from "react-icons/ai";
import { FiPlay } from "react-icons/fi";
import { AiOutlineStepBackward } from "react-icons/ai";
import { AiOutlineStepForward } from "react-icons/ai";
import { useAtom } from "jotai";
import { currentSoundAtom } from "@/atom";
import useSound from "use-sound";
import { Music } from "@/types/music";
import { time } from "console";
import Image from "next/image";

export const Player: React.FC = () => {
  const [currSound] = useAtom(currentSoundAtom);
  const [currTime, setCurrTime] = useState<number>(0);
  const [play, { stop, pause, duration }] = useSound(
    currSound?.musicPath || ""
  );
  const [isPaused, setIsPaused] = useState<boolean>(false);

  useEffect(() => {
    //play();
    setIsPaused(false);

    return () => {
      stop();
    };
  }, [currSound]);

  const onPauseClick = useCallback(() => {
    setIsPaused(true);
    pause();
  }, [currSound]);

  const onPlayClick = useCallback(() => {
    setIsPaused(false);
    play();
  }, [currSound]);

  if (currSound)
    return (
      <div className="w-[500px] bg-neutral-100 p-5 border flex flex-col rounded">
        <Image
          className="mx-auto my-6 rounded-md w-[400px] h-[400px]"
          src={currSound.posterPath}
          width={600}
          height={600}
          alt={currSound.title}
        />
        <div className="text-xl">{currSound.title}</div>
        <div className="w-full flex pl-8 pr-6 py-2 mb-6">
          <input
            type="range"
            className="w-full"
            max={duration ? duration : 1}
            value={currTime}
          />
          <div className="px-3">{duration}</div>
        </div>
        <div className="flex text-4xl mx-auto  mb-5">
          <AiOutlineStepBackward className="cursor-pointer" />
          {isPaused ? (
            <FiPlay className="cursor-pointer" onClick={onPlayClick} />
          ) : (
            <AiFillPauseCircle
              className="cursor-poiter"
              onClick={onPauseClick}
            />
          )}
          <AiOutlineStepForward className="cursor-pointer" />
        </div>
      </div>
    );

  return <div>text</div>;
};
