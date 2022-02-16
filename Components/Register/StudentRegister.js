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

const departments = ["MCT", "CSBS", "EEE", "ECE", "CS", "Mech"];
const years = ["1", "2", "3", "4"];
const blocks = ["A", "B", "C", "D", "E"];

const userDetails = {
  dept: "",
  year: "",
  registerNo: "",
  block: "",
  room: "",
  phone: "",
  parent: "",
  parentPhoneNo: "",
};
const validity = {
  dept: false,
  year: false,
  registerNo: false,
  block: false,
  room: false,
  phone: false,
  parent: false,
  parentPhoneNo: false,
};

const StudentRegister = (props) => {
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [register, setRegister] = useState("");
  const [block, setBlock] = useState("");
  const [room, setRoom] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [parent, setParent] = useState("");
  const [parentPhoneNo, setParentPhoneNo] = useState("");

  const departmentHandler = (dept) => {
    setDepartment(dept);
    validity.dept = dept === "" ? false : true;
    userDetails.dept = dept;
  };
  const yearHandler = (year) => {
    setYear(year);
    validity.year = year === "" ? false : true;
    userDetails.year = year;
  };
  const registerHandler = (reg) => {
    setRegister(reg);
    validity.registerNo = reg === "" ? false : true;
    userDetails.registerNo = reg;
  };
  const blockHandler = (block) => {
    setBlock(block);
    validity.block = block === "" ? false : true;
    userDetails.block = block;
  };
  const roomHandler = (room) => {
    setRoom(room);
    validity.room = room === "" ? false : true;
    userDetails.room = room;
  };
  const phoneNoHandler = (phone) => {
    setPhoneNo(phone);
    validity.phone = phone === "" ? false : true;
    userDetails.phone = phone;
  };
  const parentHandler = (par) => {
    setParent(par);
    validity.parent = par === "" ? false : true;
    userDetails.parent = par;
  };
  const parentPhoneNoHandler = (parphNo) => {
    setParentPhoneNo(parphNo);
    validity.parentPhoneNo = parphNo === "" ? false : true;
    userDetails.parentPhoneNo = parphNo;
  };

  return (
    <View style={styles.inputContainer}>
      <DropDownPicker
        value={department}
        list={departments}
        label="Dept."
        handler={departmentHandler}
      />
      <DropDownPicker
        value={year}
        list={years}
        label="Year"
        handler={yearHandler}
      />
      <Input
        label="Register No."
        handler={registerHandler}
        placeholderTextColor={Colors.bg}
        required
        max={9}
        maxLength={9}
      />
      <DropDownPicker
        value={block}
        list={blocks}
        label="Block"
        handler={blockHandler}
      />
      <Input
        label="Room No."
        keyboardType="numeric"
        handler={roomHandler}
        placeholderTextColor={Colors.bg}
        required
        number
        max={3}
        maxLength={3}
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
        // style={{ fontSize: 15 }}
        label="Parent/Guardian Name"
        handler={parentHandler}
        placeholderTextColor={Colors.bg}
        required
        max={20}
        maxLength={20}
      />
      <Input
        // style={{ fontSize: 15 }}
        label="Parent/Guardian Phone No."
        keyboardType="numeric"
        maxLength={10}
        handler={parentPhoneNoHandler}
        placeholderTextColor={Colors.bg}
        required
        number
        max={10}
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

export default StudentRegister;
