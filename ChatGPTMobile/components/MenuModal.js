import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Delete, Plus, Copy, Edit, Edit2 } from "../icons";
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
      openAnimationConfig={{
        timing: { duration: 200 },
        spring: { damping: 100, stiffness: 600 },
      }}
      closeAnimationConfig={{
        timing: { duration: 200 },
        spring: { damping: 100, stiffness: 600 },
      }}
      adjustToContentHeight={true}
      velocity={2000}
    >
      <View style={styles.modalOptionsContainer(theme)}>
        <TouchableOpacity
          onPress={() => {
            modalizeRef.current.close();
            const chatTexts = chatInfo
              .map((chat) => chat.result?.text + "*#")
              .reverse()
              .toString()
              .split("*#,")
              .join("\n\n")
              .replace("*#", "");
            Clipboard.setStringAsync(chatTexts);
          }}
        >
          <View style={styles.modalOption}>
            <Copy stroke={theme.iconColor} />
            <Text style={styles.modalOptionText(theme)}>Copy</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.modalOptionDivider(theme)} />
        <TouchableOpacity
          onPress={() => {
            modalizeRef.current.close();
            setTimeout(() => {
              setIsHeaderEditable(true);
            }, 200);
          }}
        >
          <View style={styles.modalOption}>
            <Edit2 stroke={theme.iconColor} />
            <Text style={styles.modalOptionText(theme)}>Rename</Text>
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
            modalizeRef.current.close();
            setTimeout(() => {
              deleteConvo();
            }, 400);
          }}
        >
          <View style={styles.modalOption}>
            <Delete stroke={"#FF0000"} />
            <Text style={[styles.modalOptionText(theme), { color: "#FF0000" }]}>
              Delete
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
    marginTop: 4,
    backgroundColor: theme.modal.divider.backgroundColor,
  }),
  modalStyle: (theme) => ({
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: theme.modal.backgroundColor,
  }),
  modalOptionText: (theme) => ({
    paddingLeft: 16,
    fontSize: 16,
    lineHeight: 18,
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
