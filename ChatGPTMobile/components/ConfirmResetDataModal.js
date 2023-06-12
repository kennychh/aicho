import { AlertModal } from "./AlertModal";

export const ConfirmResetDataModal = ({
  onPress,
  theme,
  visible,
  setVisible,
}) => {
  return (
    <AlertModal
      visible={visible}
      setVisible={setVisible}
      onPress={onPress}
      theme={theme}
      title={"Reset data?"}
      buttonText={"Reset"}
    />
  );
};
