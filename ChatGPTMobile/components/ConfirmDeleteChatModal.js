import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomModal } from "./BottomModal";

export const ConfirmDeleteChatModal = ({ onPress, theme, visible }) => {
  const insets = useSafeAreaInsets();
  return (
    <BottomModal
      visible={visible}
      onPress={onPress}
      theme={theme}
      title={"Clear conversations?"}
      buttonText={"Delete"}
      description={"This will delete this chat from your device."}
    />
  );
};
