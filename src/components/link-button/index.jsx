import React from "react";

export default function LinkButton(props) {
  return (
    <button
      onClick={() => props.onClick && props.onClick()}
      style={{
        border: "none",
        backgroundColor: "transparent",
        cursor: "pointer",
        color: props.color ? props.color : "blue",
      }}
    >
      {props.children}
    </button>
  );
}
