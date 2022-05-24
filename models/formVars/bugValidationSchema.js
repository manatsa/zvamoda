import * as yup from "yup";

export default yup.object().shape({
  bug: yup.string().required("The bug description cannot be empty!"),
  details: yup.string().nullable(),
});
