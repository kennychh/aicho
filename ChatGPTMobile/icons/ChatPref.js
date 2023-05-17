import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const ChatPref = (props) => {
  return (
    <Svg
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#000"
      strokeWidth={2}
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G
        clipPath="url(#clip0_1_2)"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M18.5 2.5a2.121 2.121 0 113 3L12 15l-4 1 1-4 9.5-9.5z" />
        <Path d="M20 12.25c0 4.556-4.03 8.25-9 8.25a9.743 9.743 0 01-2.555-.337A5.972 5.972 0 015 21.25c-.357 0-.713-.03-1.064-.094a4.483 4.483 0 00.923-1.785c.154-.601-.154-1.194-.586-1.641C2.859 16.273 2 14.354 2 12.25 2 7.694 6.03 4 11 4" />
      </G>
      <Defs>
        <ClipPath id="clip0_1_2">
          <Path fill="#fff" d="M0 0H24V24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
