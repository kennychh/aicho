import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomModal } from "./BottomModal";
import { useContext } from "react";
import { AppContext } from "../context";

export const ConfirmDeleteChatModal = ({ onPress, visible }) => {
  const { theme } = useContext(AppContext);
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
