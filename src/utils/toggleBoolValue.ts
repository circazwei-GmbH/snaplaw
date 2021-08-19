export const toggleBoolValue = (
  value: boolean,
  setValue: React.Dispatch<React.SetStateAction<boolean>>
): void => {
  value ? setValue(false) : setValue(true);
};
