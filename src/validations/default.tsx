import {FieldInterface} from "../components/features/forms/SignInForm";

export interface FormInterface {
    [fielName: string]: FieldInterface
}

export interface ValidatorInterface {
    (text: string, form: FormInterface): string | undefined
}

export interface ValidatorBuilderInterface {
    (message: string, option?: number | string): ValidatorInterface
}

export const length: ValidatorBuilderInterface = (message, length) => (text: string) => {
    if (!length) {
        return;
    }
    if (text.length < length) {
        return message
    }
}

export const email: ValidatorBuilderInterface = (message) => (text: string) => {
    if (text.search(/^[^@]+@{1,1}[^@]+\.[^.@\d]{2,}$/)) {
        return message
    }
}

export const match = (message: string, target: string): ValidatorInterface => (text: string, form: FormInterface) => {
    if (form[target].value === text) {
        return;
    }
    return message
}