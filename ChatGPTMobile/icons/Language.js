import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Language = (props) => {
  return (
    <Svg
      width="24px"
      height="24px"
      strokeWidth={1.96}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      stroke="#000"
      {...props}
    >
      <Path
        d="M2 5h7m7 0h-2.5M9 5h4.5M9 5V3m4.5 2c-.82 2.735-2.539 5.32-4.5 7.593M4 17.5c1.585-1.359 3.376-3.026 5-4.907m0 0C8 11.5 6.4 9.3 6 8.5m3 4.093l3 2.907m1.5 5.5l1.143-3m6.857 3l-1.143-3m-5.714 0l2.857-7.5 2.857 7.5m-5.714 0h5.714"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
