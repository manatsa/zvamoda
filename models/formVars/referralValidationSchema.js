import * as yup from "yup";

export default [
  yup.object().shape({
    referralDate: yup
      .date()
      .typeError(
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
      )
      .required("Please enter referral date."),
    expectedVisitDate: yup
      .date()
      .typeError(
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
      )
      .required("Please enter expected visit date."),
    organisation: yup.string().required("Please enter the organisation."),
    designation: yup.string(),
    attendingOfficer: yup.string(),
    dateAttended: yup
      .date()
      .typeError(
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
      ),
  }),
  yup.object().shape({
    hivStiServicesAvailed: yup.array(), //.of(yup.string().trim()),
    oiArtAvailed: yup.array(),
    srhAvailed: yup.array(),
  }),
  yup.object().shape({
    laboratoryAvailed: yup.array(),
    tbAvailed: yup.array(),
    psychAvailed: yup.array(),
    legalAvailed: yup.array(),
  }),
  yup.object().shape({
    hivStiServicesReq: yup.array(),
    oiArtReq: yup.array(),
    srhReq: yup.array(),
  }),
];
