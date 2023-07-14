import { useContext } from "react";
import { InputScreen } from "./InputScreen";
import { AppContext } from "../context";

export const TimeoutScreen = ({ props }) => {
  const { theme, setTimeout, timeout, color } = useContext(AppContext);
  const navigation = props.navigation;
  return (
    <InputScreen
      props={props}
      theme={theme}
      setValue={setTimeout}
      onPress={() => {
        navigation.goBack();
      }}
      value={timeout}
      title={"Timeout"}
      description={
        "Control the amount of time allowed (in seconds) for a given request. The maximum execution timeout is 10 seconds."
      }
      placeholder={"Enter timeout"}
      headerTitle={"Timeout"}
      buttonText={"Save"}
      keyboardType={"number-pad"}
      color={color}
    />
  );
};
