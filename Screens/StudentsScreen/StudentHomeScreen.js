import { useEffect } from "react";
import { useState } from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";
import MButtonPrimary from "../../Components/UI/Buttons/MButtonPrimary";
import Colors from "../../constants/Colors";
import {
  app,
  getDatabase,
  onValue,
  set,
  firestore,
  db,
  collection,
  getDocs,
  mRef,
  setDoc,
  doc,
  auth,
  getAuth,
  onAuthStateChanged,
} from "../../Firebase/firbase";

const StudentHomeScreen = (props) => {
  // console.log(props);
  // const userDetails = props.route.params.userDetails;
  // console.log(userDetails);
  const [attendanceList, setAttendanceList] = useState();
  let newList = ["Hello"];

  const signOutHandler = () => {
    getAuth().signOut();
    props.navigation.replace("Start");
  };

  useEffect(() => {
    getDetails();
    // console.log("Hello");
    return () => {};
  }, []);

  const getDetails = async () => {
    const col = collection(db, `Students/B/Floor/0/001/19eumt001/Attendance`);
    const studSnapshot = await getDocs(col);
    const list = studSnapshot.docs.map((doc) => doc.data());
    const reg = studSnapshot.docs.map((doc) => doc.id);
    console.log(list);
    newList.push(list);
    // setAttendanceList(list);
  };

  return (
    <View style={styles.screen}>
      <View style={styles.container}>
        <Text style={styles.date}>Sun Feb 6 2022</Text>
        <Text style={styles.attendance}>Present</Text>
      </View>
      {/* <MButtonPrimary title="Sign Out" onPress={signOutHandler} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.bg,
  },
  container: {
    width: "85%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
    backgroundColor: "red",
  },
  date: {
    flex: 2,
    fontSize: 18,
    fontFamily: "poppins-regular",
    color: Colors.text,
    backgroundColor: "blue",
  },
  attendance: {
    flex: 1,
    fontSize: 18,
    fontFamily: "poppins-medium",
    color: Colors.text,
    textAlign: "center",
    backgroundColor: "green",
  },
});

export default StudentHomeScreen;
