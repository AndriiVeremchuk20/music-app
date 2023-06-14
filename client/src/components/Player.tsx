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
import { getSoundTime } from "@/utils/getSoundTime";

export const Player: React.FC = () => {
  const [currSound] = useAtom(currentSoundAtom);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);

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

  const onTimeUpdate = (e: ChangeEvent<HTMLAudioElement>) => {
    setCurrentTime(e.target.currentTime);
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
    }
  }, [currSound]);

  if (currSound) {
    return (
      <div className="w-full h-fit fixed flex bg-blue-200 bg-opacity-70 bottom-0">
        <div className="flex w-fit">
          <Image
            className={`w-[100px] h-[100px] rounded-full ${
              isPaused ? "" : "animate-spin-slow"
            }`}
            width={100}
            height={100}
            alt={currSound.title}
            src={currSound.posterPath}
          />
          <div>{currSound.title}</div>
        </div>

        <div className="w-full">
          <div className="flex justify-between">
            <div>{getSoundTime(currentTime)}</div>
            <input
              type="range"
              max={audioRef.current?.duration}
              value={currentTime}
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
        </div>

        <audio
          controls
          ref={audioRef}
          src={currSound.musicPath}
          className="hidden"
          onTimeUpdate={onTimeUpdate}
        />
      </div>
    );
  }

  return <div>no soutd set</div>;
};
