import React from "react";
import { TextInput } from "react-native";
import { commonStyles } from "@utils/styles";

export default function CustomTextInput({
  placeHolder,
  value,
  onChangeText,
  secureText = false,
  customStyle = undefined,
}) {
  let style = commonStyles.textInput;

  if (customStyle) {
    style = { ...style, ...customStyle };
  }
  return (
    <TextInput
      style={style}
      placeholder={placeHolder}
      placeholderTextColor={"#7f7f7f"}
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={secureText}
    />
  );
}
