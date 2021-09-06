import {
  length,
  lengthCheckIfAnotherFieldHasSpecificValue,
  lengthCheckIfAnotherFieldIsTrue,
} from "../default";

describe("Length validation", () => {
  it("Should return undefined if length not set", () => {
    const lengthValidator = length("test");
    expect(lengthValidator("", {})).toEqual(undefined);
  });
  it("Should return error message on field is not valid", () => {
    const lengthValidator = length("test error", 5);
    expect(lengthValidator("test", {})).toEqual("test error");
    expect(lengthValidator("message", {})).toEqual(undefined);
  });
});

describe("lengthCheckIfAnotherFieldIsTrue", () => {
  it("Should return undefined on empty field", () => {
    const legntValidation = lengthCheckIfAnotherFieldIsTrue(
      "error message",
      1,
      "test"
    );
    expect(legntValidation("", {})).toEqual(undefined);
  });
  it("Should validate on enter field", () => {
    const legntValidation = lengthCheckIfAnotherFieldIsTrue(
      "error message",
      5,
      "test"
    );
    expect(legntValidation("", { test: "true" })).toEqual("error message");
    expect(legntValidation("test", { test: "true" })).toEqual("error message");
    expect(legntValidation("message", { test: "true" })).toEqual(undefined);
  });
});

describe("lengthCheckIfAnotherFieldHasSpecificValue", () => {
  it("Should return undefined on not valid income", () => {
    const lengthValidator = lengthCheckIfAnotherFieldHasSpecificValue(
      "error message",
      5,
      "test",
      "spValue"
    );
    expect(lengthValidator("test", {})).toEqual(undefined);
    expect(lengthValidator("test", { test: "notEqual" })).toEqual(undefined);
  });
  it("Should validate on match specific field", () => {
    const lengthValidator = lengthCheckIfAnotherFieldHasSpecificValue(
      "error message",
      5,
      "test",
      "spValue"
    );
    expect(lengthValidator("test", { test: "spValue" })).toEqual(
      "error message"
    );
    expect(lengthValidator("message", { test: "spValue" })).toEqual(undefined);
  });
});
