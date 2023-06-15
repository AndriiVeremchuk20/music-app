import { Music } from "@/types/music";
import React from "react";
import { PlaylistItem } from "./PlaylistItem";
import { currentPlaylistAtom, currentSoundAtom } from "@/atom";
import { useAtom } from "jotai";

export const Playlist: React.FC = () => {
const [currPlaylist] = useAtom(currentPlaylistAtom);
return (
    <div>
      {currPlaylist.map((item) => (
        <PlaylistItem key={item._id} music={item} />
      ))}
    </div>
  );
};
