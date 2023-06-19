import { InputScreen } from "./InputScreen";

export const AccountScreen = ({
  props,
  theme,
  setKey,
  apiKey,
  setKeyChanged,
  color,
}) => {
  const navigation = props.navigation;
  return (
    <InputScreen
      props={props}
      theme={theme}
      secureTextEntry={true}
      setValue={setKey}
      onPress={() => {
        setKeyChanged(true);
        navigation.goBack();
      }}
      value={apiKey}
      title={"OpenAI API key"}
      description={
        "Set your OpenAI API key to start a conversation! Login to OpenAI to access your API key."
      }
      placeholder={"Enter API key"}
      headerTitle={"Account"}
      buttonText={"Save"}
      color={color}
    />
  );
};
