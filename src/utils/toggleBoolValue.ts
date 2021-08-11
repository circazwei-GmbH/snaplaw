export const toggleBoolValue = (
  value: boolean,
  setValue: React.Dispatch<React.SetStateAction<boolean>>
) => {
  value ? setValue(false) : setValue(true);
};
