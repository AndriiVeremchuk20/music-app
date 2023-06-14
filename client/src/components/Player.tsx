import React, {
  ChangeEvent,
  MutableRefObject,
  RefObject,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { AiFillPauseCircle } from "react-icons/ai";
import { FiPlay } from "react-icons/fi";
import { AiOutlineStepBackward } from "react-icons/ai";
import { AiOutlineStepForward } from "react-icons/ai";
import { useAtom } from "jotai";
import { currentSoundAtom } from "@/atom";
import Image from "next/image";
import {getSoundTime} from "@/utils/getSoundTime";

export const Player: React.FC = () => {
  const [currSound] = useAtom(currentSoundAtom);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  // const [currentTime, setCurrentTime] = useState<number>(0);

  const audioRef: MutableRefObject<HTMLAudioElement | null> = useRef(null);

  const onPauseClick = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPaused((prev) => !prev);
    }
  }, [currSound]);

  const onPlayClick = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPaused((prev) => !prev);
    }
  }, [currSound]);

  const onSetTime = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (audioRef.current) {
        audioRef.current.currentTime = Number(e.target.value);
      }
    },
    [currSound]
  );

  if (currSound) {
    return (
      <div className="w-full h-fit fixed b-[10px] bg-blue-200">
        <div>{currSound.title}</div>

        <div className="flex justify-between">
          <div>{getSoundTime(audioRef.current?.currentTime)}</div>
          <input
            type="range"
            max={audioRef.current?.duration}
            defaultValue={audioRef.current?.currentTime}
            onChange={onSetTime}
            className="w-full"
          />
          <div>{getSoundTime(audioRef.current?.duration)}</div>
        </div>
        <div className="w-full flex justify-around">
          <button>
            <AiOutlineStepBackward size={32} />
          </button>
          <>
            {isPaused ? (
              <button onClick={onPlayClick}>
                <FiPlay size={32} />
              </button>
            ) : (
              <button onClick={onPauseClick}>
                <AiFillPauseCircle size={32} />
              </button>
            )}
          </>
          <button>
            <AiOutlineStepForward />
          </button>
        </div>
        <audio controls ref={audioRef} src={currSound.musicPath} className="hidden" />
      </div>
    );
  }

  return <div>no soutd set</div>;
};
