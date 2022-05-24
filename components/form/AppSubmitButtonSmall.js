import { useFormikContext } from "formik";
import React from "react";
import AppButton from "../wrappers/AppButton";
import AppButtonSmall from "../wrappers/AppButtonSmall";

function AppSubmitButtonSmall({ title }) {
  const { handleSubmit } = useFormikContext();
  return <AppButtonSmall title={title} onPress={handleSubmit} />;
}

export default AppSubmitButtonSmall;
