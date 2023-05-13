import { atom } from "jotai";
import { User } from "@/types/user";
import { Music } from "@/types/music";

export  const userAtom = atom<null | User>(null);
export const currentSoundAtom = atom<null | Music>(null);
