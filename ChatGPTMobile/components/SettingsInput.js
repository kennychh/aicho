import { StyleSheet, TextInput, View, TouchableOpacity } from "react-native";
import { Close } from "../icons";

export const SettingsInput = ({
  placeholder,
  theme,
  value,
  setValue,
  keyboardType = "default",
  secureTextEntry,
}) => {
  return (
    <View style={styles.container}>
      <TextInput
        secureTextEntry={secureTextEntry}
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
        <Close stroke={theme.button.disabledFontColor} width={20} height={20} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    flexDirection: "row",
  },
  clearTextButton: {
    position: "absolute",
    right: 12,
    // backgroundColor: 'red',
    padding: 4,
  },
  textInput: (theme) => ({
    width: "100%",
    backgroundColor: theme.onBackgroundColor,
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 56,
    fontSize: 16,
    lineHeight: 18,
    color: theme.input.fontColor,
    borderRadius: 16,
  }),
});
