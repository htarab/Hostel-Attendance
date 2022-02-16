import Students from "../../Models/Students";

export const STUDENT = "STUDENT";

export const student = (details) => {
  return { type: STUDENT, details: details };
};
