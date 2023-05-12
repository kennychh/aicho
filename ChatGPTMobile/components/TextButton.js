import { StyleSheet, TouchableOpacity, Text } from "react-native";

export const TextButton = ({ text, onPress, theme, disabled }) => {
  return (
    <TouchableOpacity
      onPress={() => (onPress ? onPress() : null)}
      disabled={disabled}
      style={styles.button(theme)}
    >
      <Text style={styles.text(theme)}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: (theme) => ({
    backgroundColor: theme.button.color,
    alignItems: "center",
    paddingVertical: 16,
    marginHorizontal: 16,
    borderRadius: 16,
  }),
  text: (theme) => ({
    fontSize: 16,
    fontWeight: "500",
    color: theme.fontColor,
  }),
});
