import React from 'react';
import {render} from "@testing-library/react-native";
import ContractTypeCard from "../ContractTypeCard";

const CARD_TEXT = 'card-text';

describe('ContractTypeCard', () => {
    it('Text should be displayed', () => {
        const { getByText, getByTestId } = render(<ContractTypeCard image={require('../../../../assets/purchase_contract.png')} title={CARD_TEXT} />)
        expect(getByText(CARD_TEXT)).toBeTruthy()
        expect(getByTestId(`Image.${CARD_TEXT}`)).toBeTruthy()
    })
})