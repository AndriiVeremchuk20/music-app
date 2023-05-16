import { atom } from "jotai";
import { User } from "@/types/user";
import { Music } from "@/types/music";
import { atomWithStorage } from "jotai/utils";

export const userAtom = atom<null | User>(null);
export const currentPlaylistAtom = atom<Array<Music>>([]);
