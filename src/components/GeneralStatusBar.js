import { View, StatusBar } from "react-native";
import { commonStyles } from "@utils/styles";

const GeneralStatusBar = ({ backgroundColor, ...props }) => (
  <View style={[commonStyles.statusBar, { backgroundColor }]}>
    <StatusBar translucent backgroundColor={backgroundColor} {...props} />
  </View>
);
export default GeneralStatusBar;
