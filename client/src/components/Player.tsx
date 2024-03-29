import React, {
  ChangeEvent,
  MutableRefObject,
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
import { currentPlaylistAtom, currentSoundAtom } from "@/atom";
import Image from "next/image";
import { getSoundTime } from "@/utils/getSoundTime";
import { BsFillVolumeOffFill, BsFillVolumeUpFill } from "react-icons/bs";
import { Playlist } from "./Playlist";
import { RiPlayListFill } from "react-icons/ri";

const volumeStep = 10;

export const Player: React.FC = () => {
  const [currSound, setCurrSound] = useAtom(currentSoundAtom);
  const [currPlaylist] = useAtom(currentPlaylistAtom);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [volume, setVolume] = useState<number>(100);
  const [showPlaylist, setShowPlaylist] = useState<boolean>(false);

  const audioRef: MutableRefObject<HTMLAudioElement | null> = useRef(null);

/*  const mvNextSound = useCallback(() => {
    const nextSound = currPlaylist.find((item, index) => {
      if (item._id === currSound?._id && index !== currPlaylist.length - 1) {
        return index;
      }
      return index;
    });

    setCurrSound(currPlaylist[nextSound]);
  }, [currSound, currPlaylist]);
*/
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

  const onVolumeUp = useCallback(() => {
    if (volume < 100 && audioRef.current) {
      setVolume((prev) => prev + volumeStep);
    }
  }, [volume]);

  const onVolumeDown = useCallback(() => {
    if (volume > 0 && audioRef.current) {
      setVolume((prev) => prev - volumeStep);
    }
  }, [volume]);

  const onShowPlaylistClick = useCallback(() => {
    setShowPlaylist((prev) => !prev);
  }, []);

  const onAudiuEnd = useCallback(() => {
    setIsPaused(true);
  }, [currSound]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPaused(false);
      audioRef.current.volume = volume / 100;
    }
  }, [currSound]);

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume / 100;
  }, [volume]);

  if (currSound) {
    return (
      <div className="w-full h-fit fixed flex flex-col bg-blue-200 bg-opacity-90 bottom-0 px-4 py-2">
        <div className="w-full h-fit flex">
          <div className="flex flex-col items-center w-fit mr-4">
            <Image
              className={`w-[90px] h-[90px] border border-black shadow-xl rounded-full ${
                isPaused ? "" : "animate-spin-slow"
              }`}
              width={100}
              height={100}
              alt={currSound.title}
              src={currSound.posterPath}
            />
            <span className="text-sm">{currSound.title}</span>
          </div>

          <div className="w-full">
            <div className="flex justify-between mb-5">
              <div>{getSoundTime(currentTime)}</div>
              <input
                type="range"
                max={audioRef.current?.duration}
                value={currentTime}
                onChange={onSetTime}
                className="w-full mx-1"
              />
              <div>{getSoundTime(audioRef.current?.duration)}</div>
            </div>
            <div className="w-full flex justify-between">
              <div className="w-full flex justify-around">
                <button>
                  <AiOutlineStepBackward size={40} />
                </button>
                <>
                  {isPaused ? (
                    <button onClick={onPlayClick}>
                      <FiPlay size={32} />
                    </button>
                  ) : (
                    <button onClick={onPauseClick}>
                      <AiFillPauseCircle size={40} />
                    </button>
                  )}
                </>
                <button>
                  <AiOutlineStepForward size={40} />
                </button>
              </div>
              <div className="flex items-center gap-2 mx-2">
                <button onClick={onVolumeDown}>
                  <BsFillVolumeOffFill size={30} />
                </button>
                <span className="w-10">{volume}%</span>
                <button onClick={onVolumeUp}>
                  <BsFillVolumeUpFill size={30} />
                </button>
              </div>
              <RiPlayListFill
                onClick={onShowPlaylistClick}
                className="mx-4 my-2 cursor-pointer"
                size={30}
              />
            </div>
          </div>

          <audio
            controls
            ref={audioRef}
            src={currSound.musicPath}
            className="hidden"
            onTimeUpdate={onTimeUpdate}
            onEnded={onAudiuEnd}
          />
        </div>
        {showPlaylist ? <Playlist /> : null}
      </div>
    );
  }

  return <div>no soutd set</div>;
};
