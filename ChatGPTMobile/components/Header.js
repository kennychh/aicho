import { StyleSheet, TextInput, View, Image, Keyboard } from "react-native";
import { More, Menu } from "../icons";
import { HeaderButton } from "./HeaderButton";
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
  const onPress = () => {
    Keyboard.dismiss();
    onOpen(modalizeRef);
  };
  return (
    <View style={styles.bar}>
      <HeaderButton icon={<Menu />} onPress={() => navigation.openDrawer()} />
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
          style={styles.barText}
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
      <HeaderButton icon={<More />} onPress={onPress} />
    </View>
  );
};

const styles = StyleSheet.create({
  barText: {
    fontSize: 18,
    fontWeight: "500",
  },
  icon: {
    width: 36,
    height: 36,
    borderRadius: "50%",
    alignSelf: "center",
    marginLeft: 16,
    marginRight: 8,
  },
  bar: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    borderBottomColor: "#F6F6F6",
    borderBottomWidth: 1,
    backgroundColor: "white",
    alignContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    zIndex: 1,
  },
});
