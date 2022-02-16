import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  ToastAndroid,
  AlertIOS,
  TouchableOpacity,
  View,
} from "react-native";
import { auth, getAuth, onAuthStateChanged } from "../Firebase/firbase";
import Colors from "../constants/Colors";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { MaterialIcons } from "@expo/vector-icons";
import Input from "../Components/UI/Input";
import { useRef, useState } from "react";
import { useEffect } from "react";
import firebase from "firebase/compat";
import { PhoneAuthProvider } from "firebase/auth";
import {
  app,
  db,
  collection,
  getDocs,
  firebaseConfig,
} from "../Firebase/firbase";
import DropDownPicker from "../Components/UI/DropDown/DropDownPicker";

const professions = ["Student", "Teacher"];
let validity = {
  phone: false,
  profession: false,
};

const LoginScreen = (props) => {
  // console.log("state = unknown (until the callback is invoked)");
  const [valid, setValid] = useState(false);
  const [phone, setPhone] = useState("");

  const [profession, setProfession] = useState("");
  const [id, setId] = useState([]);

  const recaptchaVerifier = useRef(null);
  const [verificationId, setVerificationId] = useState();
  const [verificationCode, setVerificationCode] = useState();

  const getDetails = async () => {
    if (profession === "Teacher") {
      const col = collection(db, `Teacher`);
      const studSnapshot = await getDocs(col);
      const id = studSnapshot.docs.map((doc) => doc.id);
      console.log("Details " + phone);
      setId(id);
    } else if (profession === "Student") {
      const col = collection(db, `Students`);
      const studSnapshot = await getDocs(col);
      const id = studSnapshot.docs.map((doc) => doc.id);
      console.log("Details " + phone);
      setId(id);
    }
  };

  useEffect(() => {
    getDetails();
  }, [profession]);

  useEffect(() => {
    if (valid) {
      phoneRegister(phone);
    } else {
      console.log("Invalid");
    }
    return () => {};
  }, [valid]);

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
        loginProfession: profession,
        from: "login",
      });
      console.log({
        text: "Verification code has been sent to your phone.",
        verificationId,
      });
    } catch (err) {
      console.log({ text: `Error: ${err.message}`, color: "red" });
    }
  };

  const phoneNoHandler = (phone) => {
    setPhone(phone);
    validity.phone = phone === "" ? false : true;
  };

  const professionHandler = (profession) => {
    setProfession(profession);
    validity.profession = profession === "" ? false : true;
  };

  const nextHandler = () => {
    let isNumberPresent = true;

    if (id.indexOf(phone) === -1) {
      isNumberPresent = false;
    }
    console.log(isNumberPresent);
    console.log(id);

    console.log(valid);
    new Set(Object.values(validity)).size === 1 && isNumberPresent
      ? setValid(true)
      : setValid(false);
    console.log(valid);
    if (!isNumberPresent) {
      if (Platform.OS === "android") {
        ToastAndroid.show(
          "Phone Number is not yet registered",
          ToastAndroid.SHORT
        );
      } else {
        AlertIOS.alert(msg);
      }
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
                label="Phone No."
                keyboardType="numeric"
                maxLength={10}
                handler={phoneNoHandler}
                placeholderTextColor={Colors.bg}
                required
                number
                max={10}
              />
              <DropDownPicker
                value={profession}
                list={professions}
                label="Profession"
                handler={professionHandler}
              />
            </ScrollView>
            <TouchableOpacity
              activeOpacity={0.78}
              useForeground
              onPress={() => {
                nextHandler();
              }}
            >
              <View style={styles.button}>
                <MaterialIcons
                  name="navigate-next"
                  size={25}
                  color={Colors.bg}
                />
              </View>
            </TouchableOpacity>
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
    marginTop: 150,
  },
  button: {
    marginVertical: 150,
    backgroundColor: Colors.primary,
    borderRadius: 100,
    padding: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default LoginScreen;
