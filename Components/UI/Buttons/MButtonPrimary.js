import {
  Button,
  Dimensions,
  Platform,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import Colors from "../../../constants/Colors";

let TouchableComp = TouchableNativeFeedback;

if (Platform.OS === "ios") {
  TouchableComp = TouchableOpacity;
}

const MButtonPrimary = (props) => {
  return (
    <View style={styles.container}>
      <TouchableComp useForeground onPress={props.onPress}>
        <View style={{ ...styles.buttonContainer, ...props.style }}>
          <Text style={styles.buttonText}>{props.title}</Text>
        </View>
      </TouchableComp>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width / 2.6,
  },
  buttonContainer: {
    elevation: 3,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingTop: 5,
    paddingBottom: 3,
    overflow: "hidden",
    width: "100%",
  },
  buttonText: {
    fontSize: 18,
    color: Colors.text,
    alignSelf: "center",
    justifyContent: "center",
    fontFamily: "poppins-regular"
  },
});

export default MButtonPrimary;
