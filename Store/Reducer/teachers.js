import { TEACHER } from "../Action/teachers";
import { firestore, setDoc, doc } from "../../Firebase/firbase";

const initialState = {
  teachers: [],
};

const dataTeachers = (userDetails) => {
  setDoc(
    doc(
      firestore,
      userDetails.profession,
      `${userDetails.phone}`
    ),
    {
      userDetails,
    }
  );
};

const teachersReducer = (state = initialState, action) => {
  switch (action.type) {
    case TEACHER:
      dataTeachers(action.details);
      return {
        ...state,
        teachers: action.details,
      };
    default:
      return state;
  }
};

export default teachersReducer;
