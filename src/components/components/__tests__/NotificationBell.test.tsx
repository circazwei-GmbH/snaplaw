import React from "react";
import {render} from "@testing-library/react-native";
import NotificationBell from "../NotificationBell";

describe('NotificationBell', () => {
    it('Should be pink dot', () => {
        const { getByTestId } = render(<NotificationBell />)
        expect(getByTestId('bell.pinkDot')).toBeTruthy()
    })
})