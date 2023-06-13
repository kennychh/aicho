import { InputScreen } from "./InputScreen";

export const TemperatureScreen = ({
  props,
  theme,
  setTemperature,
  temperature,
  color,
}) => {
  const navigation = props.navigation;
  return (
    <InputScreen
      props={props}
      theme={theme}
      setValue={setTemperature}
      onPress={() => {
        navigation.goBack();
      }}
      value={temperature}
      title={"Temperature"}
      description={
        "What sampling temperature to use, between 0 and 2. Higher values like 0.8 will make the output more random, while lower values like 0.2 will make it more focused and deterministic."
      }
      placeholder={"Enter temperature"}
      headerTitle={"Temperature"}
      buttonText={"Save"}
      keyboardType={"numbers-and-punctuation"}
      showSubtextCta={true}
      color={color}
    />
  );
};
