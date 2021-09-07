import React from 'react'
import {render} from "@testing-library/react-native";
import AbstractList from "../AbstractList";
import {View} from "react-native";

const ItemComponent = () => (<View testID="TestItemID" />)

describe('AbstractList', () => {
  it('Should display loader', () => {
    const { queryByText, getByTestId } = render(<AbstractList messageOnEmpty="empty" elements={[]} listItem={ItemComponent} isLoading />)
    expect(getByTestId('AbstractListLoader')).toBeTruthy();
    expect(queryByText('empty')).not.toBeTruthy()
  })
  it('Should display message', () => {
    const { getByText, queryByTestId } = render(<AbstractList messageOnEmpty="empty" elements={[]} listItem={ItemComponent} />)
    expect(queryByTestId('AbstractListLoader')).not.toBeTruthy();
    expect(getByText('empty')).toBeTruthy()
  })
  it('Should display elements on not empty data', () => {
    const { queryAllByTestId } = render(<AbstractList messageOnEmpty="empty" elements={[{id: 't'},{id: 'r'}]} listItem={ItemComponent} />)
    expect(queryAllByTestId('TestItemID')).toHaveLength(2)
  })
})