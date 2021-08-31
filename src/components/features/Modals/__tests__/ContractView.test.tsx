import React from 'react'
import {createStore} from "@reduxjs/toolkit";
import {fireEvent, render} from "@testing-library/react-native";
import ContractView from "../ContractView";
import {Provider} from "react-redux";
import {LANGUAGE_ENGLISH} from "../../../../store/modules/profile/constants";
import {setMessage, setModal} from "../../../../store/modules/main/slice";
import {navigationPopToTop} from "../../../../store/modules/main/action-creators";
import {buildPDFSource} from "../../../../services/contract";

const initialState = {
  contract: {
    currentContract: {
      id: 'testId'
    }
  },
  profile: {
    language: LANGUAGE_ENGLISH
  }
}
const actions = jest.fn()
const reduser = (state = initialState, action: unknown) => {
  actions(action)
  return initialState
}

const store = createStore(reduser)

describe('ContractView', () => {
  it('Should dispaly button', () => {
    const { getByText, getByTestId } = render(
      <Provider store={store} >
        <ContractView visible={true} onClose={jest.fn()} />
      </Provider>
    )
    expect(getByText('contracts.pdf_view.edit')).toBeTruthy()
    expect(getByText('contracts.pdf_view.save')).toBeTruthy()
    expect(getByTestId('react-native-pdf').props.source).toEqual(buildPDFSource(initialState.contract.currentContract.id, LANGUAGE_ENGLISH))
  })
  it('Should trigger cancel on edit button', () => {
    const handler = jest.fn()
    const { getByText } = render(
      <Provider store={store} >
        <ContractView visible={true} onClose={handler} />
      </Provider>
    )
    fireEvent.press(getByText('contracts.pdf_view.edit'))
    expect(handler).toBeCalled()
  })
  it('Should dispatch event on click save button', () => {
    const handler = jest.fn()
    const { getByText } = render(
      <Provider store={store} >
        <ContractView visible={true} onClose={handler} />
      </Provider>
    )
    fireEvent.press(getByText('contracts.pdf_view.save'))
    expect(actions).toBeCalledWith(setModal({
      message: 'contracts.messages.found_in_pregress_folder',
      actions: [{
        name: 'contracts.confirmation_modal.buttons.ok',
        action: navigationPopToTop()
      }]
    }))
    expect(handler).toBeCalled()
  })
  it('Should dispatch error on error', () => {
    const handler = jest.fn()
    const { getByTestId } = render(
      <Provider store={store} >
        <ContractView visible={true} onClose={handler} />
      </Provider>
    )
    fireEvent(getByTestId('react-native-pdf'),'onError')
    expect(actions).toBeCalledWith(setMessage('errors.abstract'))
    expect(handler).toBeCalled()
  })
})