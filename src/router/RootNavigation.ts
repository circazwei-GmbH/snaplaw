import { createRef } from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef = createRef();

export function navigate(name: string, params?: any) {
    navigationRef.current?.navigate(name, params)
}

export function pop() {
    navigationRef.current?.dispatch(StackActions.pop())
}