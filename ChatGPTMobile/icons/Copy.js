import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

export const Copy = (props) => {
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
      className="feather feather-clipboard"
      {...props}
    >
      <Path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2" />
      <Rect x={8} y={2} width={8} height={4} rx={1} ry={1} />
    </Svg>
  );
};
