/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";

export const XnixLineSearch4 = ({ color = "white", className }) => {
  return (
    <svg
      className={`xnix-line-search-4 ${className}`}
      fill="none"
      height="50"
      viewBox="0 0 50 50"
      width="50"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className="path"
        clipRule="evenodd"
        d="M10.4166 23.2198C10.4157 17.1132 14.7286 11.8564 20.7177 10.6642C26.7068 9.47201 32.704 12.6766 35.0417 18.318C37.3793 23.9595 35.4062 30.4666 30.3292 33.8599C25.2521 37.2531 18.4851 36.5874 14.1666 32.2698C11.7658 29.8699 10.4169 26.6144 10.4166 23.2198Z"
        fillRule="evenodd"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
      <path
        className="path"
        d="M32.2688 32.272L39.5834 39.5866"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
      />
    </svg>
  );
};

XnixLineSearch4.propTypes = {
  color: PropTypes.string,
};
