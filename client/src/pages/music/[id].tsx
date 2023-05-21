import musicApi from "@/api/actions/music";
import { currentPlaylistAtom } from "@/atom";
import { Playlist } from "@/components/Playlist";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import { useRouter } from "next/router";

import React, { useEffect } from "react";

const MusicPage = () => {
  const [currentPlaylist, setCurrPalaylist] = useAtom(currentPlaylistAtom);

  const router = useRouter();
  const { id } = router.query;

  const getMusicPlaylistMutation = useMutation(musicApi.getMusicId, {
    onSuccess(data) {
      setCurrPalaylist(data.data);
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
    <div className="bg-slate-500 flex flex-col pt-[100px]">
      <Playlist musicList={currentPlaylist} />
    </div>
  );
};

export default MusicPage;
