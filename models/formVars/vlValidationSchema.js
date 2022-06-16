import * as yup from "yup";

const tomorrow = new Date(new Date().setDate(new Date().getDate() + 1));
export default [
  yup.object({
    dateTaken: yup
      .date()
      .typeError(
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
      )
      .required("Please choose a date taken.")
      .test(
        "is-valid-year",
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each.",
        (value) => !value || (value && String(value.getFullYear()).length == 4)
      )
      .max(tomorrow, "Date taken cannot be in the future."),
    testType: yup.string().required("Please select the type of test."),
    source: yup.string().when("testType", {
      is: (test) => test === "1",
      then: yup.string().required("Please select source"),
    }),
  }),
  yup.object().shape({
    haveResult: yup
      .string()
      .required("Please specify if results are available."),
    result: yup
      .string()
      .when("haveResult", {
        is: (res) => res === "0",
        then: yup.string().required("Please enter the result."),
      })
      .test(
        "is-valid-result",
        "The given ${path} is not  valid ",
        (value) =>
          !value ||
          value === "" ||
          (value && value?.toLocaleLowerCase() === "tnd") ||
          (value && isNaN(value) === false)
      ),
    tnd: yup.string(),
    nextTestDate: yup
      .date()
      .typeError(
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
      )
      .test(
        "is-valid-year",
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each.",
        (value) => !value || (value && String(value.getFullYear()).length == 4)
      )
      .when("haveResult", {
        is: (val) => val === "0",
        then: yup.date().required("Next test date must be selected."),
      })
      .test(
        "is-valid-year",
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each.",
        (value) => !value || (value && String(value.getFullYear()).length == 4)
      ),
  }),
];
