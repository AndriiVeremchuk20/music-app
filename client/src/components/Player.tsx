import React, { useCallback, useEffect, useRef, useState } from "react";
import { AiFillPauseCircle } from "react-icons/ai";
import { FiPlay } from "react-icons/fi";
import { AiOutlineStepBackward } from "react-icons/ai";
import { AiOutlineStepForward } from "react-icons/ai";
import { useAtom } from "jotai";
import { currentSoundAtom } from "@/atom";
import useSound from "use-sound";
import Image from "next/image";
import ReactPlayer from "react-player/lazy";

export const Player: React.FC = () => {
  const [currSound] = useAtom(currentSoundAtom);
  const [currTime, setCurrTime] = useState<number>(0);
  const [play, { stop, pause, duration }] = useSound(
    currSound?.musicPath || ""
  );
  const [isPaused, setIsPaused] = useState<boolean>(false);

  const onPauseClick = useCallback(() => {
    setIsPaused(true);
    pause();
  }, [currSound]);

  const onPlayClick = useCallback(() => {
    setIsPaused(false);
    play();
  }, [currSound]);

  if (currSound) {
    return <div>
	<div>{currSound.title}</div>
	<audio controls src={currSound.musicPath}/>
	</div>;
  }

  return <div>no soutd set</div>;
};
