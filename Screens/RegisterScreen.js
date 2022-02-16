import { Header } from "@react-navigation/stack";
import { useState, useRef, useEffect } from "react";
import {
  BackHandler,
  Dimensions,
  KeyboardAvoidingView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Animated,
  TouchableNativeFeedback,
  FlatList,
  Platform,
  AlertIOS,
  ToastAndroid,
} from "react-native";
import InputContainer from "../Components/Register/InputContainer";
import InputContainer2 from "../Components/Register/InputContainer2";
import InputContainer3 from "../Components/Register/InputContainer3";
import NextButton from "../Components/UI/Buttons/NextButton";
import Colors from "../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import Input from "../Components/UI/Input";
import DropDownPicker from "../Components/UI/DropDown/DropDownPicker";
import { useDispatch } from "react-redux";
import * as studentsAction from "../Store/Action/students";
import { firebaseConfig } from "../Firebase/firbase";
import {
  FirebaseRecaptchaVerifierModal,
  FirebaseRecaptchaBanner,
} from "expo-firebase-recaptcha";
import firebase from "firebase/compat";
import { PhoneAuthProvider } from "firebase/auth";
import { app, db, collection, getDocs, auth } from "../Firebase/firbase";
import { getAuth, onAuthStateChanged } from "../Firebase/firbase";
import * as Progress from "react-native-progress";
import StudentRegister from "../Components/Register/StudentRegister";
import TeacherRegister from "../Components/Register/TeacherRegister";

const professions = ["Student", "Teacher"];
const { width, height } = Dimensions.get("window");
const data = [1, 2, 3];

let userDetails = {
  name: "",
  profession: "",
};
let validity = {
  name: false,
  profession: false,
};
let teacherDetails = {};

const RegisterScreen = (props) => {
  const [name, setName] = useState("");
  const [profession, setProfession] = useState("");
  const [id, setId] = useState([]);

  const [valid, setValid] = useState(false);

  const dispatch = useDispatch();

  const getDetails = async () => {
    if (profession === "Teacher") {
      const col = collection(db, `Teacher`);
      const studSnapshot = await getDocs(col);
      const id = studSnapshot.docs.map((doc) => doc.id);
      console.log("Details " + userDetails.phone);
      setId(id);
    }
    else if(profession === "Student")
    {
      const col = collection(db, `Students`);
      const studSnapshot = await getDocs(col);
      const id = studSnapshot.docs.map((doc) => doc.id);
      console.log("Details " + userDetails.phone);
      setId(id);
    }
  };

  useEffect(() => {
    getDetails();
  }, [profession]);

  useEffect(() => {
    if (valid) {
      console.log("Next");
      phoneRegister(userDetails.phone);
    } else {
      console.log("All");
    }

    return () => {};
  }, [valid]);

  const nameHandler = (name) => {
    setName(name);
    validity.name = name === "" ? false : true;
    userDetails.name = name.trim();
  };
  const professionHandler = (profession) => {
    setProfession(profession);
    validity.profession = profession === "" ? false : true;
    userDetails.profession = profession.trim();
  };

  const nextHandler = (details, newValid) => {
    validity = { ...validity, ...newValid };
    userDetails = { ...userDetails, ...details };
    let localValid = false;

    if (id.indexOf(userDetails.phone) === -1) {
      localValid = true;
    }
    console.log(localValid);
    if (!localValid) {
      if (Platform.OS === "android") {
        ToastAndroid.show("Phone Number already exists", ToastAndroid.SHORT);
      } else {
        AlertIOS.alert(msg);
      }
    }
    new Set(Object.values(validity)).size === 1 && localValid
      ? setValid(true)
      : setValid(false);
  };

  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState();
  const [verificationCode, setVerificationCode] = useState();

  const [message, showMessage] = useState();
  const attemptInvisibleVerification = false;

  const phoneRegister = async (phoneNo) => {
    try {
      const phoneProvider = new PhoneAuthProvider(auth);
      const verificationId = await phoneProvider.verifyPhoneNumber(
        "+91" + phoneNo,
        recaptchaVerifier.current
      );
      setVerificationId(verificationId);
      props.navigation.navigate("CodeConfirm", {
        verificationId: verificationId,
        verificationCode: verificationCode,
        userDetails: userDetails,
        loginProfession: profession,
        from: "register",
      });
      console.log({
        text: "Verification code has been sent to your phone.",
        verificationId,
      });
    } catch (err) {
      console.log({ text: `Error: ${err.message}`, color: "red" });
    }
  };

  return (
    <View style={styles.screen}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={firebaseConfig}
        attemptInvisibleVerification={true | false /* experimental */}
      />
      <View style={styles.strip}></View>
      <ScrollView scrollEnabled>
        <KeyboardAvoidingView style={{ flex: 1 }}>
          <Text style={styles.title}>Attendance</Text>
          <View style={styles.inputContainer}>
            <ScrollView
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              scrollEventThrottle={32}
            >
              <Input
                label="Name"
                handler={nameHandler}
                placeholderTextColor={Colors.bg}
                required
                max={20}
                maxLength={20}
              />
              <DropDownPicker
                value={profession}
                list={professions}
                label="Profession"
                handler={professionHandler}
              />
              {profession === "Student" ? (
                <StudentRegister nextHandler={nextHandler} />
              ) : profession === "Teacher" ? (
                <TeacherRegister nextHandler={nextHandler} />
              ) : null}
            </ScrollView>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
      {/* {attemptInvisibleVerification && <FirebaseRecaptchaBanner />} */}
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
  inputContainer: {
    alignItems: "center",
    marginTop: 30,
  },
  button: {
    marginVertical: 80,
    backgroundColor: Colors.primary,
    borderRadius: 100,
    padding: 20,
    overflow: "hidden",
  },
});

export default RegisterScreen;
