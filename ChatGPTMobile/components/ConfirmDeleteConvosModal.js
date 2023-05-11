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

export const ConfirmDeleteConvosModal = ({
  setChatIndex,
  setChats,
  setDeleteChat,
  setChatTitles,
  setInput,
  setEditMessage,
  theme,
  modalizeRef,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <Modalize
      ref={modalizeRef}
      modalStyle={styles.modalStyle(theme)}
      handleStyle={styles.handleStyle(theme)}
      handlePosition={"inside"}
      childrenStyle={styles.childrenStyle}
      adjustToContentHeight={true}
    >
      <View style={{ marginTop: 32 }}>
        <Text style={[styles.modalOptionTitleText(theme)]}>
          Delete all conversations?
        </Text>
        <View
          style={[
            styles.modalOptionsContainer(theme),
            { marginTop: 32, marginBottom: insets.bottom + 8 },
          ]}
        >
          <TouchableOpacity
            onPress={() => {
              setDeleteChat(true);
              setChats([[]]);
              setChatIndex(0);
              setChatTitles(["New chat"]);
              setInput("");
              setEditMessage(null);
              modalizeRef.current?.close();
            }}
          >
            <View style={styles.modalOption}>
              <Text
                style={[styles.modalOptionText(theme), { color: "#FF0000" }]}
              >
                Delete
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </Modalize>
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
