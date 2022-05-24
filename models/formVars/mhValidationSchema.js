import * as yup from "yup";

export default yup.object().shape({
  screenedForMentalHealth: yup
    .string()
    .label("SCREENED_FOR_MH")
    .required("Please specify if screening was done."),
  dateScreened: yup
    .date()
    .typeError(
      "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
    )
    .label("DATE_SCREENED")
    .when("screenedForMentalHealth", {
      is: (val) => val && val === "0",
      then: yup.date().required("Please specify screening date."),
    }),
  risk: yup.string().when("screenedForMentalHealth", {
    is: (val) => val && val === "0",
    then: yup.string().required("Please specify if at risk."),
  }),
  identifiedRisks: yup
    .array()
    .of(yup.string())
    .notRequired()
    .when("risk", {
      is: (val) => val && val === "0",
      then: yup.array().min(1, "Please select at least one risk identified."),
    }),
  support: yup.string().when("risk", {
    is: (val) => val === "0",
    then: yup.string().required("Please specify client support."),
  }),
  supports: yup
    .array()
    .of(yup.string())
    .when("support", {
      is: (val) => val && val === "0",
      then: yup.array().min(1, "Please specify support source for the client."),
    }),
  referral: yup.string().when("risk", {
    is: (val) => val && val === "0",
    then: yup.string().required("Please specify if client has been referred."),
  }),
});
