import {
  View,
  Text,
  StyleSheet,
  Switch,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { Modalize } from "react-native-modalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { BottomModal } from "./BottomModal";

export const ConfirmDeleteConvosModal = ({
  setChatIndex,
  setChats,
  setDeleteChat,
  setChatTitles,
  setInput,
  setEditMessage,
  theme,
  modalizeRef,
  confirmDeleteVisible,
  setChatDateCreated,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <BottomModal
      visible={confirmDeleteVisible}
      onPress={() => {
        setDeleteChat(true);
        setChats([[]]);
        setChatDateCreated([new Date().toString()]);
        setChatIndex(0);
        setChatTitles(["New chat"]);
        setInput("");
        setEditMessage(null);
      }}
      theme={theme}
      title={"Clear conversations?"}
      buttonText={"Delete"}
      description={"This will delete all conversations from your device."}
    />
  );
};

const styles = StyleSheet.create({
  childrenStyle: {},
  handleStyle: (theme) => ({
    width: 40,
    height: 4,
    backgroundColor: theme.modal.divider.backgroundColor,
  }),
  modalStyle: (theme) => ({
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: theme.modal.backgroundColor,
  }),
  modalOptionText: (theme) => ({
    fontSize: 16,
    lineHeight: 18,
    alignSelf: "center",
    fontWeight: "500",
    color: theme.fontColor,
  }),
  modalOptionTitleText: (theme) => ({
    fontSize: 16,
    lineHeight: 18,
    alignSelf: "center",
    fontWeight: "500",
    color: theme.fontColor,
  }),
  modalOption: {
    width: "100%",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  modalOptionsContainer: (theme) => ({
    marginTop: 40,
    backgroundColor: theme.modal.container.backgroundColor,
    borderRadius: 16,
  }),
});
