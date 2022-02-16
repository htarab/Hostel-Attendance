import { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import { RadioButton } from "react-native-paper";
import Colors from "../../constants/Colors";
import TextTicker from "react-native-text-ticker";
import { useEffect } from "react";

const RadioList = (props) => {
  const [attendance, setAttendance] = useState();

  useEffect(() => {
    props.handler(props.index, attendance);
    return () => {};
  }, [attendance]);

  return (
    <View style={styles.screen}>
      <View style={styles.studentsContainer}>
        <View style={styles.textContainer}>
          <TextTicker
            style={styles.text}
            duration={5000}
            loop
            repeatSpacer={50}
            marqueeDelay={1000}
          >
            {props.name}
          </TextTicker>
        </View>
        {/* <RadioButtonRN
          style={styles.radioButton}
          data={data}
          box={false}
          selectedBtn={(e) => console.log(e)}
        /> */}
        <View style={styles.subContainer}>
          <RadioButton
            value="Absent"
            color={Colors.primary}
            uncheckedColor={Colors.primary}
            status={attendance === "Absent" ? "checked" : "unchecked"}
            onPress={() => setAttendance("Absent")}
          />
          <RadioButton
            value="Present"
            color={Colors.primary}
            uncheckedColor={Colors.primary}
            status={attendance === "Present" ? "checked" : "unchecked"}
            onPress={() => setAttendance("Present")}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
    // backgroundColor: "white",
  },
  studentsContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 40,
    // backgroundColor: "red",
  },
  subContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "blue",
  },
  textContainer: {
    flex: 1,
    alignItems: "flex-start",
    // backgroundColor: "red",
  },
  text: {
    fontSize: 20,
    fontFamily: "poppins-regular",
    color: Colors.text,
    paddingEnd: 30,
  },
});

export default RadioList;
