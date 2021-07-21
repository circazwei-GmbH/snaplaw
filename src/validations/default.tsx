export interface ValidatorInterface {
    (text: string): string | undefined
}

export interface ValidatorBuilderInterface {
    (message: string, length?: number): ValidatorInterface
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