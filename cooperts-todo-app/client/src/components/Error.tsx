import { HttpError } from "ajaxian";
import * as React from "react";

interface Props {
  error: HttpError;
}
const CustomError: React.FC<Props> = ({ error }) => {
  if (error) {
    switch (error.kind) {
      case "bad-status":
      case "bad-url":
      case "network-error":
      case "timeout":
        return (
          <div style={{ backgroundColor: "red" }}>Something went wrong</div>
        );
      case "bad-payload":
        return <div style={{ backgroundColor: "red" }}>{error.message}</div>;
      default:
        return <></>;
    }
  }
};

export default CustomError;
