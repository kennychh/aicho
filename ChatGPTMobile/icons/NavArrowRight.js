import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const NavArrowRight = (props) => {
  return (
    <Svg
      width="24px"
      height="24px"
      strokeWidth={2}
      viewBox="0 0 24 24"
      stroke="#000"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M9 6l6 6-6 6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
