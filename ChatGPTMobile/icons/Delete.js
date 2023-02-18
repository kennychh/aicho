import * as React from "react"
import Svg, { Path } from "react-native-svg"

export const Delete = (props) => {
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
      className="feather feather-trash-2"
      {...props}
    >
      <Path d="M3 6L5 6 21 6" />
      <Path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
      <Path d="M10 11L10 17" />
      <Path d="M14 11L14 17" />
    </Svg>
  )
}
