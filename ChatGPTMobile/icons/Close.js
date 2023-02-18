import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Close = (props) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="feather feather-x"
      {...props}
    >
      <Path d="M18 6L6 18" />
      <Path d="M6 6L18 18" />
    </Svg>
  );
};
