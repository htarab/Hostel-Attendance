import { useEffect, useLayoutEffect, useState } from "react";
import {
  Animated,
  Button,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import DropDownPicker2 from "../../Components/UI/DropDown/DropDownPicker2";
import MButtonSecondary from "../../Components/UI/Buttons/MButtonSecondary";
import Colors from "../../constants/Colors";
import { Feather } from "@expo/vector-icons";
import AppLoading from "expo-app-loading";
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
} from "../../Firebase/firbase";
import RadioList from "../../Components/UI/RadioList";
import { useRef } from "react";
import firebase from "firebase/compat";
import { getAuth, onAuthStateChanged } from "../../Firebase/firbase";

const { width, height } = Dimensions.get("window");

const dummyRooms = [
  "001",
  "002",
  "003",
  "004",
  "005",
  "006",
  "007",
  "008",
  "009",
  "010",
  "011",
  "012",
  "013",
  "014",
  "015",
];
let validity = [false, false, false, false];
let attendance = [false, false, false, false];
let teacherDetails = {};

const date = new Date();
const today = date.toDateString();

const data = [
  {
    label: "data 1",
  },
  {
    label: "data 2",
  },
];

const getTeacherDetails = async (phone) => {
  const col = collection(db, `Teacher`);
  const studSnapshot = await getDocs(col);
  const details = studSnapshot.docs.map((doc) => doc.data());
  const id = studSnapshot.docs.map((doc) => doc.id);
  // const details = studSnapshot.docs.map((doc) => doc.id);
  teacherDetails = details;
  const newPhone = phone.replace("+91", "");
  // console.log(id);
  // console.log(newPhone);
  console.log(teacherDetails[id.indexOf(newPhone)].userDetails.block);
  block = teacherDetails[id.indexOf(newPhone)].userDetails.block;
};

