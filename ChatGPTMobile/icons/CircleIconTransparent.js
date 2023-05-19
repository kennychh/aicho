import * as React from "react";
import Svg, { G, Path, Defs } from "react-native-svg";
/* SVGR has dropped some elements not supported by react-native-svg: filter */

export const CircleIconTransparent = (props) => {
  return (
    <Svg
      width={60}
      height={60}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <G filter="url(#filter0_d_80417_131)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M17.567 22.162a7.838 7.838 0 100 15.676h24.865a7.838 7.838 0 000-15.676H17.567zm0 11.622a3.784 3.784 0 100-7.568 3.784 3.784 0 000 7.568zM46.218 30a3.784 3.784 0 11-7.568 0 3.784 3.784 0 017.567 0zM26.92 32.098a.81.81 0 00-1.409.802l.705-.4-.704.4v.002l.003.004.005.01.017.029.06.097a7.3 7.3 0 001.062 1.292c.725.697 1.862 1.477 3.341 1.477 1.48 0 2.617-.78 3.34-1.476a7.298 7.298 0 001.123-1.39l.017-.03.006-.009.002-.003V32.9l-.704-.4.705.4a.81.81 0 00-1.41-.803v.001l-.007.013a3.46 3.46 0 01-.203.303c-.15.206-.37.48-.652.75-.577.555-1.331 1.024-2.217 1.024-.886 0-1.64-.47-2.217-1.023a5.668 5.668 0 01-.855-1.054l-.007-.013v-.001z"
          fill="#fff"
        />
      </G>
      <Defs></Defs>
    </Svg>
  );
};

