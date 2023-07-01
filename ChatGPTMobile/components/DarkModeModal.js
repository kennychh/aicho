import { View, Text, StyleSheet, Switch, useColorScheme } from "react-native";
import { Modalize } from "react-native-modalize";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const DarkModeModal = ({
  theme,
  modalizeRef,
  isDarkMode,
  setIsDarkMode,
  useDeviceSettings,
  setUseDeviceSettings,
}) => {
  const insets = useSafeAreaInsets();
  const toggleSwitch = () => {
    setIsDarkMode((previousState) => !previousState);
  };

  return (
    <Modalize
      ref={modalizeRef}
      modalStyle={styles.modalStyle(theme)}
      handleStyle={styles.handleStyle(theme)}
      handlePosition={"inside"}
      childrenStyle={styles.childrenStyle}
      adjustToContentHeight={true}
    >
      <View
        style={[
          styles.modalOptionsContainer(theme),
          { marginBottom: insets.bottom + 8 },
        ]}
      >
        <View style={styles.modalOption}>
          <Text style={styles.modalOptionText(theme)}>Dark mode</Text>
          <Switch
            style={{ marginVertical: -16 }}
            onValueChange={() => {
              toggleSwitch();
            }}
            disabled={useDeviceSettings}
            value={isDarkMode}
          />
        </View>
        <View style={styles.modalOptionDivider(theme)} />
        <View style={styles.modalOption}>
          <Text style={styles.modalOptionText(theme)}>Use device settings</Text>
          <Switch
            style={{ marginVertical: -16 }}
            onValueChange={() => {
              setUseDeviceSettings((previousState) => !previousState);
            }}
            value={useDeviceSettings}
          />
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
    lineHeight: 18,
    alignSelf: "center",
    // fontWeight: "500",
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
    justifyContent: "space-between",
  },
  modalOptionsContainer: (theme) => ({
    marginTop: 40,
    backgroundColor: theme.modal.container.backgroundColor,
    borderRadius: 16,
  }),
});