const TeacherHomeScreen = (props) => {
  const [room, setRoom] = useState("001");
  const [index, setIndex] = useState(0);
  const [studentList, setStudentList] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [isDetailsReady, setIsDetailsReady] = useState(false);
  const [valid, setValid] = useState(false);
  const [phone, setPhone] = useState(false);
  const [block, setBlock] = useState();
  const [name, setName] = useState();

  useEffect(() => {
    getAuth().onAuthStateChanged((user) => {
      if (user) {
        (async () => {
          setIsReady(false);
          const col = collection(db, `Teacher`);
          const studSnapshot = await getDocs(col);
          const details = studSnapshot.docs.map((doc) => doc.data());
          const id = studSnapshot.docs.map((doc) => doc.id);
          // const details = studSnapshot.docs.map((doc) => doc.id);
          teacherDetails = details;
          const newPhone = user.phoneNumber.replace("+91", "");
          // console.log(id);
          // console.log(newPhone);
          let localBlock =
            teacherDetails[id.indexOf(newPhone)].userDetails.block;
          setBlock(localBlock);
          setIsReady(true);
        })();
        // console.log("state = definitely signed in");
      } else {
        // console.log("state = definitely signed out");
      }
    });
  }, []);

  const signOutUser = async () => {
    try {
      await firebase.auth().signOut();
      props.navigation.replace("Start");
    } catch (e) {
      console.log(e);
    }
  };

  const roomHandler = (room, index) => {
    setRoom(room);
    setIndex(index);
    fadeOutRight();
  };

  // console.log(auth.currentUser);

  const setAttendanceDetails = (phone, attendance, name) => {
    setDoc(doc(firestore, "Attendance", `${block}`, "0", name), {
      name: name,
    });
    setDoc(
      doc(firestore, "Attendance", `${block}`, "0", name, "Date", `${today}`),
      {
        attendance: attendance,
      }
    );
    // setDoc(
    //   doc(
    //     firestore,
    //     "Student",
    //     `B`,
    //     "Floor",
    //     `${room.charAt(0)}`,
    //     `${room}`,
    //     `${phone}`,
    //     "Attendance",
    //     `${today}`
    //   ),
    //   {
    //     attendance: attendance,
    //   }
    // );
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    setRoom(dummyRooms[index]);
  }, [index]);

  useEffect(() => {
    getDetails();
  }, [room, block]);

  const getDetails = async () => {
    const col = collection(db, `Student/${block}/Floor/0/${room}`);
    const studSnapshot = await getDocs(col);
    fadeIn();
    const list = studSnapshot.docs.map((doc) => doc.data());
    const phone = list.map((obj) => obj.userDetails.phone);
    const name = list.map((obj) => obj.userDetails.name);
    setName(name);
    setStudentList(list);
    console.log(phone);
    setPhone(phone);
  };

  useEffect(() => {
    if (valid) {
      phone.map((reg, index) => {
        // console.log(attendance);
        setAttendanceDetails(reg, attendance[index], name[index]);
      });
      // console.log(attendance);
      nextRoomHandler();
    }
    // console.log(valid);
  }, [valid]);

  const fadeIn = () => {
    // Will change fadeAnim value to 1 in 5 seconds
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const fadeOutRight = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: 150,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };
  const fadeOutLeft = () => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(fadeAnim, {
      toValue: -150,
      duration: 800,
      useNativeDriver: true,
    }).start();
  };

  const nextRoomHandler = () => {
    if (index < dummyRooms.length - 1) {
      setIndex((prevIndex) => prevIndex + 1);
      fadeOutLeft();
    }
  };
  const prevRoomHandler = () => {
    if (index > 0) {
      setIndex((prevIndex) => prevIndex - 1);
      fadeOutRight();
    }
  };
  const attendanceHandler = (index, attend) => {
    if (attend != undefined) {
      validity[index] = true;
      attendance[index] = attend;
    }
    // console.log(validity);
  };

  const onSaveHandler = () => {
    // new Set(Object.values(validity)).size === true
    //   ? console.log('true')
    //   : console.log('false');

    let checker = (arr) => arr.every(Boolean);
    checker(validity) ? setValid(true) : setValid(false);
    // console.log(valid);
  };

  if (!isReady) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: Colors.bg,
        }}
      >
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <ScrollView
        contentContainerStyle={styles.screenScroll}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.textContainer}>
          <Text style={styles.text}>{today}</Text>
          <Text style={styles.text}>Block {block}</Text>
        </View>
        <View style={styles.roomContainer}>
          <TouchableOpacity style={styles.arrowLeft} onPress={prevRoomHandler}>
            <Feather name="triangle" size={24} color={Colors.primary} />
          </TouchableOpacity>
          <DropDownPicker2
            value={room}
            list={dummyRooms}
            label="Room"
            handler={roomHandler}
          />
          <TouchableOpacity style={styles.arrowRight} onPress={nextRoomHandler}>
            <Feather name="triangle" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
        <Animated.View
          style={{ ...styles.screen, transform: [{ translateX: fadeAnim }] }}
        >
          {studentList.length > 0 ? (
            studentList.map(
              (item, index) => (
                <RadioList
                  key={Math.random()}
                  name={item.userDetails.name}
                  index={index}
                  handler={attendanceHandler}
                  attendance={attendance}
                />
              )
              // console.log(studentList)
            )
          ) : (
            <View style={styles.noStudentContainer}>
              <Text style={styles.noStudentText}>No Students in this room</Text>
            </View>
          )}
        </Animated.View>
        <MButtonSecondary
          style={styles.button}
          title="Save"
          onPress={() => onSaveHandler()}
          disabled={studentList.length > 0 ? false : true}
        />
        <Button title="Sign Out" onPress={signOutUser} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.bg,
  },
  noStudentContainer: {
    flex: 1,
    width: Dimensions.get("window").width,
    alignItems: "center",
    justifyContent: "center",
    textAlignVertical: "center",
    // backgroundColor: "red",
  },
  noStudentText: {
    height: 305,
    fontSize: 20,
    fontFamily: "poppins-medium",
    alignContent: "center",
    paddingTop: 120,
    color: Colors.text,
    // textAlignVertical: 'center'
  },
  screenScroll: {
    width: "100%",
    alignItems: "center",
    backgroundColor: Colors.bg,
  },
  textContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: height / 9,
  },
  text: {
    fontSize: 20,
    fontFamily: "poppins-medium",
    color: Colors.text,
  },
  roomContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 80,
  },
  arrowLeft: {
    transform: [{ rotate: "-90deg" }],
  },
  arrowRight: {
    transform: [{ rotate: "90deg" }],
  },
  studentsContainer: {
    width: "80%",
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginBottom: 40,
  },
  button: {
    marginVertical: 40,
  },
});

export default TeacherHomeScreen;
