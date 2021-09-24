import en from "./en";
import de from "./de";
import { useAppSelector } from "../store/hooks";
import { LANGUAGE_ENGLISH } from "../store/modules/profile/constants";
import { translate } from "./Translator";

type TType = (key: string, args?: any) => string;

export class Translator {
  protected static instance: Translator | undefined;
  public tranlator: TType;

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
}

export function useI18n() {
  const singleton = Translator.getInstance();
  const currentLanguage = useAppSelector((state) => state.profile.language);
  const t: TType = (key: string, args?: any) =>
    translate(key, args, currentLanguage === LANGUAGE_ENGLISH ? en : de);
  singleton.setTranslator(t);
  return { t, currentLanguage };
}
