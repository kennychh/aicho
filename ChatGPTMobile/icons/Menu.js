import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Menu = (props) => {
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
      className="feather feather-menu"
      {...props}
    >
      <Path d="M3 12L21 12" />
      <Path d="M3 6L21 6" />
      <Path d="M3 18L21 18" />
    </Svg>
  );
};
