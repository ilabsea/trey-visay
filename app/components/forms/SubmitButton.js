import React from "react";
import { useFormikContext } from "formik";

import FooterBar from "../footer/FooterBar";

function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();

  return <FooterBar icon='keyboard-arrow-right' text={title} onPress={handleSubmit} />
}

export default SubmitButton;
