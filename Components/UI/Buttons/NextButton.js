import {
  Platform,
  StyleSheet,
  Animated,
  TouchableNativeFeedback,
  TouchableOpacity,
  View,
} from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import Colors from "../../../constants/Colors";
import { MaterialIcons } from "@expo/vector-icons";
import { useEffect, useRef } from "react";

const NextButton = (props) => {
  const size = 85;
  const strokeWidth = 2;
  const center = size / 2;
  const radius = size / 2 - strokeWidth / 2;
  const circumference = 2 * Math.PI * radius;

  let TouchableComp = TouchableNativeFeedback;
  if (Platform.OS === "ios") {
    TouchableComp = TouchableOpacity;
  }

  const progressAnimation = useRef(new Animated.Value(0)).current;
  const progressRef = useRef(null);

  const animation = (toValue) => {
    return Animated.timing(progressAnimation, {
      toValue,
      duration: 250,
      useNativeDriver: false,
    }).start();
  };

  const details = () => {
    
  }

  useEffect(() => {
    animation(props.percentage);
  }, [props.percentage]);

  useEffect(() => {
    progressAnimation.addListener(
      (value) => {
        const strokeDashoffset =
          circumference - (circumference * value.value) / 100;

        if (progressRef?.current) {
          progressRef.current.setNativeProps({
            strokeDashoffset,
          });
        }
      },
      [props.percentage]
    );
  });

  return (
    <View style={styles.screen}>
      <Svg width={size} height={size}>
        <G rotation="-90" origin={center}>
          <Circle
            stroke={Colors.accent}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
          />
          <Circle
            ref={progressRef}
            stroke={Colors.primary}
            cx={center}
            cy={center}
            r={radius}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
          />
        </G>
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 80,
  },
  button: {
    position: "absolute",
    backgroundColor: Colors.primary,
    borderRadius: 100,
    padding: 20,
    overflow: "hidden",
  },
});

export default NextButton;
