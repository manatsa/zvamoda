import * as yup from "yup";

export default yup.object().shape({
  message: yup
    .string()
    .required("You cant send an empty message.")
    .min(3, "Minimum message length allowed is 3 characters"),
  details: yup.string().nullable(),
});
