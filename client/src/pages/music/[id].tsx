import musicApi from "@/api/actions/music";
import { currentPlaylistAtom, currentSoundAtom } from "@/atom";
import { Player } from "@/components/Player";
import { Playlist } from "@/components/Playlist";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

import React, { useEffect } from "react";

const MusicPage = () => {
  const [currentPlaylist, setCurrPalaylist] = useAtom(currentPlaylistAtom);
  const [currentSound, setCurrentSound] = useAtom(currentSoundAtom);

  const router = useRouter();
  const { id } = router.query;

  const getMusicPlaylistMutation = useMutation(musicApi.getMusicId, {
    onSuccess(data) {
      setCurrPalaylist(data.data);
      setCurrentSound(data.data[0]);
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    if (id) {
      getMusicPlaylistMutation.mutate({ id: id as string });
    }
  }, [id]);

  return (
    <div className="pt-[100px] min-h-screen max-h-fit">
      <div className="flex">
        <div className="mx-10">
          <Player />
        </div>
        <div className="w-[500px]">
          <Playlist musicList={currentPlaylist} />
        </div>
      </div>
    </div>
  );
};

export default MusicPage;
