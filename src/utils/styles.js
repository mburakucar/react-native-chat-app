import { StyleSheet, Platform, StatusBar } from "react-native";
import colors from "@utils/colors";

const STATUSBAR_HEIGHT = Platform.OS === "ios" ? 60 : StatusBar.currentHeight;

export const commonStyles = StyleSheet.create({
  statusBar: {
    height: STATUSBAR_HEIGHT,
  },
  safeAreaView: {
    flex: 1,
    backgroundColor: "white",
  },
  textInput: {
    width: "100%",
    backgroundColor: colors.textInputsBackground,
    borderColor: colors.textInputsBorder,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 10,
    fontSize: 13,
  },
  buttons: {
    flexShrink: 1,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
  },
});

export const loginStyles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  headText: {
    textAlign: "center",
    fontSize: 40,
    fontWeight: "bold",
  },
  itemContainer: {
    paddingVertical: 10,
    alignItems: "center",
    width: "100%",
  },
  buttonContainer: {
    paddingVertical: 30,
    width: "100%",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
});

export const chatStyles = StyleSheet.create({
  header: {
    backgroundColor: colors.chatHeaderBg,
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerText: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  logoutButton: {
    backgroundColor: "white",
    borderRadius: 100,
    padding: 5,
  },
  messageItem: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    maxWidth: "70%",
    borderRadius: 10,
    marginVertical: 5,
    marginHorizontal: 20,
    alignSelf: "flex-start",
  },
  userText: {
    fontSize: 15,
    fontWeight: "bold",
    color: "white",
  },
  dateText: {
    fontSize: 12,
    fontWeight: "bold",
    color: colors.date,
    marginBottom: 5,
  },
  myMessage: {
    backgroundColor: colors.myMessageColor,
    alignSelf: "flex-end",
  },
  otherMessage: {
    backgroundColor: colors.otherMessageColor,
  },
  messageText: {
    fontSize: 16,
    color: "white",
  },
  notFound: {
    textAlign: "center",
    marginTop: 10,
    fontSize: 16,
    fontStyle: "italic",
    color: colors.notFound,
  },

  inputBackground: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    paddingBottom: Platform.OS == "ios" ? 30 : 10,
    backgroundColor: colors.inputContainerBackground,
  },
  inputCustomStyle: {
    borderWidth: 0,
    borderRadius: 20,
    flexShrink: 1,
    height: 50,
    backgroundColor: colors.inputBackground,
    color: "white",
  },
  sendButton: {
    backgroundColor: colors.sendButton,
    padding: 10,
    borderRadius: 100,
    marginLeft: 10,
  },
});
