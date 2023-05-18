import { atom } from "jotai";
import { User } from "@/types/user";
import { Music } from "@/types/music";

export const userAtom = atom<null | User>(null);
export const currentPlaylistAtom = atom<Array<Music>>([]);
export const currentSoundAtom = atom<Music | null>(null);
