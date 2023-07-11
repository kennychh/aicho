import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { PanModal } from "./PanModal";
import { useMemo } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Copy, Delete, Edit2 } from "../icons";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ChatMenuModal = ({ visible, theme, onPressOptions }) => {
  const insets = useSafeAreaInsets();
  const windowHeight = Dimensions.get("window").height;
  const animatedModalContainerStyle = useAnimatedStyle(() => {
    return {};
  });
  const modalContainerStyle = useMemo(() => [
    styles.modalContainerStyle(theme),
    animatedModalContainerStyle,
    { paddingBottom: 500 },
  ]);
  const modalContainer = (
    <Animated.View style={modalContainerStyle}>
      <View style={styles.handleStyle(theme)} />
      <View style={styles.modalOptionsContainer(theme)}>
        <TouchableOpacity
          onPress={() => {
            onPressOptions.copy();
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
            onPressOptions.rename();
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
            onPressOptions.delete();
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
    </Animated.View>
  );
  return (
    <PanModal visible={visible} theme={theme}>
      {modalContainer}
    </PanModal>
  );
};

const styles = StyleSheet.create({
  handleStyle: (theme) => ({
    width: 40,
    height: 4,
    marginTop: 8,
    backgroundColor: theme.modal.handle.backgroundColor,
    borderRadius: "100%",
  }),
  modalContainerStyle: (theme) => ({
    paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: theme.modal.backgroundColor,
    alignItems: "center",
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
    marginTop: 32,
    backgroundColor: theme.modal.container.backgroundColor,
    width: "100%",
    borderRadius: 16,
  }),
});
