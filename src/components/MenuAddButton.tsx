import React, { ButtonHTMLAttributes, FC } from "react";
import "./MenuAddButton.css";

// apologies for the scary TS type (multiple layers of generics),
// gotta do what ya gotta do to get a HTML <button> with a single class applied w/o losing other TS info 🤷
export const MenuAddButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  ...rest
}) => {
  return (
    <button className="btn-green" {...rest}>
      {children}
    </button>
  );
};
