import * as React from "react";
import Svg, { Path, Circle } from "react-native-svg";

export const User = (props) => {
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
      className="feather feather-user"
      {...props}
    >
      <Path
        d="M5 20v-1a7 7 0 017-7v0a7 7 0 017 7v1m-7-8a4 4 0 100-8 4 4 0 000 8z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
