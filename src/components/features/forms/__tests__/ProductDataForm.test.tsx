import React from "react";
import { render } from "@testing-library/react-native";
import ProductDataForm from "../contract/ProductDataForm";
import { ProductDataType } from "../../../../store/modules/contract/types";

let form: ProductDataType = {
  subject: "subjectTest",
  producer: "producerTest",
  designation: "designation",
  serial: "serialTest",
};
let values = Object.values(form);

const onChange = (newValue: string, fieldName: any) => {
  return (form = {
    ...form,
    [fieldName]: newValue,
  });
};

describe("ProductDataForm", () => {
  it("Should display text value from form", () => {
    const { getByDisplayValue } = render(
      <ProductDataForm form={form} onChangeAction={onChange} />
    );

    values.forEach((item) => {
      expect(getByDisplayValue(`${item}`)).toBeTruthy();
    });
  });
});
