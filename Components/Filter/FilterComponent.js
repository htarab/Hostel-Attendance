import { useState } from "react";
import {
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import MButtonSecondary from "../UI/Buttons/MButtonSecondary";
import DateTimePicker from "@react-native-community/datetimepicker";
import Colors from "../../constants/Colors";
import MButtonPrimary from "../UI/Buttons/MButtonPrimary";
import { useEffect } from "react";

const FilterComponent = (props) => {
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromDate, setShowFromDate] = useState(false);
  const [showToDate, setShowToDate] = useState(false);
  const [saved, setSaved] = useState(false);

  const onFromDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || fromDate;
    const newFromDate = currentDate.toDateString();
    setShowFromDate(false);
    console.log("From Date " + newFromDate);
  };
  const onToDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || toDate;
    const newToDate = currentDate.toDateString();
    setShowToDate(false);
    console.log("To Date " + newToDate);
  };

  useEffect(() => {
    if (saved) {
      props.filterData(fromDate, toDate);
    }
  }, [saved]);

  const filterDates = () => {
    setSaved(true);
    props.closeModule();
  };

  return (
    <View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setShowFromDate(false);
          setSaved(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            {showFromDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={fromDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onFromDateChange}
                themeVariant="light"
              />
            )}
            {showToDate && (
              <DateTimePicker
                testID="dateTimePicker"
                value={toDate}
                mode="date"
                is24Hour={true}
                display="default"
                onChange={onToDateChange}
                themeVariant="dark"
              />
            )}
            <View style={styles.buttonContainer}>
              <MButtonSecondary
                title="From"
                style={styles.buttonSecondary}
                onPress={() => {
                  setShowFromDate((prevState) => !prevState);
                }}
              />
              <MButtonSecondary
                title="To"
                style={styles.buttonSecondary}
                onPress={() => {
                  setShowToDate((prevState) => !prevState);
                }}
              />
            </View>

            <MButtonPrimary
              title="Save"
              style={styles.buttonPrimary}
              onPress={() => {
                filterDates();
              }}
            />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: Colors.accent,
    borderRadius: 20,
    padding: 35,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttonPrimary: {
    margin: 20,
    padding: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    alignSelf: "center",
  },
  buttonSecondary: {
    margin: 20,
    padding: 10,
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default FilterComponent;
