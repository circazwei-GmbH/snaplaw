import { setLanguage, initialState } from "../slice";
import Reduser from "../slice";
import { LANGUAGE_ENGLISH, LANGUAGE_GERMANY } from "../constants";

describe("Profile Slicer", () => {
  it("Should set language", () => {
    expect(Reduser(undefined, setLanguage(LANGUAGE_ENGLISH))).toEqual({
      ...initialState,
      language: LANGUAGE_ENGLISH,
    });

    expect(
      Reduser(
        {
          ...initialState,
          language: LANGUAGE_ENGLISH,
        },
        setLanguage(LANGUAGE_ENGLISH)
      )
    ).toEqual({
      ...initialState,
      language: LANGUAGE_GERMANY,
    });

    expect(
      Reduser(
        {
          ...initialState,
          language: LANGUAGE_GERMANY,
        },
        setLanguage(LANGUAGE_GERMANY)
      )
    ).toEqual({
      ...initialState,
      language: LANGUAGE_ENGLISH,
    });
  });
});
