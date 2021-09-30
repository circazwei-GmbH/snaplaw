import React from "react";
import {fireEvent, render} from "@testing-library/react-native";
import DescriptionPhotos from "../DescriptionPhotos";
import {PRODUCT_DESCRIPTION_FIELDS} from "../../../store/modules/contract/purchase/product-description";
import {buildMediaSource} from "../../../utils/helpers";
import {MEDIA_TYPE, MediaType} from "../../../services/media";

const PHOTOS_PROP: MediaType[] = [{type: MEDIA_TYPE.IMAGE, uri: "test/file"}];

jest.mock("../../features/Modals/ProductDescriptionModal", () => {
  const React = require("react");
  return (props: any) =>
    React.createElement("View", { ...props, testID: "ModalMock" });
});

describe("DescriptionPhotos", () => {
  it("Should display photos", () => {
    const { getByTestId } = render(
      <DescriptionPhotos
        photos={PHOTOS_PROP}
        fieldName={PRODUCT_DESCRIPTION_FIELDS.accessoriesPhotos}
      />
    );
    expect(getByTestId("ImageTouchableWrapper")).toBeTruthy();
    expect(getByTestId("Image")).toBeTruthy();
    expect(getByTestId("Image").props.source).toEqual(
      buildMediaSource(PHOTOS_PROP[0].uri)
    );
  });
  it("Should loading", () => {
    const { getByTestId, queryByTestId } = render(
      <DescriptionPhotos
        photos={PHOTOS_PROP}
        fieldName={PRODUCT_DESCRIPTION_FIELDS.accessoriesPhotos}
      />
    );
    fireEvent(getByTestId("Image"), "onLoadStart");
    expect(getByTestId("ImageLoadingIndicator")).toBeTruthy();
    fireEvent(getByTestId("Image"), "onLoadEnd");
    expect(queryByTestId("ImageLoadingIndicator")).not.toBeTruthy();
  });
  it("Should display modal", () => {
    const { getByTestId } = render(
      <DescriptionPhotos
        photos={PHOTOS_PROP}
        fieldName={PRODUCT_DESCRIPTION_FIELDS.accessoriesPhotos}
      />
    );
    expect(getByTestId("ModalMock").props.modalVisible).not.toBeTruthy();
    fireEvent.press(getByTestId("ImageTouchableWrapper"));
    expect(getByTestId("ModalMock").props.modalVisible).toBeTruthy();
    expect(getByTestId("ModalMock").props.media).toEqual(PHOTOS_PROP[0]);
  });
  it("Should call handler on delete", () => {
    const handler = jest.fn();
    const { getByTestId } = render(
      <DescriptionPhotos
        photos={PHOTOS_PROP}
        fieldName={PRODUCT_DESCRIPTION_FIELDS.accessoriesPhotos}
        onPressDelete={handler}
      />
    );
    expect(getByTestId("IamgeDeleteIcon")).toBeTruthy();
    fireEvent.press(getByTestId("IamgeDeleteIcon"));
    expect(handler).toBeCalledWith(
      PHOTOS_PROP[0].uri,
      PRODUCT_DESCRIPTION_FIELDS.accessoriesPhotos
    );
  });
});
