import { useContext } from "react";
import { InputScreen } from "./InputScreen";
import { AppContext } from "../context";

export const AccountScreen = ({ props }) => {
  const navigation = props.navigation;
  const { theme, setKey, key, setKeyChanged, color } = useContext(AppContext);
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
      value={key}
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
