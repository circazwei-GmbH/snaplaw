type TranslateType = (key: string, config: any) => string;
export const translate: TranslateType = (key: string, config: any) => {
    const splitedKey = key.split('.')
    let currentText = config
    for (let i = 0; i < splitedKey.length; i++) {
        currentText = currentText[splitedKey[i]];
    }

    return currentText
}