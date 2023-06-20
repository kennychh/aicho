import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Copy, Edit, Refresh } from "../icons";
import { Modalize } from "react-native-modalize";
import * as Clipboard from "expo-clipboard";

export const MessageModal = ({
  textInputRef,
  message,
  modalizeRef,
  onClose,
  setMessage,
  setEditMessage,
  setInput,
  theme,
}) => {
  const isInput = message?.isInput;
  const isError = message?.isError;
  const text = message?.result?.text || "";
  const insets = useSafeAreaInsets();
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(text);
  };
  const retryInput = {
    ...message,
    isError: false,
  };
  return (
    <Modalize
      ref={modalizeRef}
      modalStyle={styles.modalStyle(theme)}
      handleStyle={styles.handleStyle(theme)}
      handlePosition={"inside"}
      childrenStyle={styles.childrenStyle}
      adjustToContentHeight={true}
      onClose={() => setMessage(null)}
    >
      <View
        style={[
          styles.modalOptionsContainer(theme),
          { marginBottom: insets.bottom + 8 },
        ]}
      >
        {/* {isError && (
          <View>
            <TouchableOpacity
              onPress={() => {
                onClose(modalizeRef);
                setRetry(retryInput);
                setError(false);
                setMessage(null);
              }}
            >
              <View style={styles.modalOption}>
                <Refresh />
                <Text style={styles.modalOptionText}>Try again</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.modalOptionDivider} />
          </View>
        )} */}
        <TouchableOpacity
          onPress={() => {
            copyToClipboard();
            onClose(modalizeRef);
            setMessage(null);
          }}
        >
          <View style={styles.modalOption}>
            <Copy stroke={theme.iconColor} />
            <Text style={styles.modalOptionText(theme)}>Copy</Text>
          </View>
        </TouchableOpacity>
        {isInput && (
          <View>
            <TouchableOpacity
              onPress={() => {
                onClose(modalizeRef);
                setMessage(null);
                setEditMessage(message);
                setInput(text);
              }}
              style={{
                borderTopColor: theme.modal.divider.backgroundColor,
                borderTopWidth: 0.5,
              }}
            >
              <View style={styles.modalOption}>
                <Edit stroke={theme.iconColor} />
                <Text style={styles.modalOptionText(theme)}>Edit</Text>
              </View>
            </TouchableOpacity>
          </View>
        )}
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
    fontWeight: "500",
    color: theme.fontColor,
    paddingVertical: 16,
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
