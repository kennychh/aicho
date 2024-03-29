import * as React from "react";
import Svg, { Circle, Path } from "react-native-svg";

export const About = (props) => {
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
      className="feather feather-help-circle"
      {...props}
    >
      <Circle cx={12} cy={12} r={10} />
      <Path d="M12 16L12 12" />
      <Path d="M12 8L12.01 8" />
    </Svg>
  );
};
