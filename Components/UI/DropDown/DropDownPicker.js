import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import { useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import DropDownContainer from "../DropDown/DropDownContainer";
import Colors from "../../../constants/Colors";

const DropDownPicker = (props) => {
  const [open, setOpen] = useState(false);
  const [valid, setValid] = useState(false);
  const [touched, setTouched] = useState(false);

  const inputHandler = (value) => {
    props.handler(value);
    setValid(true);
    setOpen(false);
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableNativeFeedback
          onPress={() => setOpen(!open)}
          onPressOut={() => setTouched(true)}
        >
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
              <DropDownContainer list={props.list} department={inputHandler} />
            </ScrollView>
          )}
        </View>
        {!valid && touched && (
          <Text style={{ color: Colors.primary }}>This Field is Required</Text>
        )}
      </View>
    </ScrollView>
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
    width: Dimensions.get("window").width / 1.58,
    height: 48,
    backgroundColor: Colors.accent,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: 40,
    overflow: "hidden",
  },
});

export default DropDownPicker;
