import { Music } from "@/types/music";
import React from "react";
import { MusicCard } from "./MusicCard";

interface PropMusicList {
  musicList: Array<Music>;
}

const colors = [
  "bg-red-500",
  "bg-blue-500",
  "bg-green-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
];

export const MusicList: React.FC<PropMusicList> = ({ musicList }) => {
  return (
    <div className="grid grid-cols-9 gap-y-8 grid-flow-row-dense">
      {musicList.map((item, index) => (
        <MusicCard
          key={item._id}
          music={item}
          bgColor={colors[index % colors.length]}
        />
      ))}
    </div>
  );
};
