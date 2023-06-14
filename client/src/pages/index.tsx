import musicApi from "@/api/actions/music";
import { currentPlaylistAtom, currentSoundAtom, userAtom } from "@/atom";
import { Menu } from "@/components/Menu";
import { MusicCard } from "@/components/MusicCard";
import { MusicList } from "@/components/MusicList";
import { Player } from "@/components/Player";
import { Playlist } from "@/components/Playlist";
import { Music } from "@/types/music";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const [user] = useAtom(userAtom);
  const [musicList, setMusicList] = useState<Array<Music>>([]);
  const [currentPlaylist] = useAtom(currentPlaylistAtom);

const [currSound] = useAtom(currentSoundAtom);

  const getMusicMutations = useMutation(musicApi.getMusic, {
    onSuccess(data) {
      console.log(data);
      setMusicList(data.data);
    },
    onError(e) {
      console.log(e);
    },
  });

  useEffect(() => {
    getMusicMutations.mutate();
  }, [user]);

  return (
    <div className="w-full min-h-screen max-h-auto pt-28">
      <div className="ml-4 col-span-2">
        <MusicList musicList={musicList} />
      </div>
   <Player/>
    </div>
  );
};

export default Home;
