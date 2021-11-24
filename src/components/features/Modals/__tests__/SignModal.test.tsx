import { fireEvent, render } from "@testing-library/react-native";
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { MEDIA_TYPE } from "../../../../services/media";
import { signContract } from "../../../../store/modules/contract/action-creators";
import { SIGN_LOADER } from "../../../../store/modules/contract/purchase/sign";
import { addToWaiter } from "../../../../store/modules/main/slice";
import { uploadMedia } from "../../../../store/modules/media/action-creators";
import { MEDIA_FOLDERS } from "../../../../store/modules/media/constants";
import SignModal from "../SignModal";

const initialState = {
    main: {
        waiter: {
            events: [],
            message: "",
        }
    }
}

const actions = jest.fn();
const reduser = (state = initialState, action: any) => {
  actions(action);
  return state
};

const store = createStore(reduser);

describe("SignModal", () => {
    it("Should dispatch actions on takeSignature", () => {
        const handler = jest.fn();
        const { getByTestId } = render(
          <Provider store={store}>
            <SignModal
              visible
              onClose={handler}
            />
          </Provider>
        );
        fireEvent(getByTestId("Signature"), "onChange");
        
        fireEvent.press(getByTestId("sign_form.buttons.create"));
        expect(actions).toBeCalledWith(addToWaiter({ event: SIGN_LOADER }));
    });
});
