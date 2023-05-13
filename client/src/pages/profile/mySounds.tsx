import music from "@/api/actions/music";
import { userAtom } from "@/atom";
import { useMutation } from "@tanstack/react-query";
import { useAtom } from "jotai";
import React, { useEffect } from "react";

const MySoundsPage = () => {
  const [user] = useAtom(userAtom);
  const getUserMusicMutation = useMutation(music.getUserMusic, {
    onSuccess(data) {
      console.log(data);
    },
    onError(error) {
      console.log(error);
    },
  });

  useEffect(() => {
    if (user) {
      getUserMusicMutation.mutate({ id: user._id });
    }
  }, [user]);

  return <div>mySounds</div>;
};

export default MySoundsPage;
