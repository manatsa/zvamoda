import * as yup from "yup";
export default yup.object().shape({
  feature: yup.string().required("Feature short description cannot be empty!"),
  purpose: yup.string().required("Feature purpose cannot be empty!"),
  platform: yup.string().required("Specify preferred implementation platform."), // mobile or web
  details: yup.string().nullable(),
});
