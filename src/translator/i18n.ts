import en from "./en";
import de from "./de";
import { useAppSelector } from "../store/hooks";
import { LANGUAGE_ENGLISH } from "../store/modules/profile/constants";
import { translate } from "./Translator";
import { LanguageType } from "../store/modules/profile/slice";

export type TType = (key: string, args?: any) => string;

export class Translator {
  protected static instance: Translator | undefined;
  public tranlator: TType;
  public language: LanguageType = LANGUAGE_ENGLISH;

  constructor() {
    this.tranlator = (key, args) => translate(key, args, en);
  }

  static getInstance() {
    if (this.instance) {
      return this.instance;
    }

    this.instance = new Translator();
    return this.instance;
  }

  public trans(key: string, args?: any): string {
    return this.tranlator(key, args);
  }

  public getTranslator() {
    return this.tranlator;
  }

  public setTranslator(translator: TType) {
    this.tranlator = translator;
  }

  public setLanguage(lang: LanguageType) {
    this.language = lang;
  }

  public getLanguage() {
    return this.language;
  }
}

export function useI18n() {
  const singleton = Translator.getInstance();
  const currentLanguage = useAppSelector((state) => state.profile.language);
  const t: TType = (key: string, args?: any) =>
    translate(key, args, currentLanguage === LANGUAGE_ENGLISH ? en : de);
  singleton.setTranslator(t);
  singleton.setLanguage(currentLanguage ?? LANGUAGE_ENGLISH);
  return { t, currentLanguage };
}
