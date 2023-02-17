import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

export const Send = (props) => {
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
      className="feather feather-send"
      {...props}
    >
      <Path d="M22 2L11 13" />
      <Path d="M22 2L15 22 11 13 2 9 22 2z" />
    </Svg>
  )
}