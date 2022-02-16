import Students from "../../Models/Students";
import { STUDENT } from "../Action/students";
import { firestore, setDoc, doc } from "../../Firebase/firbase";

const initialState = {
  students: [],
};

const dataStudent = (userDetails) => {
  setDoc(
    doc(
      firestore,
      userDetails.profession,
      `${userDetails.block}`,
      "Floor",
      `${userDetails.room.charAt(0)}`,
      `${userDetails.room}`,
      `${userDetails.phone}`
    ),
    {
      userDetails,
    }
  );
};
const dataStudents = (userDetails) => {
  setDoc(
    doc(
      firestore,
      "Students",
    ),
    {
      phone: userDetails.phone,
    }
  );
};

const studentsReducer = (state = initialState, action) => {
  switch (action.type) {
    case STUDENT:
      dataStudent(action.details);
      dataStudents(action.details.phone);
      return {
        ...state,
        students: action.details,
      };
    default:
      return state;
  }
};

export default studentsReducer;
