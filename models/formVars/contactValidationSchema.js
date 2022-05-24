import * as yup from "yup";

export default [
  yup.object({
    contactDate: yup
      .date()
      .typeError(
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
      )
      .max(new Date(), "Date must be today or  in the past.")
      .required("Please select date of contact"),
    location: yup.string().required("Please specify contact location"),
    contactPhoneOption: yup
      .string()
      .when("location", {
        is: (location) => location === "96b65c7e-b03d-4f2d-8b18-cc3aeb3091db",
        then: yup.string().required("Phone option is to be selected"),
      })
      .transform((cp) =>
        yup.ref("location").getValue() !==
        "96b65c7e-b03d-4f2d-8b18-cc3aeb3091db"
          ? cp
          : ""
      ),
    numberOfSms: yup.string().when(["location", "phoneContactOption"], {
      is: (loc, phoneOption) =>
        loc === "96b65c7e-b03d-4f2d-8b18-cc3aeb3091db" && phoneOption === "1",
      then: yup.string().required("How many SMSes?"),
    }),
    supportGroupTheme: yup.string().when("location", {
      is: (loc) =>
        loc === "f8556945-06a1-469e-bec0-e722c807cec9" ||
        loc === "2ac6420c-52b0-40f7-b1d3-9499d4119b47",
      then: yup.string().required("Please enter support group theme."),
    }),
    careLevel: yup
      .string()
      .required("Please select care level before assessment"),
    careLevelAfterAssessment: yup
      .string()
      .required("Please select care level after assessment"),
    lastClinicAppointmentDate: yup
      .date()
      .typeError(
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
      )
      .max(new Date(), "Date must be in the past!")
      .required("Enter last clinic appointment date."),
    nextClinicAppointmentDate: yup
      .date()
      .typeError(
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
      )
      .required("Enter next clinic appointment date."),
    attendedClinicAppointment: yup
      .string()
      .required("Please specify if attended last appointment."),
  }),
  yup.object().shape({
    clinicalAssessments: yup.array(),
  }),
  yup.object().shape({
    nonClinicalAssessments: yup.array(),
  }),

  yup.object({
    position: yup.string().required("Please select your position"),
    contactMadeBy: yup
      .string()
      .required("Please enter name of cadre who made contact")
      .test("full-name", "Please enter both firstname and surname", (value) => {
        return value && value?.split(" ").length >= 2;
      }),
    eac: yup.string().required("Please specify if done."),
    whichEac: yup.string().when("eac", {
      is: (eac) => eac && eac === "0",
      then: yup
        .string()
        .required("Please specify which EAC session was conducted."),
    }),
    serviceOffereds: yup.array().notRequired(),
  }),
];
