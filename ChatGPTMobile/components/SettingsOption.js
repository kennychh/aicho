import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import {
  NavArrowRight,
  User,
  ChatPref,
  About,
  Pro,
  Flag,
  Privacy,
  Palette,
} from "../icons";

export const SettingsOption = ({
  title,
  onPress,
  theme,
  value = "",
  showDivider = true,
  isMiddle,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.settingOption(theme, showDivider, isMiddle)}
        onPress={onPress}
      >
        {title == "Account" ? (
          <User stroke={theme.iconColor} style={styles.leftIcon} />
        ) : title == "Chat Preferences" ? (
          <ChatPref stroke={theme.iconColor} style={styles.leftIcon} />
        ) : title == "About" ? (
          <About stroke={theme.iconColor} style={styles.leftIcon} />
        ) : title == "Report a problem" ? (
          <Flag stroke={theme.iconColor} style={styles.leftIcon} />
        ) : title == "Appearance" ? (
          <Palette stroke={theme.iconColor} style={styles.leftIcon} />
        ) : title == "Privacy & Security" ? (
          <Privacy stroke={theme.iconColor} style={styles.leftIcon} />
        ) : title == "AIcho Pro" ? (
          <Pro stroke={theme.iconColor} style={styles.leftIcon} />
        ) : (
          <View />
        )}
        <Text style={styles.text(theme)}>{title}</Text>
        {value != null && <Text style={styles.valueText(theme)}>{value}</Text>}
        <NavArrowRight stroke={theme.secondaryIconColor} style={styles.icon} />
      </TouchableOpacity>
    </View>
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
  settingOption: (theme, showDivider, isMiddle) => ({
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    marginHorizontal: 16,
    backgroundColor: theme.onBackgroundColor,
    borderTopLeftRadius: showDivider && !isMiddle ? 16 : 0,
    borderTopRightRadius: showDivider && !isMiddle ? 16 : 0,
    borderBottomLeftRadius: showDivider || isMiddle ? 0 : 16,
    borderBottomRightRadius: showDivider || isMiddle ? 0 : 16,
    borderBottomWidth: showDivider || isMiddle ? 1 : 0,
    borderColor: theme.modal.divider.backgroundColor,
  }),
});
