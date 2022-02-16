import { useState } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import DropDownPicker from "../UI/DropDown/DropDownPicker";
import Input from "../UI/Input";
import MButtonSecondary from "../UI/Buttons/MButtonSecondary";
import Colors from "../../constants/Colors";

const { width, height } = Dimensions.get("window");

const userDetails = {
  parent: "",
  parentPhoneNo: "",
  password: "",
  confirmPassword: "",
};

const InputContainer3 = (props) => {
  const [parent, setParent] = useState("");
  const [parentPhoneNo, setParentPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const parentHandler = (par) => {
    setParent(par);
    userDetails.parent = par;
  };
  const parentPhoneNoHandler = (parphNo) => {
    setParentPhoneNo(parphNo);
    userDetails.parentPhoneNo = parphNo;
  };
  const passwordHandler = (pass) => {
    setPassword(pass);
    userDetails.password = pass;
  };
  const confirmPasswordHandler = (conPass) => {
    setConfirmPassword(conPass);
    userDetails.confirmPassword = conPass;
  };

  return (
    <View style={styles.inputContainer}>
      <Input
        style={{ fontSize: 15 }}
        label="Parent/Guardian Name"
        handler={parentHandler}
        placeholderTextColor={Colors.bg}
      />
      <Input
        style={{ fontSize: 15 }}
        label="Parent/Guardian Phone No."
        handler={parentPhoneNoHandler}
        placeholderTextColor={Colors.bg}
      />
      <Input
        label="Password"
        handler={passwordHandler}
        placeholderTextColor={Colors.bg}
        secureTextEntry
      />
      <Input
        label="Confirm Password"
        handler={confirmPasswordHandler}
        placeholderTextColor={Colors.bg}
        secureTextEntry
      />
      {/* <MButtonSecondary style={styles.button} title="Next" /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  inputContainer: {
    alignItems: "center",
    width: width,
  },
  button: {
    marginTop: 100,
  },
});

export default InputContainer3;
