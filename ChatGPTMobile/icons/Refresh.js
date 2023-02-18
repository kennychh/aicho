import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Refresh = (props) => {
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
      className="feather feather-refresh-ccw"
      {...props}
    >
      <Path d="M1 4L1 10 7 10" />
      <Path d="M23 20L23 14 17 14" />
      <Path d="M20.49 9A9 9 0 005.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 013.51 15" />
    </Svg>
  );
};
