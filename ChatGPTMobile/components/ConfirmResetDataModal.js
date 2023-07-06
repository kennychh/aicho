import { BottomModal } from "./BottomModal";

export const ConfirmResetDataModal = ({
  onPress,
  theme,
  visible,
}) => {
  return (
    <BottomModal
      visible={visible}
      onPress={onPress}
      theme={theme}
      title={"Reset data?"}
      buttonText={"Reset"}
      description={"This will reset your conversation and preference data."}
    />
  );
};
