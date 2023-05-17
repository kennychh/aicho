import * as React from "react";
import Svg, { Path } from "react-native-svg";

export const Pro = (props) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      stroke="#000"
      strokeWidth={2}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785c.351.063.707.095 1.064.094 1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337zM12 9v6m3-3H9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
