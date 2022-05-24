import { useFormikContext } from "formik";
import React from "react";
import LoadingButton from "../wrappers/LoadingButton";

function AppFormLoadingSubmit({ isLoading, title, loadingLabel, color }) {
  const { handleSubmit, values, errors } = useFormikContext();
  return (
    <LoadingButton
      title={title}
      onPress={handleSubmit}
      isLoading={isLoading}
      loadingLabel={loadingLabel}
      color={color}
    />
  );
}

export default AppFormLoadingSubmit;
