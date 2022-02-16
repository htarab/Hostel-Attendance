import { MaterialIcons } from "@expo/vector-icons";
import { useState } from "react";
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import Colors from "../../../constants/Colors";
import DropDownContainer2 from "../DropDown/DropDownContainer2";

const { width, height } = Dimensions.get("window");

const DropDownPicker2 = (props) => {
  const [open, setOpen] = useState(false);
  const [valid, setValid] = useState(false);

  const inputHandler = (value, index) => {
    props.handler(value, index);
    setValid(true);
    setOpen(false);
  };

  return (
    <View style={{ ...styles.container, ...props.style }}>
      <TouchableNativeFeedback onPress={() => setOpen(!open)}>
        <View
          style={{
            ...styles.dropDownContainer,
            borderTopStartRadius: 5,
            borderTopEndRadius: 5,
            borderBottomEndRadius: open ? 0 : 5,
            borderBottomStartRadius: open ? 0 : 5,
          }}
        >
          <Text
            style={{
              ...styles.text,
              color: props.value.length === 0 ? Colors.bg : Colors.text,
            }}
          >
            {props.value.length === 0 ? props.label : props.value}
          </Text>
          <MaterialIcons
            name={open ? "arrow-drop-up" : "arrow-drop-down"}
            size={30}
            color={Colors.primary}
            onPress={() => setOpen(!open)}
          />
        </View>
      </TouchableNativeFeedback>
      <View>
        {open && (
          <ScrollView>
            <DropDownContainer2 list={props.list} department={inputHandler} />
          </ScrollView>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    overflow: "hidden",
  },
  text: {
    fontFamily: "poppins-regular",
    fontSize: 18,
    color: Colors.bg,
    paddingTop: 6,
  },
  dropDownContainer: {
    flexDirection: "row",
    width: width / 3,
    height: 48,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    overflow: "hidden",
  },
});

export default DropDownPicker2;
