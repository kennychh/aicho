import { InputScreen } from "./InputScreen";

export const MaxTokensScreen = ({ props, theme, setMaxTokens, maxTokens }) => {
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
        "Control the length of your completion with the max tokens setting."
      }
      placeholder={"Enter max tokens"}
      headerTitle={"Max tokens"}
      buttonText={"Save"}
      keyboardType={"number-pad"}
      showSubtextCta={true}
    />
  );
};
