import { Music } from "@/types/music";
import React, { useEffect, useState } from "react";
import { PlaylistItem } from "./PlaylistItem";
import { Player } from "./Player";
import { currentSoundAtom } from "@/atom";
import { useAtom } from "jotai";

interface PropPlaylist {
  musicList: Array<Music>;
}

export const Playlist: React.FC<PropPlaylist> = ({ musicList }) => {
  const [currSound] = useAtom(currentSoundAtom);
  return (
    <div>
      {currSound ? <Player sound={currSound} /> : null}
      {musicList.map((item) => (
        <PlaylistItem key={item._id} music={item} />
      ))}
    </div>
  );
};
