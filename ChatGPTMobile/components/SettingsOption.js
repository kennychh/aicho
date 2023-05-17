import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  NavArrowRight,
  User,
  ChatPref,
  About,
  Pro,
  Flag,
  Privacy,
  Language,
} from "../icons";

export const SettingsOption = ({ title, onPress, theme, value = "" }) => {
  return (
    <TouchableOpacity style={styles.settingOption(theme)} onPress={onPress}>
      {title == "Account" ? (
        <User stroke={theme.secondaryIconColor} style={styles.leftIcon} />
      ) : title == "Chat Preferences" ? (
        <ChatPref stroke={theme.secondaryIconColor} style={styles.leftIcon} />
      ) : title == "About" ? (
        <About stroke={theme.secondaryIconColor} style={styles.leftIcon} />
      ) : title == "Report a problem" ? (
        <Flag stroke={theme.secondaryIconColor} style={styles.leftIcon} />
      ) : title == "Language" ? (
        <Language stroke={theme.secondaryIconColor} style={styles.leftIcon} />
      ) : title == "Privacy" ? (
        <Privacy stroke={theme.secondaryIconColor} style={styles.leftIcon} />
      ) : title == "AIcho Pro" ? (
        <Pro stroke={theme.secondaryIconColor} style={styles.leftIcon} />
      ) : (
        <View />
      )}
      <Text style={styles.text(theme)}>{title}</Text>
      {value != null && <Text style={styles.valueText(theme)}>{value}</Text>}
      <NavArrowRight stroke={theme.secondaryIconColor} style={styles.icon} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: (theme) => ({
    flex: 1,
    paddingLeft: 16,
    fontSize: 16,
    fontWeight: "500",
    color: theme.fontColor,
  }),
  valueText: (theme) => ({
    marginRight: 16,
    fontSize: 14,
    fontWeight: "500",
    color: theme.secondaryIconColor,
  }),
  leftIcon: {
    marginLeft: 16,
  },
  icon: {
    marginRight: 16,
  },
  settingOption: (theme) => ({
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    backgroundColor: theme.backgroundColor,
  }),
});
