import { currentSoundAtom } from "@/atom";
import { Music } from "@/types/music";
import Image from "next/image";
import { useAtom } from "jotai";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";

interface PropMusicCard {
  music: Music;
  bgColor?: string;
}

export const MusicCard: React.FC<PropMusicCard> = ({ music, bgColor }) => {
  const [currSound, setCurrSound] = useAtom(currentSoundAtom);
  const [showPlay, setShowPlay] = useState<boolean>(false);
  const [isPlayed, setIsPlayed] = useState<boolean>(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  const onPlayClick = useCallback(() => {
    console.log("music played");
    setCurrSound(music);
  }, []);

  const handleMouseHover = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
    }
    const timeoutId = setTimeout(() => setShowPlay(true), 100);
    timeout.current = timeoutId;
  };

  const handleMouseLeave = () => {
    if (timeout.current) {
      clearTimeout(timeout.current);
      timeout.current = null;
    }
    const timeoutId = setTimeout(() => setShowPlay(false), 100);
    timeout.current = timeoutId;
  };

  return (
    <div
      onMouseOut={handleMouseHover}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseHover}
      className={`w-48 h-48 flex flex-col rounded-md bg-center bg-cover bg-no-repeat shadow-xl shadow-black`}
      style={{ backgroundImage: `url(${music.posterPath})` }}
    >
      {showPlay ? (
        <div className="flex flex-col w-full h-full bg-neutral-900 bg-opacity-40 rounded-t-md">
          <FaPlay
            onClick={onPlayClick}
            className="m-auto text-3xl fill-white cursor-pointer hover:scale-110"
          />
        </div>
      ) : null}
      <div
        className={`${
          bgColor ? bgColor : "bg-neutral-700"
        } text-white font-medium px-3 py-1 ${
          showPlay ? "rounded-b-md" : "rounded-t-md"
        } `}
      >
        {music.title}
      </div>
    </div>
  );
};
