export interface ValidatorInterface {
    (message: string, length?: number): ((text: string) => string | undefined)
}

export const length: ValidatorInterface = (message, length) => (text: string) => {
    if (!length) {
        return;
    }
    if (text.length < length) {
        return message
    }
}

export const email: ValidatorInterface = (message) => (text: string) => {
    if (text.search(/^[^@]+@{1,1}[^@]+\.[^.@\d]{2,}$/)) {
        return message
    }
}