import * as yup from "yup";

export default [
  yup.object({
    dateTaken: yup
      .date()
      .typeError(
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
      )
      .required("Please choose a date taken."),
    testType: yup.string().required("Please select the type of test."),
    source: yup.string().when("testType", {
      is: (test) => test === "1",
      then: yup.string().required("Please select source"),
    }),
    nextTestDate: yup
      .date()
      .typeError(
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
      )
      .required("Next test date must be selected."),
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
  }),
];
