import React from "react";
import {
  View,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Text,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { firebase } from "@utils/firebaseConfig";
import { useStateIfMounted } from "use-state-if-mounted";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { setProfile } from "@redux/Chat/chatActions";
import { useDispatch } from "react-redux";

import { CustomTextInput, CustomButton } from "@components";
import { commonStyles, loginStyles } from "@utils/styles";
import colors from "@utils/colors";

import { Entypo } from "@expo/vector-icons";

const SignInScreen = () => {
  const [email, setEmail] = useStateIfMounted("");
  const [loading, setLoading] = useStateIfMounted(false);

  const dispatch = useDispatch();

  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return regex.test(email);
  };

  const handleLogin = () => {
    if (!email?.length) {
      Alert.alert("Error", "Enter your email.");
      return;
    } else if (!validateEmail(email)) {
      Alert.alert("Error", "Enter valid email.");
      return;
    }
    setLoading(true);

    firebase
      .database()
      .ref("users")
      .orderByChild("email")
      .equalTo(email)
      .once("value", (data) => {
        if (data.exists()) {
          Alert.alert("Error", "Already logged in with the same email.");
          setLoading(false);
        } else {
          firebase
            .auth()
            .signInAnonymously()
            .then(async (authData) => {
              firebase
                .database()
                .ref("users/" + authData.user.uid)
                .set({
                  email: email,
                });
              setLoading(false);
              const profileData = { id: authData.user.uid, email: email };
              await AsyncStorage.setItem(
                "profile",
                JSON.stringify(profileData)
              );
              dispatch(setProfile(profileData));
            })
            .catch((error) => {
              setLoading(false);
              console.log(error);
              Alert.alert("Error", "Failed to log in.");
            });
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log("User Check Error..", error);
        Alert.alert("Error", "An error occurred.");
      });
  };

  return (
    <SafeAreaView style={commonStyles.safeAreaView}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={loginStyles.container}>
          <View style={loginStyles.itemContainer}>
            <Entypo name="chat" size={50} color={colors.mainColor} />
            <Text style={loginStyles.headText}>Chat App</Text>
          </View>
          <View style={loginStyles.itemContainer}>
            <CustomTextInput
              placeHolder={"Email"}
              value={email}
              onChangeText={(e) => {
                setEmail(e);
              }}
            />
          </View>
          <View style={loginStyles.buttonContainer}>
            <CustomButton
              text={"Enter Chat Room"}
              onPress={() => {
                if (!loading) {
                  handleLogin();
                }
              }}
              loading={loading}
            />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SignInScreen;
