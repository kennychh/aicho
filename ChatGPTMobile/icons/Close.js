import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg"

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
      className="feather feather-x-circle"
      {...props}
    >
      <Circle cx={12} cy={12} r={10} />
      <Path d="M15 9L9 15" />
      <Path d="M9 9L15 15" />
    </Svg>
  );
};
