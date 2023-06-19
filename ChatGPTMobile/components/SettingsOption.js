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
  Undo,
} from "../icons";

export const SettingsOption = ({
  title,
  onPress,
  theme,
  value = "",
  showDivider = true,
  isMiddle,
  isSingle = false,
}) => {
  return (
    <View>
      <TouchableOpacity
        style={styles.settingOption(theme, showDivider, isMiddle, isSingle)}
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
        ) : title == "Reset data" ? (
          <Undo stroke={"#FF0000"} style={styles.leftIcon} />
        ) : (
          <View />
        )}
        <Text
          style={[
            styles.text(theme),
            { color: title == "Reset data" ? "#FF0000" : theme.fontColor },
          ]}
        >
          {title}
        </Text>
        {value != null && <Text style={styles.valueText(theme)}>{value}</Text>}
        {title != "Reset data" && (
          <NavArrowRight
            stroke={theme.secondaryIconColor}
            style={styles.icon}
            width={20}
            height={20}
          />
        )}
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
    paddingVertical: 16,
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
  settingOption: (theme, showDivider, isMiddle, isSingle) => ({
    flexDirection: "row",
    justifyContent: "flex-start",
    alignContent: "space-between",
    alignItems: "center",
    marginHorizontal: 16,
    backgroundColor: theme.onBackgroundColor,
    borderTopLeftRadius: (showDivider && !isMiddle) || isSingle ? 16 : 0,
    borderTopRightRadius: (showDivider && !isMiddle) || isSingle ? 16 : 0,
    borderBottomLeftRadius: (showDivider || isMiddle) && !isSingle ? 0 : 16,
    borderBottomRightRadius: (showDivider || isMiddle) && !isSingle ? 0 : 16,
    borderBottomWidth: (showDivider || isMiddle) && !isSingle ? 1 : 0,
    borderColor: theme.modal.divider.backgroundColor,
  }),
});
