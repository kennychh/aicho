import { StyleSheet, TouchableOpacity, Text } from "react-native";

export const TextButton = ({ text, onPress, theme, disabled }) => {
  return (
    <TouchableOpacity
      onPress={() => (onPress ? onPress() : null)}
      disabled={disabled}
      style={styles.button(theme, disabled)}
    >
      <Text style={styles.text(theme, disabled)}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: (theme, disabled) => ({
    backgroundColor: disabled ? theme.button.disabledColor : theme.button.color,
    alignItems: "center",
    paddingVertical: 16,
    marginHorizontal: 16,
    borderRadius: 16,
  }),
  text: (theme, disabled) => ({
    fontSize: 16,
    fontWeight: "500",
    color: disabled ? theme.button.disabledFontColor : theme.button.fontColor,
  }),
});
