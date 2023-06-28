import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Delete, Plus, Copy, Edit } from "../icons";
import { Modalize } from "react-native-modalize";
import * as Clipboard from "expo-clipboard";
export const MenuModal = ({
  deleteConvo,
  modalizeRef,
  onClose,
  setChats,
  headerTextInputRef,
  setIsHeaderEditable,
  theme,
  chatInfo,
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
      <View style={styles.modalOptionsContainer(theme)}>
        <TouchableOpacity
          onPress={() => {
            setIsHeaderEditable(true);
            onClose(modalizeRef);
          }}
        >
          <View style={styles.modalOption}>
            <Edit stroke={theme.iconColor} />
            <Text style={styles.modalOptionText(theme)}>Edit title</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.modalOptionDivider(theme)} />
        <TouchableOpacity
          onPress={() => {
            const chatTexts = chatInfo
              .map((chat) => chat.result?.text + "*#")
              .reverse()
              .toString()
              .split("*#,")
              .join("\n\n")
              .replace("*#", "");
            Clipboard.setStringAsync(chatTexts);
            onClose(modalizeRef);
          }}
        >
          <View style={styles.modalOption}>
            <Copy stroke={theme.iconColor} />
            <Text style={styles.modalOptionText(theme)}>Copy conversation</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.modalOptionsContainer(theme),
          { marginTop: 16, marginBottom: insets.bottom + 8 },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            deleteConvo();
            onClose(modalizeRef);
          }}
        >
          <View style={styles.modalOption}>
            <Delete stroke={"#FF0000"} />
            <Text style={[styles.modalOptionText(theme), { color: "#FF0000" }]}>
              Delete conversation
            </Text>
          </View>
        </TouchableOpacity>
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
    paddingLeft: 16,
    fontSize: 16,
    alignSelf: "center",
    // fontWeight: "500",
    paddingVertical: 16,
    color: theme.fontColor,
  }),
  modalOptionDivider: (theme) => ({
    width: "100%",
    height: 0.5,
    backgroundColor: theme.modal.divider.backgroundColor,
  }),
  modalOption: {
    width: "100%",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  modalOptionsContainer: (theme) => ({
    marginTop: 40,
    backgroundColor: theme.modal.container.backgroundColor,
    width: "100%",
    borderRadius: 16,
  }),
});
