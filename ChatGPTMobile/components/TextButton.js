import { StyleSheet, TouchableOpacity, Text, View } from "react-native";

export const TextButton = ({
  text,
  onPress,
  theme,
  disabled,
  color,
  buttonStyle,
  textStyle,
}) => {
  return (
    <TouchableOpacity
      onPress={() => (onPress ? onPress() : null)}
      disabled={disabled}
      style={buttonStyle ? buttonStyle : styles.button(theme, disabled, color)}
    >
      <Text style={textStyle ? textStyle : styles.text(theme, disabled, color)}>
        {text}
      </Text>
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
    lineHeight: 18,

    // fontWeight: "500",
    color: disabled ? theme.button.disabledFontColor : theme.button.fontColor,
  }),
});
