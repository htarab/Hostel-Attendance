import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  View,
} from "react-native";
import Colors from "../../../constants/Colors";

const DropDownContainer = (props) => {
  return (
    <View style={{ ...styles.screen, ...props.style }}>
      <ScrollView>
        {props.list.map((value, index) => (
          <TouchableNativeFeedback
            key={value}
            useForeground
            onPress={() => {
              props.department(value, index);
            }}
          >
            <View style={styles.textContainer}>
              <Text key={value} style={styles.text}>
                {value}
              </Text>
            </View>
          </TouchableNativeFeedback>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    borderBottomStartRadius: 5,
    borderBottomEndRadius: 5,
    opacity: 0.7,
    overflow: "hidden",
  },
  textContainer: {
    backgroundColor: Colors.accent,
    width: Dimensions.get("window").width / 1.58,
    height: 48,
  },
  text: {
    fontFamily: "poppins-regular",
    fontSize: 18,
    color: Colors.text,
    paddingTop: 9,
    paddingHorizontal: 10,
  },
});

export default DropDownContainer;
