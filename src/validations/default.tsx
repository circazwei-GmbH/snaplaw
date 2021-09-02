import { FieldInterface } from "../components/features/forms/SignInForm";

export interface FormInterface {
  [fielName: string]: FieldInterface;
}

export interface ValidatorInterface {
  (text: string, form: FormInterface): string | undefined;
}

export interface ValidatorBuilderInterface {
  (message: string, option?: number | string): ValidatorInterface;
}

export interface ValidatiorWithCheckInterface {
  (message: string, option: number, fieldChecking: string): ValidatorInterface
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
  (message: string, target: string): ValidatorInterface =>
  (text: string, form: FormInterface) => {
    if (form[target].value === text) {
      return;
    }
    return message;
  };

export const lengthCheckIfAnotherFieldIsTrue: ValidatiorWithCheckInterface = (message, length, field) => (text: string | undefined, form: Record<string, unknown>) => {
  if (form && !form[field]) {
    return;
  }
  if (!text || text.length < length) {
    return message
  }
}