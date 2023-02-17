import * as React from "react"
import Svg, { G, Path, Defs, ClipPath } from "react-native-svg"

export const ArrowUp = (props) => {
  return (
    <Svg
      width="24px"
      height="24px"
      viewBox="0 0 24 24"
      strokeWidth={2}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      color="#000"
      {...props}
    >
      <G
        clipPath="url(#send-diagonal_svg__clip0_2476_13290)"
        stroke="#fff"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <Path d="M22.152 3.553L11.178 21.004l-1.67-8.596L2 7.898l20.152-4.345zM9.456 12.444l12.696-8.89" />
      </G>
      <Defs>
        <ClipPath id="send-diagonal_svg__clip0_2476_13290">
          <Path fill="#fff" d="M0 0h24v24H0z" />
        </ClipPath>
      </Defs>
    </Svg>
  )
}