import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { Close } from "../icons";

export const SettingsInput = ({
  placeholder,
  theme,
  value,
  setValue,
  keyboardType = "default",
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        placeholder={placeholder}
        style={styles.textInput(theme)}
        placeholderTextColor={theme.input.placeholderFontColor}
        value={`${value}`}
        scrollEnabled
        onChangeText={(s) => setValue(s)}
        keyboardType={keyboardType}
      />
      <TouchableOpacity
        style={styles.clearTextButton}
        onPress={() => {
          setValue("");
        }}
      >
        <Close stroke={theme.button.disabledFontColor} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
  },
  clearTextButton: {
    position: "absolute",
    right: 16,
  },
  textInput: (theme) => ({
    width: "100%",
    backgroundColor: theme.onBackgroundColor,
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 48,
    fontSize: 16,
    color: theme.input.fontColor,
    borderRadius: 16,
  }),
});
