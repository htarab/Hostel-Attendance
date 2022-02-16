import { useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../constants/Colors";
import DropDownPicker from "../UI/DropDown/DropDownPicker";
import Input from "../UI/Input";
import { MaterialIcons } from "@expo/vector-icons";

const blocks = ["A", "B", "C", "D", "E"];

const userDetails = {
  block: "",
  phone: "",
  code: "",
};
const validity = {
  block: false,
  phone: false,
  code: false,
};

const TeacherRegister = (props) => {
  const [block, setBlock] = useState("");
  const [phoneNo, setPhoneNo] = useState("");

  const blockHandler = (block) => {
    setBlock(block);
    validity.block = block === "" ? false : true;
    userDetails.block = block;
  };
  const phoneNoHandler = (phone) => {
    setPhoneNo(phone);
    validity.phone = phone === "" ? false : true;
    userDetails.phone = phone;
  };
  const codeHandler = (code) => {
    setPhoneNo(code);
    validity.code = code === "123456" ? true : false;
    userDetails.code = code;
  };

  return (
    <View style={styles.inputContainer}>
      <DropDownPicker
        value={block}
        list={blocks}
        label="Block"
        handler={blockHandler}
      />
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
      <Input
        label="Teacher Code"
        keyboardType="numeric"
        maxLength={6}
        handler={codeHandler}
        placeholderTextColor={Colors.bg}
        required
        number
        max={6}
      />
      <TouchableOpacity
        activeOpacity={0.78}
        useForeground
        onPress={() => props.nextHandler(userDetails, validity)}
      >
        <View style={styles.button}>
          <MaterialIcons name="navigate-next" size={25} color={Colors.bg} />
        </View>
      </TouchableOpacity>
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
  },
  button: {
    marginVertical: 80,
    backgroundColor: Colors.primary,
    borderRadius: 100,
    padding: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default TeacherRegister;
