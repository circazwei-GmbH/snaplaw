import React, { useState, useEffect } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Pressable,
  Text,
  FlatList,
  TouchableOpacity,
  ListRenderItem,
} from "react-native";
import TopBar from "../../layouts/TopBar";
import CloseButton from "../../basics/buttons/CloseButton";
import TextField from "../../components/TextField";
import { DataListInterface } from "../../../store/modules/contract/types";

type SearchModalProps = {
  visible: boolean;
  title: string;
  data: DataListInterface[];
  onClose: () => void;
  onDone: (text: string) => void;
};

export default function SearchModal({
  visible,
  title,
  data,
  onClose,
  onDone,
}: SearchModalProps) {
  const [searchedList, setSearchedList] = useState<DataListInterface[]>(data);
  const [selectedItem, setSelectedItem] = useState("");

  const renderItem: ListRenderItem<DataListInterface> = ({ item }) => {
    const background =
      item.key === selectedItem ? { backgroundColor: "#EFF7FD" } : null;

    return (
      <TouchableOpacity
        onPress={() => setSelectedItem(item.key)}
        style={background}
      >
        <Text style={styles.listItemText}>{item.value}</Text>
      </TouchableOpacity>
    );
  };

  const handleClose = () => {
    onClose();
    setSearchedList(data);
    setSelectedItem("");
  };

  const handleDone = () => {
    onDone(selectedItem);
    setSearchedList(data);
  };

  const onSearch = (text: string) => {
    const filteredList = data.filter((item) => {
      if (item.key.toLowerCase() === "other") return true;

      for (let i = 0; i < text.length; i++) {
        if (item?.value[i]?.toLowerCase() !== text[i]?.toLowerCase())
          return false;
      }
      return true;
    });

    setSearchedList(filteredList);
  };

  useEffect(() => {
    setSearchedList(data);
  }, [data]);

  return (
    <View>
      <Modal visible={visible} transparent={true} animationType="none">
        <Pressable
          onPress={handleClose}
          style={styles.container}
          testID="ModalBackScreen"
        >
          <Pressable style={styles.searchModalContainer}>
            <View style={styles.contentContainer}>
              <TopBar
                leftButton={
                  <CloseButton
                    style={styles.closeButton}
                    onPress={handleClose}
                  />
                }
                pageName={title}
                rightButton={<Done onPress={handleDone} />}
                noPlaceholder
              >
                <View style={styles.listContainer}>
                  <View style={styles.searchInput}>
                    <TextField
                      onChangeFunction={onSearch}
                      onFocus={() => setSelectedItem("")}
                      search
                    />
                  </View>

                  <FlatList
                    data={searchedList}
                    renderItem={renderItem}
                    ItemSeparatorComponent={() => (
                      <View style={styles.separator}></View>
                    )}
                    extraData={searchedList}
                  />
                </View>
              </TopBar>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

interface DoneInterface {
  onPress: () => void;
}

const Done = ({ onPress }: DoneInterface) => {
  return (
    <Pressable onPress={onPress}>
      <Text style={styles.doneButton}>Done</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.7)",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  searchModalContainer: {
    width: "100%",
    height: "90%",
    paddingTop: 16,
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
  },
  doneButton: {
    fontSize: 17,
    color: "#1696E2",
    paddingRight: 20,
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: "#EFF7FD",
    marginHorizontal: 16,
  },
  listItemText: {
    fontSize: 16,
    color: "#202020",
    marginVertical: 11,
    paddingHorizontal: 16,
  },
  closeButton: {
    paddingLeft: 20,
  },
  searchInput: {
    paddingHorizontal: 16,
    marginBottom: 6,
  },
  contentContainer: {
    height: "100%",
  },
  listContainer: {
    flex: 1,
  },
});
