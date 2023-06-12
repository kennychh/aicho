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
import { AlertModal } from "./AlertModal";

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
  setConfirmDeleteVisible,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <AlertModal
      visible={confirmDeleteVisible}
      setVisible={setConfirmDeleteVisible}
      onPress={() => {
        setDeleteChat(true);
        setChats([[]]);
        setChatIndex(0);
        setChatTitles(["New chat"]);
        setInput("");
        setEditMessage(null);
        setConfirmDeleteVisible(false);
      }}
      theme={theme}
      title={"Delete conversations?"}
      buttonText={"Delete"}
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
    alignSelf: "center",
    fontWeight: "500",
    color: theme.fontColor,
  }),
  modalOptionTitleText: (theme) => ({
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "500",
    color: theme.fontColor,
  }),
  modalOptionDivider: (theme) => ({
    width: "100%",
    height: 1,
    backgroundColor: theme.modal.divider.backgroundColor,
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
