import React from "react";
import { View, Text } from "react-native";
import { chatStyles } from "@utils/styles";

export default function MessageItem({ item, userid }) {
  return (
    <View
      style={[
        chatStyles.messageItem,
        item.val.userId === userid
          ? chatStyles.myMessage
          : chatStyles.otherMessage,
      ]}
    >
      <Text style={chatStyles.userText}>
        {item.val.userId === userid ? "You" : item.val.email}
      </Text>
      <Text style={chatStyles.dateText}>{item.val.timestamp}</Text>
      <Text style={chatStyles.messageText}>{item.val.text}</Text>
    </View>
  );
}
