/*
We're constantly improving the code you see. 
Please share your feedback here: https://form.asana.com/?k=uvp-HPgd3_hyoXRBw1IcNg&d=1152665201300829
*/

import PropTypes from "prop-types";
import React from "react";
import "./style.css";

export const XnixLineStar = ({ className, xnixLineStar = "/img/xnix-line-star.png" }) => {
  return <img className={`xnix-line-star ${className}`} alt="Xnix line star" src={xnixLineStar} />;
};

XnixLineStar.propTypes = {
  xnixLineStar: PropTypes.string,
};
