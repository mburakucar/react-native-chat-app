# Chat App

A simple chat application made using React Native, Expo and Firebase.


## Installation

- Clone repository to your computer.
  - Using HTTPS
    ```
    git clone https://github.com/mburakucar/react-native-chat-app.git
    ```
- Install modules using ```yarn install```

## Run the App

- Start Expo server using ```npx expo start```
- Choose which platform you want to run it on. (Press 'i' key for iOS, 'a' key for Android)

## Installation Stages of Firebase to The Project

- A new project was created from the Firebase console.
- A web application was added to the project and the necessary configuration settings were made for the connection.
- In the 'Authentication' section of the Firebase console, anonymous authentication was enabled.
- A database was created in the 'Realtime Database' section to store the messages sent and user information.
- The 'firebase' package was installed in the project for Firebase connection.
- A file named 'firebaseConfig.js' was added to the project to introduce the Firebase settings to the project.
```js
    import firebase from "firebase/compat/app";
    import "firebase/compat/auth";
    import "firebase/compat/database";
    
    const firebaseConfig = {
      apiKey: "YOUR_APIKEY",
      ...
    };
    
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    
    export { firebase };

```
- The 'initializeApp' function was called with the defined configuration settings, and the application was connected to Firebase.
- The firebase object exported from 'firebaseConfig.js' was used to implement the necessary operations for logging into the application in SignInScreen.js, and the necessary operations for chatting in ChatScreen.js.
- The steps carried out in the 'handleLogin' function that allows the user below to log in are as follows:
  - The validity of the entered email is checked.
  - It is checked whether there is a user who has logged in with the same email in the Firebase database, and if so, it is shown as a warning to the user.
  - Login is performed using Firebase's 'signInAnonymously' function, and after logging in, if the function successfully completes the process, it returns a user ID.
  - This user ID is then saved in the 'users' inside the database, and also in the redux store and async storage within the application.
  - If it is not completed successfully, it is shown as a warning to the user.
```js
const handleLogin = () => {
    if (!email?.length) {
      Alert.alert("Error", "Enter your email.");
      return;
    } else if (!validateEmail(email)) {
      Alert.alert("Error", "Enter valid email.");
      return;
    }
    setLoading(true);

    firebase.database().ref("users").orderByChild("email").equalTo(email).once("value", (data) => {
        if (data.exists()) {
          Alert.alert("Error", "Already logged in with the same email.");
          setLoading(false);
        } else {
          firebase.auth().signInAnonymously().then(async (authData) => {
              firebase.database().ref("users/" + authData.user.uid).set({
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
```
- The steps carried out in the function that retrieves both previous and current messages sent from the database are as follows:
  - Within the 'componentDidMount' feature of useEffect, the "messages" section in the database is taken as a reference.
  - The live messaging feature is activated with the reference's 'on' function, and the 'onReceive' function is defined.
  - The 'onReceive' function assigns every message sent and received in real-time to the messages variable inside the component.
  - In the 'componentWillUnmount' feature of useEffect, the live messaging feature is deactivated when the component is closed.
```js
  useEffect(() => {
    const messagesRef = firebase.database().ref("/messages");
    const onReceive = (data) => {
      const msgData = data.val();
      let msgs = [];
      for (let msg in msgData) {
        msgs.push({ key: msg, val: msgData[msg] });
      }
      setMessages(msgs);
    };

    messagesRef.on("value", onReceive, (error) =>
      console.log("On Receive Error.", error)
    );
    return () => messagesRef.off("value", onReceive);
  }, []);
```
- The steps of the function that allows messages to be sent and stored in the database are as follows:
  - It is checked whether the entered message is empty.
  - The 'messages' section in the database is taken as a reference.
  - It is checked whether the logged-in user is active in the database; if not, a warning is shown to the user, and they are redirected to the login screen.
  - The data to be saved in the database is defined, and the message is stored in the database using the 'push' function of the reference. The moment the message is saved, the 'onReceive' function from the previous description activates, and the message stored in the database is displayed on the screen.
```js
  const sendMessage = () => {
    if (!message.length) {
      return;
    }
    const messagesRef = firebase.database().ref("/messages");

    firebase.database().ref("users/" + profile.id).once("value").then((data) => {
        const userData = data?.val();
        if (userData && userData?.email?.length) {
          const messageData = {
            ...
          };
          messagesRef.push(messageData);
          setMessage("");
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
```
- The steps of the function that enables users to log out are as follows:
  - The reference of the relevant user in the 'users' section of the database is retrieved, and the 'remove' function of the reference is executed.
  - This function deletes the user-related data from the database, but the messages previously sent by the user continue to be stored.
  - The 'logoutHelper' function also clears the redux store data and async storage data within the application.
```js
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
```
