import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export const Sun = (props) => {
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
      className="feather feather-sun"
      {...props}
    >
      <Circle cx={12} cy={12} r={5} />
      <Path d="M12 1L12 3" />
      <Path d="M12 21L12 23" />
      <Path d="M4.22 4.22L5.64 5.64" />
      <Path d="M18.36 18.36L19.78 19.78" />
      <Path d="M1 12L3 12" />
      <Path d="M21 12L23 12" />
      <Path d="M4.22 19.78L5.64 18.36" />
      <Path d="M18.36 5.64L19.78 4.22" />
    </Svg>
  );
};
