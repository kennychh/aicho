import { InputScreen } from "./InputScreen";

export const MaxTokensScreen = ({
  props,
  theme,
  setMaxTokens,
  maxTokens,
  color,
}) => {
  const navigation = props.navigation;
  return (
    <InputScreen
      props={props}
      theme={theme}
      setValue={setMaxTokens}
      onPress={() => {
        navigation.goBack();
      }}
      value={maxTokens}
      title={"Max tokens"}
      description={
        "Depending on the model used, requests can use up to 4097 tokens shared between prompt and completion."
      }
      placeholder={"Enter max tokens"}
      headerTitle={"Max tokens"}
      buttonText={"Save"}
      keyboardType={"number-pad"}
      showSubtextCta={true}
      color={color}
    />
  );
};
