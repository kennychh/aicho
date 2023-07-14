import { useContext } from "react";
import { InputScreen } from "./InputScreen";
import { AppContext } from "../context";

export const TemperatureScreen = ({ props }) => {
  const navigation = props.navigation;
  const { theme, setTemperature, temperature, color } = useContext(AppContext);
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
