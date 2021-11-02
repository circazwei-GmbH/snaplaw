import * as Translator from '../post-translator';
import {BaseScreenDataInterface} from "../../../store/modules/contract/base-types";
import {CONTRACT_ROLE} from "../../../store/modules/contract/contract-roles";
import {CONTRACT_SCREEN_TYPES} from "../../../store/modules/contract/constants";
import {PAYMENT_FIELDS, PAYMENT_METHODS} from "../../../store/modules/contract/types";

const TEST_SCREEN: BaseScreenDataInterface = {
  type: CONTRACT_SCREEN_TYPES.PAYMENT,
  data: {
    [PAYMENT_FIELDS.PAYMENT_METHOD]: PAYMENT_METHODS.ALL
  }
}

describe("Post Translator", () => {
  it("screen data translator", () => {
    expect(Translator.screenDataTranslator(TEST_SCREEN, CONTRACT_ROLE.OWNER)).toEqual({
      screenType: TEST_SCREEN.type,
      [PAYMENT_FIELDS.SELLER_PAYMENT_METHOD]: TEST_SCREEN.data[PAYMENT_FIELDS.PAYMENT_METHOD],
      [PAYMENT_FIELDS.PAYMENT_METHOD]: TEST_SCREEN.data[PAYMENT_FIELDS.PAYMENT_METHOD]
    })
  })
})