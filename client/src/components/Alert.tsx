import React, { useState } from "react";

export type AlertType = "info" | "warn" | "error";

interface PropAlert {
  message: string;
  type: AlertType;
  show: boolean;
  setShow: () => void;
}

export const Alert: React.FC<PropAlert> = ({message, type, show, setShow}) => {

  return <div>{message}</div>;
};

export default React.memo(Alert);
