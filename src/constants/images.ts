export const IMAGES_OPTIONS = {
  SMALL: "small",
  MIDDLE: "middle",
  PUBLIC: "public",
} as const;

export type IMAGES_OPTIONS_TYPE = (typeof IMAGES_OPTIONS)[keyof typeof IMAGES_OPTIONS];
