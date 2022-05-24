import * as yup from "yup";

export default [
  yup.object().shape({
    status: yup.string().required("Status is required"),
    firstName: yup.string().required("First name cannot be empty!"),
    middleName: yup
      .string()
      .nullable()
      .typeError("Middle name can only be text"),
    lastName: yup.string().required("Last name cannot be empty!"),
    IDNumber: yup.string().nullable(),
    gender: yup.string().required("Gender is required"),
    dateOfBirth: yup
      .date()
      .typeError(
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
      )
      .required("Date of birth cannot be empty!")
      .max(new Date(), "Future date not allowed here"),

    oINumber: yup.string().required("OI/ART Number cannot be empty"),
    haveBirthCertificate: yup
      .string()
      .required("Please specify if client has birth certificate."),
    clientType: yup.string(), //.required("Please specify client type."),
  }),
  yup.object().shape({
    maritalStatus: yup
      .string()
      .required("Please specify client's marital status"),
    orphanStatus: yup.string().required("Please specify orphan status"),
    onArvs: yup.string().required("Please specify if client is on ARVs."),
    onCotrimoxazole: yup
      .string()
      .required("Please specify if client is on Cotrimoxazole."),
    artRegimen: yup.string(),
    dateStartedTreatment: yup
      .date()
      .typeError(
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
      )
      .max(new Date(), "Future date not allowed here"),
    disability: yup
      .string()
      .required("Please specify if client has disability."),
    disablityType: yup.string().when("disability", {
      is: (d) => d === "0",
      then: yup.string().required("Please specify disability details"),
    }),
    education: yup
      .string()
      .required("Please specify whether client is in school."),
    educationLevel: yup.string().required("Please specify education level"),
    reasonForNotReachingOLevel: yup
      .string()
      .when(["education", "educationLevel"], {
        is: (edu, level) =>
          level === "95b4ff59-ff34-4177-a6dc-a8bf9c0e6998" &&
          edu === "930006c3-9a6e-4ca8-b66d-ccc457132eba",
        then: yup.string().required("Please specify reason."),
      }),
  }),
  yup.object().shape({
    address: yup.string().required("Please enter client's address."),
    primaryClinic: yup.string().required("Please select primary clinic."),
    supportGroup: yup.string().required("Please select support group."),
    mobileNumber: yup.string().notRequired(),
    mobileOwner: yup.string().when("mobileNumber", {
      is: (num) => num !== "" && num?.length > 0,
      then: yup.string().required("Please specify owner of the mobile phone."),
    }),
    ownerName: yup.string().when("mobileOwner", {
      is: (owner) => owner === "1",
      then: yup.string().required("Please specify owner of mobile phone."),
    }),
    mobileOwnerRelation: yup.string().when("mobileOwner", {
      is: (owner) => owner === "1",
      then: yup.string().required("Please specify relation to phone owner."),
    }),
    secondaryMobileNumber: yup.string().nullable(),
    ownSecondaryMobile: yup.string().nullable(),
    secondaryMobileOwnerName: yup.string().nullable(),
    secondaryMobileownerRelation: yup.string().nullable(),
  }),
  yup.object().shape({
    isKeypopulation: yup
      .string()
      .required("Please specify if client is key population."),
    keyPopulation: yup.string().when("isKeypopulation", {
      is: (k) => k === "0",
      then: yup.string().required("Please specify key population category "),
    }),
    hivStatusKnown: yup
      .string()
      .required("Please specify if HIV status is known"),
    dateTested: yup
      .date()
      .typeError(
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
      )
      .when("hivStatusKnown", {
        is: (h) => h === "0",
        then: yup.date().required("Please specify date tested."),
      })
      .max(new Date(), "Future date not allowed here."),
    disclosureType: yup.string().when("hivStatusKnown", {
      is: (h) => h === "0",
      then: yup.string().required("Please specify disclosure type"),
    }),
    hIVDisclosureLocation: yup.string().when("hivStatusKnown", {
      is: (h) => h === "0",
      then: yup.string().required("Please specify disclosure location."),
    }),
    transmissionMode: yup.string().when("hivStatusKnown", {
      is: (h) => h === "0",
      then: yup.string().required("Please specify mode of transmission."),
    }),
    consentToMHealth: yup.string(),
    dateJoined: yup
      .date()
      .typeError(
        "Invalid date, mus be: yyyy-mm-dd. Make sure: \n1. year has 4 numbers\n2. month and day have 2 characters each."
      )
      .required("Please input date client joined zvandiri.")
      .max(new Date(), "Future date not allowed here"),
  }),
  yup.object().shape({
    selfPrimaryCareGiver: yup.string().required("Please specify"),
    relationship: yup.string().when("selfPrimaryCareGiver", {
      is: (self) => self === "1",
      then: yup.string().required("This field is required"),
    }),
    pfirstName: yup.string().when("selfPrimaryCareGiver", {
      is: (self) => self === "1",
      then: yup.string().required("This field is required"),
    }),
    plastName: yup.string().when("selfPrimaryCareGiver", {
      is: (self) => self === "1",
      then: yup.string().required("This field is required"),
    }),
    pmobileNumber: yup.string(),
    pgender: yup.string().when("selfPrimaryCareGiver", {
      is: (self) => self === "1",
      then: yup.string().required("This field is required"),
    }),
    referer: yup.string().required("Please select referrer."),
    refererName: yup.string().when("referer", {
      is: (self) => self !== "02c39015-0d68-4ea8-9d0a-c482c5861a5b",
      then: yup.string().required("Please specify name of referrer."),
    }),
  }),
];
