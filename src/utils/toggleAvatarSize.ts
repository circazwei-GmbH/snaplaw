export const toggleAvatarSize = (
  size: string,
  setSize: React.Dispatch<React.SetStateAction<string>>
) => {
  size === "big" ? setSize("small") : setSize("big");
};
