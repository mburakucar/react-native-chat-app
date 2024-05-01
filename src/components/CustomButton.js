import React from "react";
import { ActivityIndicator, Text, TouchableOpacity } from "react-native";
import { commonStyles } from "@utils/styles";
import colors from "@utils/colors";

export default function CustomButton({
  text,
  onPress,
  loading = false,
  textColor = "#fff",
  backgroundColor = colors.mainColor,
  borderColor = colors.mainColor,
  customWidth = "100%",
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        commonStyles.buttons,
        {
          backgroundColor: backgroundColor,
          borderColor: borderColor,
          width: customWidth,
        },
      ]}
    >
      <Text style={[commonStyles.buttonText, { color: textColor }]}>
        {loading ? <ActivityIndicator color={textColor} /> : text}
      </Text>
    </TouchableOpacity>
  );
}
