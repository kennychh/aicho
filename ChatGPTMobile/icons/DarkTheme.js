import * as React from "react";
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg";

export const DarkTheme = (props) => {
  return (
    <Svg
      width={52}
      height={100}
      viewBox="0 0 52 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G clipPath="url(#clip0_13_29)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M8 87.2a4.8 4.8 0 000 9.6h36a4.8 4.8 0 000-9.6H8zM44 96a4 4 0 100-8 4 4 0 000 8z"
          fill="#262626"
        />
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 4.8A4.8 4.8 0 014.8 0h42.4A4.8 4.8 0 0152 4.8v90.4a4.8 4.8 0 01-4.8 4.8H4.8A4.8 4.8 0 010 95.2V4.8zM3.2 92A4.8 4.8 0 018 87.2h36a4.8 4.8 0 010 9.6H8A4.8 4.8 0 013.2 92zM16 38.8a3.6 3.6 0 013.6-3.6h25.6a3.6 3.6 0 110 7.2H19.6a3.6 3.6 0 01-3.6-3.6zm3.6 38a3.6 3.6 0 100 7.2h25.6a3.6 3.6 0 100-7.2H19.6zM16 59.6a3.6 3.6 0 013.6-3.6h25.6a3.6 3.6 0 110 7.2H19.6a3.6 3.6 0 01-3.6-3.6zM7.2 11.2a4 4 0 100-8 4 4 0 000 8z"
          fill="#000"
        />
        <Path
          d="M32.4 66.4H6.8a3.6 3.6 0 000 7.2h25.6a3.6 3.6 0 000-7.2zM32.4 45.6H6.8a3.6 3.6 0 000 7.2h25.6a3.6 3.6 0 000-7.2zM32.4 24.8H6.8a3.6 3.6 0 000 7.2h25.6a3.6 3.6 0 000-7.2z"
          fill="#262626"
        />
      </G>
      <Defs>
        <ClipPath id="clip0_13_29">
          <Path fill="#fff" d="M0 0H52V100H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  );
};
