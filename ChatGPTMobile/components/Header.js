import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  Keyboard,
} from "react-native";
import { More, Menu, ArrowLeft } from "../icons";
import { HeaderButton } from "./HeaderButton";
import { getTheme } from "../theme";
export const Header = ({
  onOpen,
  modalizeRef,
  navigation,
  headerTitle,
  textInputRef,
  setChatTitles,
  chatIndex,
  isHeaderEditable,
  setIsHeaderEditable,
  theme,
  isSettingsHeader = false,
  color,
}) => {
  const chatGptTitle = (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <Image
        source={require("../assets/circle-icon-transparent.png")}
        style={[styles.icon, { backgroundColor: color }]}
      />
      <TextInput
        ref={textInputRef}
        keyboardAppearance={theme === getTheme("dark") ? "dark" : "light"}
        style={styles.barText(theme)}
        value={headerTitle}
        editable={isHeaderEditable}
        returnKeyType={"done"}
        maxLength={25}
        onChangeText={(s) => {
          setChatTitles((oldChatTitles) => [
            ...oldChatTitles.slice(0, chatIndex),
            s,
            ...oldChatTitles.slice(chatIndex + 1),
          ]);
        }}
        onSubmitEditing={() => {
          setIsHeaderEditable(false);
        }}
      />
    </View>
  );

  const settingsTitle = (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <Text style={[styles.barText(theme), { fontWeight: "700" }]}>
        {headerTitle}
      </Text>
    </View>
  );
  return (
    <View style={styles.bar(theme)}>
      {isSettingsHeader ? (
        <HeaderButton
          icon={<ArrowLeft stroke={theme.iconColor} />}
          onPress={() => navigation.goBack()}
        />
      ) : (
        <HeaderButton
          icon={<Menu stroke={theme.iconColor} />}
          onPress={() => navigation.openDrawer()}
        />
      )}
      {isSettingsHeader ? settingsTitle : chatGptTitle}
      {!isSettingsHeader ? (
        <HeaderButton
          icon={<More stroke={theme.iconColor} />}
          onPress={() => {
            Keyboard.dismiss();
            onOpen(modalizeRef);
          }}
        />
      ) : (
        <More stroke={theme.backgroundColor} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  barText: (theme) => ({
    fontSize: 16,
    fontWeight: "500",
    color: theme.fontColor,
  }),
  icon: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    alignSelf: "center",
    marginLeft: 16,
    marginRight: 8,
  },
  bar: (theme) => ({
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    borderBottomColor: theme.divider.color,
    borderBottomWidth: 1,
    backgroundColor: theme.backgroundColor,
    alignContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    zIndex: 1,
    height: 56,
  }),
});
