import { useEffect, useState } from "react";
import { Dimensions, StyleSheet, Text, TextInput, View } from "react-native";
import Colors from "../../constants/Colors";

const Input = (props) => {
  const [variable, setVariable] = useState("");
  const [valid, setValid] = useState(false);
  const [touched, setTouched] = useState(false);
  const [errorText, setErrorText] = useState("This Field is Required");

  const variableHandler = () => {
    props.handler(variable);
    setTouched(true);
  };

  // useEffect(() => {
  //   if (props.onInputChange != null) {
  //     props.onInputChange(valid);
  //   }
  // }, [valid]);

  const textChangeHandler = (text) => {
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    setValid(true);
    if (props.required && text.trim().length === 0) {
      setValid(false);
      setErrorText("This Field is Required");
    }
    if (props.email && !emailRegex.test(text.toLowerCase())) {
      setValid(false);
    }
    if (props.min != null && +text < props.min) {
      setValid(false);
    }
    if (props.minLength != null && text.length < props.minLength) {
      setValid(false);
    }
    if (props.max != null && text.length === props.max) {
      setValid(false);
      setTouched(true);
      setErrorText("Max Length Reached");
    }
    if (props.number != null) {
      setVariable(text.replace(/[^0-9]/g, ""));
      return;
    }
    setVariable(text);
  };

  return (
    <View>
      <TextInput
        {...props}
        style={{ ...styles.input, ...props.style }}
        placeholder={props.label}
        placeholderTextColor={props.placeholderTextColor}
        selectionColor={Colors.primary}
        value={variable}
        onChangeText={(text) => textChangeHandler(text)}
        onBlur={variableHandler}
      />
      {!valid && touched && (
        <Text style={{ color: Colors.primary }}>{errorText}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: Colors.accent,
    width: Dimensions.get("window").width / 1.58,
    height: 48,
    marginTop: 40,
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingTop: 6,
    color: Colors.text,
    fontFamily: "poppins-regular",
    fontSize: 18,
  },
});

export default Input;
