import * as React from "react";
import Svg, { Path, Rect } from "react-native-svg";

export const LightTheme = (props) => {
  return (
    <Svg
      width={56}
      height={108}
      viewBox="0 0 56 108"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8.5 93a6.5 6.5 0 100 13h39a6.5 6.5 0 100-13h-39zM47 103a4 4 0 100-8 4 4 0 000 8z"
        fill="#EFEFEF"
      />
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M8 0a8 8 0 00-8 8v92a8 8 0 008 8h40a8 8 0 008-8V8a8 8 0 00-8-8H8zm1 94a5 5 0 000 10h38a5 5 0 000-10H9zm2.294-86.776a4 4 0 11-8 0 4 4 0 018 0zM24 58a4 4 0 000 8h24a4 4 0 000-8H24zm-4-20a4 4 0 014-4h24a4 4 0 010 8H24a4 4 0 01-4-4zm4 44a4 4 0 000 8h24a4 4 0 000-8H24z"
        fill="#fff"
      />
      <Rect x={4} y={46} width={32} height={8} rx={4} fill="#EFEFEF" />
      <Rect x={4} y={70} width={32} height={8} rx={4} fill="#EFEFEF" />
    </Svg>
  );
};
