import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Undo = (props) => {
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
      className="lucide lucide-undo"
      {...props}
    >
      <Path d="M3 7v6h6" />
      <Path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13" />
    </Svg>
  );
};
