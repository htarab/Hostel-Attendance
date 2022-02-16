import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from "react-native";
import MButtonSecondary from "../Components/UI/Buttons/MButtonSecondary";
import MButtonPrimary from "../Components/UI/Buttons/MButtonPrimary";
import Colors from "../constants/Colors";
import firebase from "firebase/compat";
import { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "../Firebase/firbase";
// import * as Google from "expo-google-app-auth";

const StartingScreen = (props) => {
  const auth = getAuth();

  useEffect(() => {
    console.log("state = unknown (until the callback is invoked)");
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        console.log("state = definitely signed in");
        props.navigation.navigate("StudentHome");
      } else {
        console.log("state = definitely signed out");
      }
    });
  }, []);

  signInWithGoogleAsync = async () => {
    try {
      const result = await Google.logInAsync({
        behavior: "web",
        androidClientId:
          "738247550669-ns06675f88tmc1et14cujfeq7pt9hapu.apps.googleusercontent.com",
        //iosClientId: YOUR_CLIENT_ID_HERE,
        scopes: ["profile", "email"],
      });

      if (result.type === "success") {
        return result.accessToken;
      } else {
        return { cancelled: true };
      }
    } catch (e) {
      return { error: true };
    }
  };

  firebase.auth().onAuthStateChanged((user) => {
    if (user) {
      props.navigation.navigate("Login");
      console.log("Log In " + user);
    } else {
      console.log("Not Log In " + user);
    }
  });

  return (
    <View style={styles.screen}>
      <View style={styles.strip}></View>
      <Text style={styles.title}>Attendance</Text>
      <View style={styles.container}>
        <MButtonPrimary
          style={styles.button}
          title="Login"
          color={Colors.primary}
          onPress={() =>  props.navigation.navigate("Login")}
        />
        <MButtonSecondary
          style={styles.button}
          title="Register"
          color={Colors.primary}
          onPress={() => props.navigation.navigate("Register")}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: Colors.bg,
  },
  strip: {
    backgroundColor: Colors.primary,
    position: "absolute",
    height: Dimensions.get("screen").height,
    width: Dimensions.get("window").width / 7,
  },
  title: {
    fontSize: 45,
    color: Colors.text,
    marginVertical: Dimensions.get("window").height / 5,
    marginStart: 20,
    fontFamily: "poppins-medium",
  },
  container: {
    alignItems: "center",
    marginTop: Dimensions.get("window").height / 5.5,
  },
  button: {
    marginVertical: 25,
  },
});

export default StartingScreen;
