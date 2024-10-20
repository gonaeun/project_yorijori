/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import { XnixLineStar10 } from "../../icons/XnixLineStar10";
import "./style.css";

export const DivWrapper = ({
  className,
  text = "핸드폰 번호 입력",
  icon = <XnixLineStar10 className="xnix-line-star-10" />,
}) => {
  return (
    <div className={`div-wrapper ${className}`}>
      <div className="text-wrapper">{text}</div>
      {icon}
    </div>
  );
};

DivWrapper.propTypes = {
  text: PropTypes.string,
};
