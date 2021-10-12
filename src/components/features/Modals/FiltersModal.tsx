import React, { useState,useEffect } from "react";
import { Modal, StyleSheet, View, Text, Pressable, TouchableHighlight } from "react-native";
import dayjs from "dayjs";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { useI18n } from "../../../translator/i18n";
import Button from "../../basics/buttons/Button";
import TextButton from "../../basics/buttons/TextButton";
import Checkbox from "../../basics/checkboxes/Checkbox";
import CalendarInput from "../../basics/inputs/CalendarInput";
import DatePickerModal from "./DatePickerModal";
import { CONTRACT_TYPES } from "../../../store/modules/contract/constants";
import { setContractsListFilters } from "../../../store/modules/contract/slice";
import { requestContractsList } from "../../../store/modules/contract/action-creators";
import { CONTRACT_LIST_STATE } from "../../../store/modules/contract/types";
import { TouchableOpacity } from "react-native-gesture-handler";
import DatePickerModalCustom from "./DatePickerModalCustom";

type FiltersModalProps = {
  visible: boolean;
  onClose: () => void;
  switchState: CONTRACT_LIST_STATE;
};

export default function FiltersModal({ visible, onClose, switchState }: FiltersModalProps) {
  const filters = useAppSelector(state => state.contract.smartFilters);
  const dispatch = useAppDispatch();
  const { t } = useI18n();

  const [selectedCategories, setSelectedCategories] = useState<CONTRACT_TYPES[]>(filters.types);
  const [selectedDate, setSelectedDate] = useState(filters.date);
  const [datePickerOpened, setDatePickerOpened] = useState(false);
  
  const contractTypes = {
    [CONTRACT_TYPES.CAR]: t("homepage.contract_types.car"),
    [CONTRACT_TYPES.PURCHASE]: t("homepage.contract_types.purchase"),
    [CONTRACT_TYPES.WORK]: t("homepage.contract_types.work"),
    [CONTRACT_TYPES.FREE]: t("homepage.contract_types.free"),
    [CONTRACT_TYPES.RENTAL]: t("homepage.contract_types.rental"),
  };
  
  const onChangeSelectionCategory = (category: CONTRACT_TYPES) => {
    const categoryIndex = selectedCategories.indexOf(category);
    if (categoryIndex === -1) {
      setSelectedCategories([...selectedCategories, category])
    } else {
      const copy = [...selectedCategories];
      copy.splice(categoryIndex, 1);
      setSelectedCategories(copy)
    }
  }

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedDate("");
  }

  const onConfirmDate = (date: string) => {
    setSelectedDate(date)
    setDatePickerOpened(false);
  }

  const applyFilters = () => {
    dispatch(setContractsListFilters({
      types: selectedCategories,
      date: selectedDate,
    }));
    dispatch(requestContractsList(switchState, true));
    onClose();
  }

  const onEmptyPlaceTouch = () => {
    setSelectedCategories(filters.types);
    setSelectedDate(filters.date);
    onClose();
  }

  useEffect(() => {
    setSelectedCategories(filters.types);
    setSelectedDate(filters.date);
  }, [filters])
  
  return (
    <View>
      <Modal visible={visible} transparent={true} animationType="none">
        <Pressable onPress={onEmptyPlaceTouch} style={styles.container} testID="ModalBackScreen">
          <Pressable style={styles.filtersModalContainer}>
            <View>
              <Text style={styles.title}>{t("my_contracts.smart_filters.modal_name")}</Text>
              <Text style={styles.subtitle}>{t("my_contracts.smart_filters.modal_subtitle")}</Text>
                
              <View style={styles.filtersformContainer}>
                <View style={styles.filtersformTopBar}>
                    <Text style={styles.containersTitle}>{t("my_contracts.smart_filters.categories")}</Text>
                    <TextButton
                      text={t("my_contracts.smart_filters.clear_all")}
                      onPress={clearFilters}
                      type="right"
                    />
                </View>

                <View>
                   {Object.entries(contractTypes).map(([key, value]) => (
                      <Checkbox 
                        isChecked={selectedCategories.indexOf(key) !== -1}
                        onChange={() => onChangeSelectionCategory(key)}
                        text={value}
                        style={styles.checkbox}
                        key={key}
                        testID={"TypeCheckbox" + key}
                      />
                   ))}
                </View>

                <View style={styles.dateContainer}>
                    <Text style={styles.containersTitle}>{t("my_contracts.smart_filters.by_date")}</Text>
                    <CalendarInput
                      style={styles.dateInput}
                      date={dayjs(selectedDate).isValid() ? dayjs(selectedDate).format("DD.MM.YYYY") : selectedDate}
                      dateHandler={() => setDatePickerOpened(true)}
                    />
                </View>
              </View>
            </View>
            
            <View style={styles.applyButtonContainer}>
              <Button
                text={t("my_contracts.smart_filters.apply")}
                type="primary"
                shadowNone
                onPress={applyFilters}
              />
            </View>
          </Pressable>
        </Pressable>
        <DatePickerModalCustom 
          onCancelDate={() => setDatePickerOpened(false)}
          onConfirmDate={onConfirmDate}
          datePickerOpened={datePickerOpened}
          setDatePickerOpened={setDatePickerOpened}
          setedDate={selectedDate}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "rgba(0,0,0,0.7)",
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  filtersModalContainer: {
    width: "100%",
    padding: 16,
    paddingBottom: 25,
    backgroundColor: "#fff",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32 ,
  },
  title: {
      fontSize: 20,
      fontWeight: "600",
      textAlign: "center",
      marginBottom: 6,
      color: "#202020",
  },
  subtitle: {
      textAlign: "center",
      fontSize: 13,
      color: "#909090",
  },
  filtersformContainer: {
    paddingTop: 15,
  },
  filtersformTopBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  containersTitle: {
    textTransform: "uppercase",
    fontSize: 13,
    fontWeight: "600",
    color: "#909090"
  },
  checkbox: {
    marginTop: 13,
  },
  dateContainer: {
    paddingTop: 35,
  },
  dateInput: {
    marginTop: 18,
    marginBottom: 27,
  },
  applyButtonContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  datePickerContainerWrapper: {
    justifyContent: "center",
  },
  datePickerContainer: {
    padding: 20,
    backgroundColor: "#fff",
    alignItems: "flex-end",
  },
  dataPickerButtonsContainer: {
    flexDirection: "row",
  },
  dataPickerButton: {
    marginLeft: 20,
  },
  dataPickerButtonText: {
    fontSize: 16,
    textTransform: "uppercase",
  }
});
