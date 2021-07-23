import {FieldInterface} from "../components/features/forms/SignInForm";

export const formFieldFill = (fieldName: string, text: string, form: any) => {
    const preparedForm = {
        ...form,
        [fieldName]: {
            ...form[fieldName],
            value: text,
        }
    };
    if (preparedForm[fieldName].error) {
        preparedForm[fieldName] = validate(preparedForm[fieldName])
    }
    return preparedForm
}

export const validate = (stateField: FieldInterface) => {
    const localField = stateField;

    for(let i = 0; i < localField.validators.length; i++) {
        const validator = localField.validators[i];
        const result = validator(localField.value)
        if (result) {
            localField.error = result;
            localField.displayError = true;
        } else {
            localField.error = '';
            localField.displayError = false;
        }
    }

    return localField
}