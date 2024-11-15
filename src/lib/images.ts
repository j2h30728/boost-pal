export const IMAGES_OPTIONS = {
  SMALL: "small",
  MIDDLE: "middle",
} as const;

export const createUploadImageUrl = (
  imageUrl?: string,
  option?: (typeof IMAGES_OPTIONS)[keyof typeof IMAGES_OPTIONS]
) => {
  if (!imageUrl) {
    return "";
  }
  return option ? `${imageUrl}/${option}` : imageUrl;
};
