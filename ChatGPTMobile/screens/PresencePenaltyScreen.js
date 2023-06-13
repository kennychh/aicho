import { InputScreen } from "./InputScreen";

export const PresencePenaltyScreen = ({
  props,
  theme,
  setPresencePenalty,
  presencePenalty,
  color,
}) => {
  const navigation = props.navigation;
  return (
    <InputScreen
      props={props}
      theme={theme}
      setValue={setPresencePenalty}
      onPress={() => {
        navigation.goBack();
      }}
      value={presencePenalty}
      title={"Presence penalty"}
      description={
        "Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics."
      }
      placeholder={"Enter presence penalty"}
      headerTitle={"Presence penalty"}
      buttonText={"Save"}
      keyboardType={"numbers-and-punctuation"}
      showSubtextCta={true}
      color={color}
    />
  );
};
