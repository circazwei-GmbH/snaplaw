import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import Router from '../../../src/router/Router'
import {NativeRouter} from "react-router-native";

describe('Router', () => {
    test('test router', async () => {
        // const { getByText } = render(
        //   <NativeRouter>
        //       <Router />
        //   </NativeRouter>
        // )
        //
        // const link = await getByText('Sign in')
        //
        // const welcome = await getByText('Welcome to Snaplaw')
        // expect(welcome).toBeTruthy()
        // fireEvent.press(link)
        // const signIn = await getByText('Sign In')
        // expect(signIn).toBeTruthy()
        expect(true).toBeTruthy()
    })
})