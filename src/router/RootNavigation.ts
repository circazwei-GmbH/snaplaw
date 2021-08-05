import { createRef } from 'react';
import { StackActions } from '@react-navigation/native';

export const navigationRef = createRef();

export function navigate(name: string, params?: any) {
    navigationRef.current?.navigate(name, params)
}

export function pop(count?: number | undefined) {
    navigationRef.current?.dispatch(StackActions.pop(count))
}

export function popToTop() {
    navigationRef.current?.dispatch(StackActions.popToTop())
}