type TranslateType = (key: string, args: any, config: any) => string;
export const translate: TranslateType = (key, args, config) => {
  const splitedKey = key.split(".");
  let currentText = config;
  for (let i = 0; i < splitedKey.length; i++) {
    if (!currentText[splitedKey[i]]) {
      // throw new Error(`key: ${splitedKey[i]} are empty`);
      currentText = key;
      break;
    }
    currentText = currentText[splitedKey[i]];
  }
  
  if (!args) {
    return currentText;
  }

  const argsNames = Object.keys(args);

  for (let i = 0; i < argsNames.length; i++) {
    currentText = currentText.replace(`%{${argsNames[i]}}`, args[argsNames[i]]);
  }

  return currentText;
};
