// config
import APP_CONFIG from "@config/index";

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

export const userIdAtom = atom("");
