import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Check = (props) => {
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
      className="lucide lucide-check"
      {...props}
    >
      <Path d="M20 6L9 17 4 12" />
    </Svg>
  );
};
