import React, { useRef, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  Alert,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { firebase } from "@utils/firebaseConfig";
import { useStateIfMounted } from "use-state-if-mounted";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { setProfile } from "@redux/Chat/chatActions";
import { useDispatch, useSelector } from "react-redux";
import { chatSelector } from "@redux/selectors";

import { commonStyles, chatStyles } from "@utils/styles";
import colors from "@utils/colors";

import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { CustomTextInput, MessageItem } from "@components";

const ChatScreen = () => {
  const dispatch = useDispatch();
  const { profile } = useSelector(chatSelector);
  const [message, setMessage] = useStateIfMounted("");
  const [messages, setMessages] = useStateIfMounted([]);

  const flatListRef = useRef();

  useEffect(() => {
    scrollToEnd();
    const messagesRef = firebase.database().ref("/messages");
    const onReceive = (data) => {
      const msgData = data.val();
      let msgs = [];
      for (let msg in msgData) {
        msgs.push({ key: msg, val: msgData[msg] });
      }
      setMessages(msgs);
      scrollToEnd();
    };

    messagesRef.on("value", onReceive, (error) =>
      console.log("On Receive Error.", error)
    );
    return () => messagesRef.off("value", onReceive);
  }, []);

  const scrollToEnd = () => {
    setTimeout(() => {
      try {
        flatListRef.current.scrollToEnd({ animated: true });
      } catch (error) {}
    }, 100);
  };

  const sendMessage = () => {
    if (!message.length) {
      return;
    }
    const messagesRef = firebase.database().ref("/messages");

    firebase
      .database()
      .ref("users/" + profile.id)
      .once("value")
      .then((data) => {
        const userData = data?.val();
        if (userData && userData?.email?.length) {
          const now = new Date();

          const day = now.getDate().toString().padStart(2, "0");
          const month = (now.getMonth() + 1).toString().padStart(2, "0");
          const year = now.getFullYear();

          const hours = now.getHours().toString().padStart(2, "0");
          const minutes = now.getMinutes().toString().padStart(2, "0");
          const seconds = now.getSeconds().toString().padStart(2, "0");

          const currentdate = `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;

          const messageData = {
            text: message,
            email: userData.email,
            userId: profile.id,
            timestamp: currentdate,
          };
          messagesRef.push(messageData);
          setMessage("");
          scrollToEnd();
        } else {
          Alert.alert("Error", "User not found.");
          logout();
        }
      })
      .catch((error) => {
        Alert.alert("Error", "An error occurred.");
        logout();
        console.log("Send Message Error..", error);
      });
  };

  const logout = () => {
    firebase
      .database()
      .ref("users/" + profile?.id)
      .remove()
      .then(async () => {
        logoutHelper();
      })
      .catch((error) => {
        logoutHelper();
        console.log("Logout Error..", error);
      });
  };

  const logoutHelper = async () => {
    await AsyncStorage.removeItem("profile");
    dispatch(setProfile(undefined));
  };

  return (
    <SafeAreaView
      style={[
        commonStyles.safeAreaView,
        { backgroundColor: colors.chatBackground },
      ]}
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <View style={chatStyles.header}>
          <Text style={chatStyles.headerText}>Chat Room</Text>
          <TouchableOpacity
            style={chatStyles.logoutButton}
            onPress={() => {
              Alert.alert("Are you sure?", "You will log out.", [
                {
                  text: "Log out",
                  onPress: () => {
                    logout();
                  },
                },
                {
                  text: "Cancel",
                  style: "cancel",
                },
              ]);
            }}
          >
            <MaterialIcons
              name="logout"
              size={25}
              color={colors.chatHeaderBg}
            />
          </TouchableOpacity>
        </View>
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => (
            <MessageItem item={item} userid={profile?.id} />
          )}
          keyExtractor={(item) => item.key}
          ListEmptyComponent={
            <Text style={chatStyles.notFound}>Start a conversation</Text>
          }
        />
        <View style={chatStyles.inputBackground}>
          <CustomTextInput
            placeHolder={"Type your message here..."}
            value={message}
            onChangeText={(e) => {
              setMessage(e);
            }}
            customStyle={chatStyles.inputCustomStyle}
          />
          <TouchableOpacity
            onPress={() => {
              sendMessage();
            }}
            style={chatStyles.sendButton}
          >
            <MaterialCommunityIcons name="send" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default ChatScreen;
