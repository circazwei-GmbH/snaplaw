import { FieldInterface } from "../components/features/forms/SignInForm";

export interface FormInterface {
  [fielName: string]: FieldInterface;
}

export interface ValidatorFormInterface {
  (text: string, form: FormInterface): string | undefined;
}

export interface ValidatorInterface {
  (text: string, form: Record<string, unknown>): string | undefined;
}

export interface ValidatorBuilderInterface {
  (message: string, option?: number | string): ValidatorFormInterface;
}

export interface ValidatiorWithCheckInterface {
  (message: string, option: number, fieldChecking: string): ValidatorInterface;
}

export interface ValidationWithCheckOnScecificValueInterface {
  (
    message: string,
    option: number,
    fieldChecking: string,
    scpecificValue: unknown
  ): ValidatorInterface;
}

export const length: ValidatorBuilderInterface =
  (message, length) => (text: string | undefined) => {
    if (!length) {
      return;
    }
    if (!text || text.length < length) {
      return message;
    }
  };

export const email: ValidatorBuilderInterface = (message) => (text: string) => {
  if (text.search(/^[^@]+@{1,1}[^@]+\.[^.@\d]{2,}$/)) {
    return message;
  }
};

export const match =
  (message: string, target: string): ValidatorFormInterface =>
  (text: string, form: FormInterface) => {
    if (form[target].value === text) {
      return;
    }
    return message;
  };

export const lengthCheckIfAnotherFieldIsTrue: ValidatiorWithCheckInterface =
  (message, length, field) =>
  (text: string | undefined, form: Record<string, unknown>) => {
    if (form && !form[field]) {
      return;
    }
    if (!text || text.length < length) {
      return message;
    }
  };

export const lengthCheckIfAnotherFieldHasSpecificValue: ValidationWithCheckOnScecificValueInterface =

    (message, length, field, specificValue) =>
    (text: string | undefined, form: Record<string, unknown>) => {
      if ((form && !form[field]) || form[field] !== specificValue) {
        return;
      }
      if (!text || text.length < length) {
        return message;
      }
    };
