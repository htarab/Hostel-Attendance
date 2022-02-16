import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import StartingScreen from "../Screens/StartingScreen";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import RegisterScreen from "../Screens/RegisterScreen";
import LoginScreen from "../Screens/LoginScreen";
import CodeConfirmScreen from "../Screens/CodeConfirmScreen";
import StudentHomeScreen from "../Screens/StudentsScreen/StudentHomeScreen";
import TeacherHomeScreen from "../Screens/Teachers/TeacherHomeScreen";
// import TestScreen2 from "../Screens/TestScreen2";
import Colors from "../constants/Colors";
import { AntDesign } from "@expo/vector-icons";
import ReviewScreen from "../Screens/Teachers/ReviewScreen";

const Stack = createNativeStackNavigator();

const StackNavigation = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, animation: "slide_from_right" }}
    >
      {/* <Stack.Screen name="Start" component={TestScreen2} /> */}
      <Stack.Screen name="Start" component={StartingScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="CodeConfirm" component={CodeConfirmScreen} />
      <Stack.Screen
        name="StudentHome"
        component={StudentHomeScreen}
        options={{
          title: "Hostel Attendance",
          headerLeft: () => null,
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTitleStyle: {
            fontFamily: "poppins-medium",
          },
          statusBarAnimation: "slide",
        }}
      />
      <Stack.Screen
        name="TeacherHome"
        component={TeacherHomeScreen}
        options={({ navigation }) => ({
          title: "Hostel Attendance",
          headerShown: true,
          headerRight: () => (
            <TouchableOpacity onPress={() => navigation.navigate("Review")}>
              <AntDesign name="table" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTitleStyle: {
            fontFamily: "poppins-medium",
          },
          statusBarAnimation: "slide",
        })}
      />
      <Stack.Screen
        name="Review"
        component={ReviewScreen}
        options={({ navigation }) => ({
          title: "Review",
          headerShown: true,
          headerStyle: {
            backgroundColor: Colors.primary,
          },
          headerTitleStyle: {
            fontFamily: "poppins-medium",
          },
          statusBarAnimation: "slide",
        })}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StackNavigation;
