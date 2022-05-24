import * as yup from "yup";
export default [
  yup.object().shape({
    screenedForTb: yup
      .string()
      .required("Please specify if cleint was screened!"),
    dateScreened: yup
      .date()
      .typeError(
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
      )
      .label("SCREENING DATE")
      .typeError(
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
      )
      .max(new Date(), "Date screened cannot be in future"),
    identifiedWithTb: yup.string().when("screenedForTb", {
      is: (val) => val && val === "0",
      then: yup.string().required("Please specify screening result."),
    }),
    tbSymptoms: yup
      .array()
      .of(yup.string())
      .when(["screenedForTb", "identifiedWithTb"], {
        is: (screened, identified) =>
          screened && identified && screened === "0" && identified === "0",
        then: yup
          .array()
          .min(1, "Please select at least one  identified symptom."),
      }),
    screenedByHcw: yup.string().when(["screenedForTb", "identifiedWithTb"], {
      is: (screened, identified) =>
        screened && identified && screened === "0" && identified === "0",
      then: yup.string().required("Please specify if screened by HCW."),
    }),
    identifiedWithTbByHcw: yup
      .string()
      .when(["screenedForTb", "identifiedWithTb", "screenedByHcw"], {
        is: (screened, identified, screenedByHcw) =>
          screened &&
          identified &&
          screenedByHcw &&
          screened === "0" &&
          identified === "0" &&
          screenedByHcw === "0",
        then: yup.string().required("Please specify HCW screening result."),
      }),
    onTBTreatment: yup.string().when(["screenedForTb", "identifiedWithTb"], {
      is: (screened, identified) =>
        screened && identified && screened === "0" && identified === "0",
      then: yup.string().required("Please specify if on TB Treatment."),
    }),
    dateStartedTreatment: yup
      .date()
      .label("DATE STARTED TREATMENT")
      .typeError(
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
      )
      .max(new Date(), "Future date not allowed here.")
      .when(["screenedForTb", "identifiedWithTb", "onTBTreatment"], {
        is: (screened, identified, treat) =>
          screened &&
          identified &&
          treat &&
          screened === "0" &&
          identified === "0" &&
          treat === "0",
        then: yup.date().required("Please specify date started treatment."),
      }),
    dateCompletedTreatment: yup.date().nullable(),
  }),
  yup.object().shape({
    referredForInvestigation: yup
      .string()
      .required("Please select applicable option."),
    eligibleForIpt: yup.string().required("Please specify client eligibility."),
    referredForIpt: yup.string().when(["eligibleForIpt"], {
      is: (eligible) => eligible && eligible === "0",
      then: yup.string().required("Please specify if client was referred."),
    }),
    onIpt: yup.string().when(["eligibleForIpt"], {
      is: (eligible) => eligible && eligible === "0",
      then: yup
        .string()
        .required("Please specify if client is currently on TPT."),
    }),
    dateStartedIpt: yup
      .date()
      .typeError(
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
      )
      .when(["onIpt", "eligibleForIpt"], {
        is: (onIpt, eligible) =>
          eligible && onIpt && eligible === "0" && onIpt === "0",
        then: yup.date().required("Please specify date client started TPT."),
      }),
    dateCompletedIpt: yup
      .date()
      .nullable()
      .typeError(
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
      ),
    startedOnIpt: yup.string().when("eligibleForIpt", {
      is: (eligible) => eligible && eligible === "0",
      then: yup.string().required("Please specify if client started TPT."),
    }),
    dateStartedOnIpt: yup
      .date()
      .typeError(
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
      )
      .when(["eligibleForIpt", "startedOnIpt"], {
        is: (eligible, started) =>
          eligible && started && eligible === "0" && started === "0",
        then: yup.date().required("Date client started TPT cannot be empty!"),
      }),
    dateCompletedOnIpt: yup
      .date()
      .typeError(
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
      ),
  }),
];
