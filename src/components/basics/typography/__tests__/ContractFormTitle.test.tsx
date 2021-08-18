import React from "react";
import {render} from "@testing-library/react-native";
import ContractFormTitle from "../ContractFormTitle";

describe('ContractFormTitle', () => {
    it('Should display title', () => {
        const TITLE = 'test-title'
        const { getByText } = render(<ContractFormTitle title={TITLE} />)
        expect(getByText(TITLE)).toBeTruthy()
    })
})