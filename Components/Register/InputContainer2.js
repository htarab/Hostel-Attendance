import { useState } from "react";
import { Dimensions, StyleSheet, Text, TouchableNativeFeedback, View } from "react-native";
import DropDownPicker from "../UI/DropDown/DropDownPicker";
import Input from "../UI/Input";
import MButtonSecondary from "../UI/Buttons/MButtonSecondary";
import Colors from "../../constants/Colors";

const blocks = ["A", "B", "C", "D", "E"];
const { width, height } = Dimensions.get("window");

const userDetails = { registerNo: "", block: "", room: "", phone: "" };

const InputContainer2 = (props) => {
  const [register, setRegister] = useState("");
  const [block, setBlock] = useState("");
  const [room, setRoom] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [active, setActive] = useState(true);

  // if (props.index === 1) {
  //   props.handler(userDetails);
  // }

  const registerHandler = (reg) => {
    setRegister(reg);
    userDetails.registerNo = reg;
  };
  const blockHandler = (block) => {
    setBlock(block);
    userDetails.block = block;
  };
  const roomHandler = (room) => {
    setRoom(room);
    userDetails.room = room;
  };
  const phoneNoHandler = (phone) => {
    setPhoneNo(phone);
    userDetails.phone = phone;
  };

  return (
    <View style={{ ...styles.inputContainer, ...props.style }}>
      <Input
        label="Register No."
        handler={registerHandler}
        placeholderTextColor={Colors.bg}
      />
      <DropDownPicker
        value={block}
        list={blocks}
        label="Block"
        handler={blockHandler}
      />
      <Input
        label="Room No."
        handler={roomHandler}
        placeholderTextColor={Colors.bg}
      />
      <Input
        label="Phone No."
        handler={phoneNoHandler}
        placeholderTextColor={Colors.bg}
      />
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

export default InputContainer2;
