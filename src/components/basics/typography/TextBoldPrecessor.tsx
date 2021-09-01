import { StyleSheet, Text } from "react-native";
import React from "react";

type MessageHandlerType = {
  message: string;
};

export default function TextBoldPrecessor({ message }: MessageHandlerType) {
  const splitedMessage = message.split("^");
  if (splitedMessage.length === 1) {
    return <Text style={styles.messageText}>{message}</Text>;
  }
  return (
    <Text style={styles.messageText}>
      {splitedMessage.map((msg, index) => (
        <Text
          key={index}
          style={[
            styles.messageText,
            index % 2 ? styles.messageTextBold : null,
          ]}
        >
          {msg}
        </Text>
      ))}
    </Text>
  );
}

const styles = StyleSheet.create({
  messageText: {
    fontFamily: "P",
    fontSize: 17,
    textAlign: "center",
  },
  messageTextBold: {
    fontFamily: "OS-B",
  },
});
