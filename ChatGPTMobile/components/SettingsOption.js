import { StyleSheet, Text, TouchableOpacity } from "react-native";
import {
  NavArrowRight,
  User,
  Message,
  About,
  Heart,
  Flag,
  Privacy,
  Language,
} from "../icons";

export const SettingsOption = ({ title, onPress, theme }) => {
  return (
    <TouchableOpacity style={styles.settingOption(theme)} onPress={onPress}>
      {title == "Account" ? (
        <User stroke={theme.secondaryIconColor} style={styles.leftIcon} />
      ) : title == "Chat Preferences" ? (
        <Message stroke={theme.secondaryIconColor} style={styles.leftIcon} />
      ) : title == "About" ? (
        <About stroke={theme.secondaryIconColor} style={styles.leftIcon} />
      ) : title == "Report a problem" ? (
        <Flag stroke={theme.secondaryIconColor} style={styles.leftIcon} />
      ) : title == "Language" ? (
        <Language stroke={theme.secondaryIconColor} style={styles.leftIcon} />
      ) : title == "Privacy" ? (
        <Privacy stroke={theme.secondaryIconColor} style={styles.leftIcon} />
      ) : (
        <Heart stroke={theme.secondaryIconColor} style={styles.leftIcon} />
      )}
      <Text style={styles.text(theme)}>{title}</Text>
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
