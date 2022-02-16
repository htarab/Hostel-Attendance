import Teachers from "../../Models/Teachers";

export const TEACHER = "TEACHER";

export const teacher = (details) => {
  return { type: TEACHER, details: details };
};
