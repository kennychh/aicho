import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const Loading = (props) => {
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
      className="feather feather-loader"
      {...props}
    >
      <Path d="M12 2L12 6" />
      <Path d="M12 18L12 22" />
      <Path d="M4.93 4.93L7.76 7.76" />
      <Path d="M16.24 16.24L19.07 19.07" />
      <Path d="M2 12L6 12" />
      <Path d="M18 12L22 12" />
      <Path d="M4.93 19.07L7.76 16.24" />
      <Path d="M16.24 7.76L19.07 4.93" />
    </Svg>
  )
}

