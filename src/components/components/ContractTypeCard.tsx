import React from "react";
import {
  Text,
  StyleSheet,
  Image,
  Pressable,
  GestureResponderEvent,
} from "react-native";
import { useAppSelector } from "../../store/hooks";
import { LANGUAGE_ENGLISH } from "../../store/modules/profile/constants";

type ContractTypeCardProps = {
  image: any;
  title: string;
  imageMargin?: object;
  onPress?: (event: GestureResponderEvent) => void;
};

export default function ContractTypeCard({
  image,
  title,
  onPress,
  imageMargin,
}: ContractTypeCardProps) {
  const currentLanguage = useAppSelector((state) => state.profile.language);

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Image source={image} testID={`Image.${title}`} style={imageMargin} />
      <Text
        style={[
          styles.text,
          currentLanguage === LANGUAGE_ENGLISH ? styles.widthEng : null,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    width: "48%",
    height: 220,
    backgroundColor: "#EFF7FD",
    margin: 3,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E1EEF6",
    borderRadius: 10,
  },
  text: {
    marginTop: 12,
    textAlign: "center",
    color: "#202020",
    fontSize: 18,
    fontFamily: "OS",
  },
  widthEng: {
    width: 110,
  },
});
