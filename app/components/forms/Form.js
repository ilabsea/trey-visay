import React from "react";
import { Formik } from "formik";

function AppForm({ initialValues, onSubmit, validationSchema, validateOnChange=true, validateOnBlur=true, children }) {
  return (
    <Formik
      validateOnChange={validateOnChange}
      validateOnBlur={validateOnBlur}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}

export default AppForm;
