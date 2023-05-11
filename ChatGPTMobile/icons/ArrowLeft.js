import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const ArrowLeft = (props) => {
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
      className="feather feather-arrow-left"
      {...props}
    >
      <Path d="M19 12L5 12" />
      <Path d="M12 19L5 12 12 5" />
    </Svg>
  );
};
