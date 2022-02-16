import {
  ActivityIndicator,
  Button,
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from "react-native-table-component";
import { db, collection, getDocs } from "../../Firebase/firbase";
import Colors from "../../constants/Colors";
import { useState } from "react";
import firebase from "firebase/compat";
import { useEffect } from "react";
import { useLayoutEffect } from "react";
import XLSX from "xlsx";
import * as FileSystem from "expo-file-system";
import * as Sharing from "expo-sharing";
import MButtonPrimary from "../../Components/UI/Buttons/MButtonPrimary";
import FilterComponent from "../../Components/Filter/FilterComponent";

let tableHeadInitial = ["Name", "Register Number"];
const tableDataInitial = [
  ["Abdul Razeem", "19eumt001"],
  ["Abishake Kumaran", "19eumt003"],
  ["Ansal Mathew Philip", "19eumt007"],
  ["Aravinthan", "19eumt008"],
];
let widthArrInitial = [100, 120];
let tableExtraData = [];

//Generate Excel
const exportExcel = async (excelData, fileName) => {
  const ws = XLSX.utils.json_to_sheet(excelData);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Cities");
  const wbout = XLSX.write(wb, {
    type: "base64",
    bookType: "xlsx",
  });
  const uri = FileSystem.documentDirectory + "Attendance.xlsx";
  console.log(`Writing to ${JSON.stringify(uri)} with text: ${wbout}`);
  await FileSystem.writeAsStringAsync(uri, wbout, {
    encoding: FileSystem.EncodingType.Base64,
  });

  Sharing.shareAsync(uri, {
    mimeType:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    dialogTitle: "MyWater data",
    UTI: "com.microsoft.excel.xlsx",
  });
};

//Downloading

const ReviewScreen = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [block, setBlock] = useState("B");
  const [tableHead, setTableHead] = useState(tableHeadInitial);
  const [tableData, setTableData] = useState(tableDataInitial);
  const [widthArr, setWidthArr] = useState(widthArrInitial);
  const [modalVisible, setModalVisible] = useState(false);

  const element = (data, index) => (
    <TouchableOpacity onPress={() => console.log("Hello")}>
      <View style={styles.btn}>
        <Text style={styles.btnText}>button</Text>
      </View>
    </TouchableOpacity>
  );

  const getStudents = async (block) => {
    const col = collection(db, `Attendance/${block}/0`);
    const studSnapshot = await getDocs(col);
    const students = studSnapshot.docs.map((doc) => doc.id);
    //   console.log(students);
    // students.map((student) => getAttendance(student, block));
    getDate(students[0], block, students);
    //Dont have to do for evey student since all the days are same.
  };

  const getDate = async (student, block, students) => {
    const col = collection(db, `Attendance/${block}/0/${student}/Date`);
    const studSnapshot = await getDocs(col);
    const days = studSnapshot.docs.map((doc) => doc.id);
    let extraDays = Array(days.length).fill(120);
    // if (days.length >= tableData.length) {
    setWidthArr((prevWidthArr) => [...prevWidthArr, ...extraDays]);
    // }
    setTableHead([...tableHeadInitial, ...days]);
    // console.log(tableHead);
    const index = students.indexOf(student);
    students.map((stud) =>
      getAttendance(stud, students, index, days[index + 1])
    );
    console.log("++++++++++++++++++++++++++++++++++++++++++");
  };

  const getAttendance = async (stud, students, index, day) => {
    const col = collection(db, `Attendance/${block}/0/${stud}/Date`);
    const studSnapshot = await getDocs(col);
    const days = studSnapshot.docs.map((doc) => doc.data());
    console.log("-------------------------");
    // console.log(days[0]);
    let tableOneData = [];
    days.map((day) => tableOneData.push(day.attendance));
    // console.log(stud, day);
    // console.log(tableOneData[index + 1]);
    // tableOneData.reverse();
    tableExtraData = [...tableExtraData, tableOneData];
    let tableDataPre = tableDataInitial.map((tableDataIni, index) => [
      ...tableDataIni,
      ...tableExtraData[index],
    ]);
    // console.log(tableExtraData);
    setTableData(tableDataPre);
    setIsLoading(false);
  };

  useLayoutEffect(() => {
    getStudents(block);
  }, [block]);

  if (isLoading) {
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

  const closeModule = () => {
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <FilterComponent modalVisible={modalVisible} closeModule={closeModule} />
      <ScrollView horizontal>
        <View>
          <Table borderStyle={{ borderWidth: 2, borderColor: Colors.bg }}>
            <Row
              style={styles.header}
              widthArr={widthArr}
              data={tableHead}
              textStyle={{ ...styles.headerText }}
            />
          </Table>
          <ScrollView contentContainerStyle={styles.dataWrapper}>
            <Table borderStyle={{ borderWidth: 2, borderColor: Colors.bg }}>
              {tableData.map((rowData, index) => (
                <Row
                  key={index}
                  data={rowData}
                  widthArr={widthArr}
                  style={{
                    ...styles.row,
                    ...(index % 2 && { backgroundColor: Colors.absent }),
                  }}
                  textStyle={{ ...styles.text }}
                />
              ))}
            </Table>
          </ScrollView>
        </View>
      </ScrollView>
      <View style={styles.buttonContainer}>
        <MButtonPrimary
          title="Export"
          onPress={() => {
            tableData.splice(0, 0, tableHead);
            exportExcel(tableData, "MyExcelFile");
          }}
        />
        <MButtonPrimary
          title="Filter"
          onPress={() => {
            setModalVisible(true);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    padding: 16,
    paddingTop: 30,
    backgroundColor: Colors.bg,
    alignItems: "center",
  },
  header: {
    height: 60,
    backgroundColor: Colors.text,
  },
  headerText: {
    textAlign: "center",
    fontFamily: "poppins-medium",
  },
  text: {
    textAlign: "center",
    fontFamily: "poppins-regular",
    padding: 6,
  },
  dataWrapper: {
    marginTop: -1,
  },
  row: {
    height: 40,
    backgroundColor: "#E7E6E1",
  },
  buttonContainer: {
    flexDirection: "row",
  },
});

export default ReviewScreen;
