import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../../../store/hooks";
import { CONTRACT_SCREEN_TYPES } from "../../../../store/modules/contract/constants";
import {
  ServicesDataScreenInterface,
  SERVICES_DATA_FIELDS,
} from "../../../../store/modules/contract/work/services-data";
import { setScreenData } from "../../../../store/modules/contract/slice";
import { useI18n } from "../../../../translator/i18n";
import CalendarInput from "../../../basics/inputs/CalendarInput";
import TextField from "../../../components/TextField";
import { validateScreen } from "../../../../store/modules/contract/action-creators";
import { TouchableOpacity } from "react-native-gesture-handler";

const initialService = {
  [SERVICES_DATA_FIELDS.SERVICE_TITLE]: "",
  [SERVICES_DATA_FIELDS.SERVICE_DATE]: "",
};

export default function ServicesForm() {
  const { t } = useI18n();
  const dispatch = useDispatch();

  const servicesScreen = useAppSelector(
    (state) =>
      state.contract.currentContract?.screens.find(
        (screen) => screen.type === CONTRACT_SCREEN_TYPES.SERVICES
      ) as ServicesDataScreenInterface | undefined
  );
  const screenErrors = useAppSelector((state) =>
    state.contract.contractErrors
      ? state.contract.contractErrors[CONTRACT_SCREEN_TYPES.SERVICES]
      : undefined
  );
  const contractType = useAppSelector(
    (state) => state.contract.currentContract?.type
  );

  const onChangeAction = (
    value: string,
    fieldName: SERVICES_DATA_FIELDS,
    index: number
  ) => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SERVICES,
        fieldName: SERVICES_DATA_FIELDS.SERVICES_DATA,
        value: servicesScreen?.data[
          SERVICES_DATA_FIELDS.SERVICES_DATA
        ].map((service, serviceIndex) =>
          index === serviceIndex ? { ...service, [fieldName]: value } : service
        ),
      })
    );
    if (
      screenErrors?.[SERVICES_DATA_FIELDS.SERVICES_DATA][index]?.[fieldName] &&
      contractType
    ) {
      dispatch(validateScreen(contractType, CONTRACT_SCREEN_TYPES.SERVICES));
    }
  };

  const addService = () => {
    dispatch(
      setScreenData({
        screenType: CONTRACT_SCREEN_TYPES.SERVICES,
        fieldName: SERVICES_DATA_FIELDS.SERVICES_DATA,
        value: [
          ...servicesScreen?.data[SERVICES_DATA_FIELDS.SERVICES_DATA],
          initialService,
        ],
      })
    );
  };

  useEffect(() => {
    if (!servicesScreen) {
      dispatch(
        setScreenData({
          screenType: CONTRACT_SCREEN_TYPES.SERVICES,
          fieldName: SERVICES_DATA_FIELDS.SERVICES_DATA,
          value: [initialService],
        })
      );
    }
  }, [servicesScreen]);

  return (
    <View style={styles.container}>
      {servicesScreen?.data[SERVICES_DATA_FIELDS.SERVICES_DATA].map(
        (service, index) => (
          <View key={index}>
            <Text style={styles.title}>
              {t(
                `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.SERVICES}.serviceTitle`
              )}
            </Text>
            <TextField
              placeholder={t(
                `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.SERVICES}.placeholders.service`
              )}
              errorMessage={
                screenErrors?.[SERVICES_DATA_FIELDS.SERVICES_DATA][index]?.[
                  SERVICES_DATA_FIELDS.SERVICE_TITLE
                ]
              }
              value={service[SERVICES_DATA_FIELDS.SERVICE_TITLE]}
              onChangeFunction={(newValue) =>
                onChangeAction(
                  newValue,
                  SERVICES_DATA_FIELDS.SERVICE_TITLE,
                  index
                )
              }
            />
            <Text style={styles.title}>
              {t(
                `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.SERVICES}.dateTitle`
              )}
            </Text>
            <CalendarInput
              date={service[SERVICES_DATA_FIELDS.SERVICE_DATE] || ""}
              dateHandler={(newValue) =>
                onChangeAction(
                  newValue,
                  SERVICES_DATA_FIELDS.SERVICE_DATE,
                  index
                )
              }
              errorMessage={
                screenErrors?.[SERVICES_DATA_FIELDS.SERVICES_DATA][index]?.[
                  SERVICES_DATA_FIELDS.SERVICE_DATE
                ]
              }
              placeholder={t(
                `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.SERVICES}.placeholders.date`
              )}
            />
          </View>
        )
      )}
      <TouchableOpacity style={styles.button} onPress={addService}>
        <Text style={styles.buttonText}>
          {t(
            `contracts.${contractType}.${CONTRACT_SCREEN_TYPES.SERVICES}.button`
          )}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    width: "100%",
    paddingHorizontal: 16,
  },
  title: {
    paddingTop: 16,
    fontSize: 16,
    fontFamily: "P",
  },
  button: {
    alignSelf: "center",
  },
  buttonText: {
    fontFamily: "OS",
    fontSize: 16,
    color: "#1696E2",
    textDecorationLine: "underline",
    marginTop: 24,
  },
});
