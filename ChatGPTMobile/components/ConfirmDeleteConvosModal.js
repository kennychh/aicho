import {
  View,
  Text,
  StyleSheet,
  Switch,
  useColorScheme,
  TouchableOpacity,
} from "react-native";
import { BottomModal } from "./BottomModal";
import { useContext } from "react";
import { AppContext } from "../context";

export const ConfirmDeleteConvosModal = () => {
  const {
    setChatIndex,
    handleChats,
    setDeleteChat,
    setChatDetails,
    setInput,
    handleEditMessage,
    theme,
    confirmDeleteVisible,
  } = useContext(AppContext);
  return (
    <BottomModal
      visible={confirmDeleteVisible}
      onPress={() => {
        setDeleteChat(true);
        handleChats([[]]);
        setChatIndex(0);
        setChatDetails([["New chat", new Date().toString()]]);
        setInput("");
        handleEditMessage(null);
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
