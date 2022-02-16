import {
  Button,
  Dimensions,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { auth, firebaseConfig, app } from "../Firebase/firbase";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import { PhoneAuthProvider, signInWithCredential } from "firebase/auth";
import { useState } from "react";
import MButtonSecondary from "../Components/UI/Buttons/MButtonSecondary";
import Colors from "../constants/Colors";
import Input from "../Components/UI/Input";
import { firestore, setDoc, doc } from "../Firebase/firbase";
import { useDispatch } from "react-redux";
import * as studentsAction from "../Store/Action/students";
import * as teachersAction from "../Store/Action/teachers";

const CodeConfirmScreen = (props) => {
  const verificationId = props.route.params.verificationId;
  const code = props.route.params.verificationCode;
  const userDetails = props.route.params.userDetails;
  const loginProfession = props.route.params.loginProfession;
  const from = props.route.params.from;

  console.log("Profession" + loginProfession);

  const dispatch = useDispatch();

  const [verificationCode, setVerificationCode] = useState();
  const [valid, setValid] = useState(false);
  const [touched, setTouched] = useState(false);

  const changeHandler = (text) => {
    setVerificationCode(text);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.strip}></View>
      <Text style={styles.title}>Attendance</Text>
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          label="Code"
          placeholderTextColor={Colors.bg}
          placeholder="123456"
          onChangeText={(text) => changeHandler(text)}
          keyboardType="numeric"
        />
        {!valid && touched && <Text>Invalid OTP</Text>}
        <MButtonSecondary
          style={styles.button}
          title="Confirm"
          onPress={async () => {
            try {
              const credential = PhoneAuthProvider.credential(
                verificationId,
                verificationCode
              );
              await signInWithCredential(auth, credential);
              console.log({ text: "Phone authentication successful 👍" });

              if (loginProfession === "Student") {
                console.log("Student");
                if (from === "register") {
                  dispatch(studentsAction.student(userDetails));
                }
                props.navigation.popToTop();
                props.navigation.replace("StudentHome");
                console.log("Student");
              } else if (loginProfession === "Teacher") {
                console.log("Teacher");
                if (from === "register") {
                  dispatch(teachersAction.teacher(userDetails));
                }
                props.navigation.popToTop();
                props.navigation.replace("TeacherHome");
                console.log("Teacher");
              }
            } catch (err) {
              console.log({ text: `Error: ${err.message}`, color: "red" });
            }
          }}
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
    height: Dimensions.get("screen").height * 2,
    width: Dimensions.get("window").width / 7,
  },
  title: {
    fontSize: 45,
    color: Colors.text,
    marginTop: Dimensions.get("window").height / 5,
    marginStart: 20,
    fontFamily: "poppins-medium",
  },
  container: {
    alignItems: "center",
    marginTop: Dimensions.get("window").height / 8,
  },
  button: {
    marginVertical: 25,
  },
  input: {
    backgroundColor: Colors.accent,
    width: Dimensions.get("window").width / 1.58,
    height: 48,
    marginVertical: 90,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 6,
    color: Colors.text,
    fontFamily: "poppins-regular",
    fontSize: 18,
    fontSize: 17,
  },
});

export default CodeConfirmScreen;
