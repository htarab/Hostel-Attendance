import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import * as Font from "expo-font";

//Firebase
import * as firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import StartingScreen from "./Screens/StartingScreen";
//Firebase

//Colors
import Colors from "./constants/Colors";

//AppLoading
import AppLoading from "expo-app-loading";

//Navigation
import { NavigationContainer } from "@react-navigation/native";
import StackNavigation from "./Navigation/StackNavigation";
import { useState } from "react";

import TeacherHomeScreen from './Screens/Teachers/TeacherHomeScreen'

const firebaseConfig = {
  apiKey: "AIzaSyDml1CZx6jb2u8Z3ETf4fpt-j5erFBS3gY",
  authDomain: "hostelattendancereact.firebaseapp.com",
  projectId: "hostelattendancereact",
  storageBucket: "hostelattendancereact.appspot.com",
  messagingSenderId: "738247550669",
  appId: "1:738247550669:web:e0cab4659d5f175029ab84",
  measurementId: "G-YNGHNJFGE9",
};

//Redux
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import studentsReducer from "./Store/Reducer/students";
import teachersReducer from "./Store/Reducer/teachers";

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const rootReducers = combineReducers({
  students: studentsReducer,
  teachers: teachersReducer,
});

const fetchFonts = () => {
  return Font.loadAsync({
    "poppins-bold": require("./assets/Fonts/Poppins-Bold.ttf"),
    "poppins-italic": require("./assets/Fonts/Poppins-Italic.ttf"),
    "poppins-medium": require("./assets/Fonts/Poppins-Medium.ttf"),
    "poppins-regular": require("./assets/Fonts/Poppins-Regular.ttf"),
    "poppins-thin": require("./assets/Fonts/Poppins-Thin.ttf"),
  });
};

const store = createStore(rootReducers);

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setFontLoaded(true)}
        onError={() => console.log("Error")}
      />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <StackNavigation />
        {/* <TeacherHomeScreen/> */}
        <StatusBar style="inverted" />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.bg,
    justifyContent: "center",
  },
  strip: {
    backgroundColor: Colors.primary,
    position: "absolute",
    height: Dimensions.get("screen").height * 2,
    width: Dimensions.get("window").width / 7,
  },
  title: {
    position: "absolute",
    fontSize: 45,
    color: Colors.text,
    marginVertical: Dimensions.get("window").height / 5,
    marginStart: 20,
    fontFamily: "poppins-medium",
  },
});
