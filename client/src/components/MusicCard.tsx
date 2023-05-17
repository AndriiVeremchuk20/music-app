import { currentPlaylistAtom, currentSoundAtom } from "@/atom";
import { Music } from "@/types/music";
import { useAtom } from "jotai";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { FaPlay } from "react-icons/fa";
import { AiFillPauseCircle } from "react-icons/ai";
import { useMutation } from "@tanstack/react-query";
import musicApi from "@/api/actions/music";

interface PropMusicCard {
  music: Music;
  bgColor?: string;
}

export const MusicCard: React.FC<PropMusicCard> = ({ music, bgColor }) => {
  const [showPlay, setShowPlay] = useState<boolean>(false);
  const [isPlayed, setIsPlayed] = useState<boolean>(false);
  const timeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [currPlaylist, setCurrPalaylist] = useAtom(currentPlaylistAtom);

  const getMusicPlaylist = useMutation(musicApi.getMusicId, {
    onSuccess(data) {
      setCurrPalaylist(data.data);
    },
    onError(error) {
      console.log(error);
    },
  });

  const onPlayClick = useCallback(() => {
    console.log("music played");
    setIsPlayed(true);
    getMusicPlaylist.mutate({ id: music._id });
  }, []);

  const onPauseClick = useCallback(() => {
    setIsPlayed(false);
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
          {isPlayed ? (
            <AiFillPauseCircle
              className="m-auto text-3xl fill-white cursor-pointer hover:scale-110"
              onClick={onPauseClick}
            />
          ) : (
            <FaPlay
              onClick={onPlayClick}
              className="m-auto text-3xl fill-white cursor-pointer hover:scale-110"
            />
          )}
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
