// config
import APP_CONFIG from "@config/index";

// utils
import getUserIdFromtoken from "@utils/getUserIdFromtoken";

// funcs
import { getCookie, setCookie } from "cookies-next";
import { atom } from "jotai";

const _paletteAtom = atom("");

export const paletteAtom = atom(
  (get) => {
    const _palette = get(_paletteAtom);
    const palette = getCookie(APP_CONFIG.paletteName);
    return _palette ?? palette ?? "blue";
  },
  (get, set, newPalette) => {
    setCookie(APP_CONFIG.paletteName, newPalette);
    set(_paletteAtom, newPalette as string);
  }
);

const _userIdAtom = atom<string | undefined>(undefined);

export const userIdAtom = atom(
  (get) => {
    const token = getCookie(APP_CONFIG.tokenName);
    const userId = getUserIdFromtoken(token) ?? "";
    const _userId = get(_userIdAtom);

    return _userId ?? userId;
  },
  (get, set, newToken) => {
    set(_userIdAtom, newToken as string);
  }
);
