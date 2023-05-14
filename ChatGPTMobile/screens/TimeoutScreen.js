import { InputScreen } from "./InputScreen";

export const TimeoutScreen = ({ props, theme, setTimeout, timeout }) => {
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
        "Control the amount of time allowed (in seconds) for a given request."
      }
      placeholder={"Enter timeout"}
      headerTitle={"Timeout"}
      buttonText={"Save"}
      keyboardType={"number-pad"}
    />
  );
};