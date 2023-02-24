import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const Plus = (props) => {
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
      className="feather feather-plus"
      {...props}
    >
      <Path d="M12 5L12 19" />
      <Path d="M5 12L19 12" />
    </Svg>
  )
}