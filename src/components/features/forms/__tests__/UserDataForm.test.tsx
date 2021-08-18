import React from "react";
import { render } from "@testing-library/react-native";
import UserDataForm from "../contract/UserDataForm";
import { UserType } from "../../../../store/modules/profile/slice";

let form: UserType = {
  avatar: null,
  name: "testName",
  lastName: "testLastName",
  dateOfBirth: "testDate",
  email: "testMail",
  phone: "testPhone",
  address: "testAddress",
  postCode: "testPostCode",
};
let values = Object.values(form);

const onChange = (newValue: string, fieldName: any) => {
  return (form = {
    ...form,
    [fieldName]: newValue,
  });
};

describe("UserDataForm", () => {
  it("Should display text value from form", () => {
    const { getByDisplayValue } = render(
      <UserDataForm form={form} onChangeAction={onChange} />
    );

    for (let i = 1; i < values.length; i++) {
      expect(getByDisplayValue(`${values[i]}`)).toBeTruthy();
    }
  });
});
