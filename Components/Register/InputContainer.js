import { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableNativeFeedback,
} from "react-native";
import { useDispatch } from "react-redux";
import Colors from "../../constants/Colors";
import NextButton from "../UI/Buttons/NextButton";
import DropDownPicker from "../UI/DropDown/DropDownPicker";
import Input from "../UI/Input";
import * as studentsAction from "../..//Store/Action/students";

const departments = ["MCT", "CSBS", "EEE", "ECE", "CS", "Mech"];
const years = ["1", "2", "3", "4"];
const { width, height } = Dimensions.get("window");

const userDetails = { name: "", dept: "", year: "" };

const InputContainer = (props) => {
  const [name, setName] = useState("");
  const [department, setDepartment] = useState("");
  const [year, setYear] = useState("");
  const [active, setActive] = useState(true);

  const dispatch = useDispatch();

  const nameHandler = (name) => {
    setName(name);
    userDetails.name = name.trim();
  };
  const departmentHandler = (dept) => {
    setDepartment(dept);
    userDetails.dept = dept;
  };
  const yearHandler = (year) => {
    setYear(year);
    userDetails.year = year;
  };

  return (
    <View style={styles.inputContainer} >
      <Input
        label="Name"
        handler={nameHandler}
        placeholderTextColor={Colors.bg}
      />
      <Input
        label="Student"
        editable={false}
        placeholderTextColor={Colors.text}
      />
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
});

export default InputContainer;
