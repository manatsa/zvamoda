import { Formik } from "formik";
import React from "react";

const AppForm = ({ initialValues, onSubmit, validationSchema, children }) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
      validationSchema={validationSchema}
      validateOnChange={false}
    >
      {({ resetForm }) => children}
    </Formik>
  );
};

export default AppForm;
