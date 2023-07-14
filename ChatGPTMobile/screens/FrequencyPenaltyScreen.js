import { useContext } from "react";
import { InputScreen } from "./InputScreen";
import { AppContext } from "../context";

export const FrequencyPenaltyScreen = ({ props }) => {
  const navigation = props.navigation;
  const { theme, setFrequencyPenalty, frequencyPenalty, color } =
    useContext(AppContext);
  return (
    <InputScreen
      props={props}
      theme={theme}
      setValue={setFrequencyPenalty}
      onPress={() => {
        navigation.goBack();
      }}
      value={frequencyPenalty}
      title={"Frequency penalty"}
      description={
        "Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim."
      }
      placeholder={"Enter frequency penalty"}
      headerTitle={"Frequency penalty"}
      buttonText={"Save"}
      keyboardType={"numbers-and-punctuation"}
      showSubtextCta={true}
      color={color}
    />
  );
};
