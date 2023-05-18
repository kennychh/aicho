import { StyleSheet, TouchableOpacity, Text } from "react-native";

export const TextButton = ({ text, onPress, theme, disabled, color }) => {
  return (
    <TouchableOpacity
      onPress={() => (onPress ? onPress() : null)}
      disabled={disabled}
      style={styles.button(theme, disabled, color)}
    >
      <Text style={styles.text(theme, disabled, color)}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: (theme, disabled, color) => ({
    backgroundColor: disabled ? theme.button.disabledColor : color,
    alignItems: "center",
    paddingVertical: 16,
    marginHorizontal: 16,
    borderRadius: 16,
  }),
  text: (theme, disabled, color) => ({
    fontSize: 16,
    fontWeight: "500",
    color: disabled ? theme.button.disabledFontColor : theme.button.fontColor,
  }),
});
