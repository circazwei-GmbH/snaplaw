import React, { useState } from "react";
import {
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";
import TextFieldImitation from "../../components/TextFieldImitation";
import SearchModal from "../../features/Modals/SearchModal";
import { DataListInterface } from "../../../store/modules/contract/types";

type DropdownInputProps = {
  placeholder: string;
  data: DataListInterface[],
  onChangeFunction: (text: string) => void;
  errorMessage?: string;
  value?: string;
};

export default function DropdownInput({
  placeholder,
  data,
  onChangeFunction,
  errorMessage,
  value,
}: DropdownInputProps) {
  const [isSearchModalVisible, setSearchModalVisibility] = useState(false);

  const onDone = (text: string) => {
    onChangeFunction(text);
    setSearchModalVisibility(false);
  }

  return (
    <>
      <TouchableOpacity testID={`DropdownInput.${placeholder}`} onPress={() => setSearchModalVisibility(true)} activeOpacity={0.9}>
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
