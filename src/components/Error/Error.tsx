import React from "react";

export const Error = ({ error }: { error?: string }) => {
  if (!error) return null;
  return (
    <p role="alert" style={{ color: "#f00", fontSize: "10px" }}>
      {error}
    </p>
  );
};
