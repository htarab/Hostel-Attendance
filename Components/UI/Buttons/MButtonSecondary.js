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

const MButtonSecondary = (props) => {
  return (
    <View style={styles.container}>
      <TouchableComp useForeground onPress={props.onPress} disabled={props.disabled}>
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
    backgroundColor: Colors.accent,
    borderRadius: 5,
    paddingTop:5,
    paddingBottom: 3,
    overflow: "hidden",
    borderWidth: 1.5,
    borderColor: Colors.primary,
  },
  buttonText: {
    fontSize: 18,
    color: Colors.text,
    alignSelf: "center",
    fontFamily: "poppins-regular"
  },
});

export default MButtonSecondary;
