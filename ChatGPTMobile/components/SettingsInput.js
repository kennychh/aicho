import { StyleSheet, TextInput } from "react-native";

export const SettingsInput = ({ placeholder, theme, value, setValue }) => {
  return (
    <TextInput
      placeholder={placeholder}
      style={styles.textInput(theme)}
      placeholderTextColor={theme.input.placeholderFontColor}
      value={value}
      scrollEnabled
      onChangeText={(s) => setValue(s)}
    />
  );
};

const styles = StyleSheet.create({
  textInput: (theme) => ({
    backgroundColor: theme.backgroundColor,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginTop: 16,
    marginHorizontal: 16,
    fontSize: 16,
    color: theme.input.fontColor,
    borderColor: theme.onBackgroundColor,
    borderWidth: 2,
    borderRadius: 16,
  }),
});
