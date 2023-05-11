import { StyleSheet, TextInput } from "react-native";

export const SettingsInput = ({ placeholder, theme, value, setValue }) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.textInput(theme)}
      placeholderTextColor={theme.input.placeholderFontColor}
    />
  );
};

const styles = StyleSheet.create({
  textInput: (theme) => ({
    backgroundColor: theme.onBackgroundColor,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 16,
    marginHorizontal: 16,
    fontSize: 16,
    color: theme.input.fontColor,
    borderRadius: 16,
  }),
});
