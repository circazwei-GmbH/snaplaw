import React, { useState } from "react";
import {
  GestureResponderEvent,
  StyleProp,
  StyleSheet,
  TextStyle,
  TouchableOpacity,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import TextFieldImitation from "../../components/TextFieldImitation";
import SearchModal from "../../features/Modals/SearchModal";
import { DataListInterface } from "../../../store/modules/contract/types";

type DropdownInputProps = {
  style?: StyleProp<TextStyle>;
  value?: string;
  placeholder: string;
  errorMessage?: string;
  data: DataListInterface[],
  onChangeFunction: (text: string) => void;
};

export default function DropdownInput({
  placeholder,
  errorMessage,
  value,
  onChangeFunction,
  data,
}: DropdownInputProps) {
  const [isSearchModalVisible, setSearchModalVisibility] = useState(false);

  const onDone = (text: string) => {
    onChangeFunction(text);
    setSearchModalVisibility(false);
  }

  return (
    <>
      <TouchableOpacity onPress={() => setSearchModalVisibility(true)} activeOpacity={0.9}>
        <TextFieldImitation
          placeholder={placeholder}
          errorMessage={errorMessage}
          value={value}
        >
          <SimpleLineIcons
            style={styles.icon}
            name="arrow-down"
            size={14}
            color="#668395"
          />
        </TextFieldImitation>
      </TouchableOpacity>
      <SearchModal
        visible={isSearchModalVisible}
        onClose={() => setSearchModalVisibility(false)}
        onDone={onDone}
        title={placeholder}
        data={data}
      />
    </>
  );
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
  },
});
