import { FieldInterface } from "../components/features/forms/SignInForm";
import { ServiceDataInterface } from "../store/modules/contract/work/services-data";

export interface FormInterface {
  [fielName: string]: FieldInterface;
}

export interface ValidatorFormInterface {
  (text: string, form: FormInterface): string | undefined;
}

export interface ValidatorArrayInterface {
  (array: any[]): any[];
}

export interface ValidatorInterface {
  (text: string, form: Record<string, unknown>): string | undefined;
}

export interface ValidatorBuilderInterface {
  (message: string, option?: number | string): ValidatorFormInterface;
}

export interface ValidatorArrayBuilderInterface {
  (message: string, option?: number | string): ValidatorArrayInterface;
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

export interface ValidationWithDateOrderCheckInterface {
  (
    message: string,
    firsteDateField: string,
    secondDateField: string
  ): ValidatorInterface;
}

export const length: ValidatorBuilderInterface = (message, length) => (
  text: string | undefined
) => {
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

export const match = (
  message: string,
  target: string
): ValidatorFormInterface => (text: string, form: FormInterface) => {
  if (form[target].value === text) {
    return;
  }
  return message;
};

export const lengthCheckIfAnotherFieldIsTrue: ValidatiorWithCheckInterface = (
  message,
  length,
  field
) => (text: string | undefined, form: Record<string, unknown>) => {
  if (form && !form[field]) {
    return;
  }
  if (!text || text.length < length) {
    return message;
  }
};

export const lengthCheckIfAnotherFieldHasSpecificValue: ValidationWithCheckOnScecificValueInterface = (
  message,
  length,
  field,
  specificValue
) => (text: string | undefined, form: Record<string, unknown>) => {
  if ((form && !form[field]) || form[field] !== specificValue) {
    return;
  }

  if (!text || text.length < length) {
    return message;
  }
};

export const correctDateOrderCheck: ValidationWithDateOrderCheckInterface = (
  message,
  firstDateField,
  secondFieldDate
) => (text: string | undefined, form: Record<string, unknown>) => {
  if ((form && !form[firstDateField]) || !form[secondFieldDate]) {
    return;
  }

  if (new Date(form[firstDateField]) > new Date(form[secondFieldDate])) {
    return message;
  }
};

export const validateArrayByDataLength: ValidatorArrayBuilderInterface = (
  message,
  len
) => (array: ServiceDataInterface[]) => {
  const errors = array.map((el => {
    const errorData = {};
    for (let [key, value] of Object.entries(el)) {
      const error = length(message, len)(value);
      if (error) {
        errorData[key] = error;
      }
    }
    if (Object.keys(errorData).length !== 0) {
      return errorData;
  }
  }));
  const isError = errors.find(error => error);
  
  return isError ? errors : undefined;
};
