import { useEffect } from "react";
import colors from "@utils/colors";
import { GeneralStatusBar } from "@components";
import { SignInScreen, ChatScreen } from "@screens";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { setProfile } from "@redux/Chat/chatActions";
import { useDispatch, useSelector } from "react-redux";
import { chatSelector } from "@redux/selectors";

export default function Main() {
  const dispatch = useDispatch();

  const { profile } = useSelector(chatSelector);

  useEffect(() => {
    const boot = async () => {
      const profile = await AsyncStorage.getItem("profile");

      if (profile) {
        dispatch(setProfile(JSON.parse(profile)));
      }
    };

    boot();
  }, []);

  return (
    <>
      <GeneralStatusBar
        backgroundColor={colors.mainColor}
        barStyle="light-content"
      />
      {!profile ? <SignInScreen /> : <ChatScreen />}
    </>
  );
}
