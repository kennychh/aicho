import {
  StyleSheet,
  TextInput,
  View,
  Image,
  Keyboard,
  useColorScheme,
} from "react-native";
import { More, Menu, Close } from "../icons";
import { HeaderButton } from "./HeaderButton";
import { getTheme } from "../theme";
export const Header = ({
  onOpen,
  modalizeRef,
  navigation,
  headerTitle,
  textInputRef,
  setChatTitles,
  chatTitles,
  chatIndex,
  isHeaderEditable,
  setIsHeaderEditable,
}) => {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme);
  const onPress = () => {
    Keyboard.dismiss();
    onOpen(modalizeRef);
  };
  return (
    <View style={styles.bar(theme)}>
      <HeaderButton
        icon={<Menu stroke={theme.iconColor} />}
        onPress={() => navigation.openDrawer()}
      />
      <View
        style={{
          flex: 1,
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Image
          source={require("../assets/chat-gpt-logo.png")}
          style={styles.icon}
        />
        <TextInput
          ref={textInputRef}
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
      <HeaderButton
        icon={<More stroke={theme.iconColor} />}
        onPress={onPress}
      />
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
    width: 36,
    height: 36,
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
    borderBottomColor: theme.header.borderBottomColor,
    borderBottomWidth: 1,
    backgroundColor: theme.backgroundColor,
    alignContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    zIndex: 1,
  }),
});
