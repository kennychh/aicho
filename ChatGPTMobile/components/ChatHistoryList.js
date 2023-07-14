import { StyleSheet, Text, View } from "react-native";
import { memo, useContext } from "react";
import { ChatHistoryItem } from "./ChatHistoryItem";
import { AppContext } from "../context";

const ChatHistoryList = ({
  item,
  index,
  stickyHeadersData,
  openHoldPreview,
  holdPreviewFunctions,
  bottomSheetRef,
}) => {
  const {
    theme,
    setInput,
    setEditMessage,
    setChatIndex,
    chats,
    chatDetails,
    chatIndex,
  } = useContext(AppContext);
  const chatTitle = (index) =>
    typeof chatDetails[index] === "string" ||
    typeof chatDetails[index] === "undefined"
      ? chatDetails[index]
      : chatDetails[index][0];
  return (
    <View>
      <Text
        style={[
          styles.drawerChatsHeaderText(theme),
          index == 0 ? { paddingTop: 0 } : {},
        ]}
      >
        {stickyHeadersData[index]}
      </Text>
      {item
        .map((chatHistoryIndex) => {
          return (
            <ChatHistoryItem
              onPress={() => {
                setInput("");
                setEditMessage(null);
                setChatIndex(chatHistoryIndex);
                bottomSheetRef?.current?.close();
              }}
              text={chatTitle(chatHistoryIndex)}
              selected={chatIndex == chatHistoryIndex}
              openHoldPreview={openHoldPreview}
              data={chats[chatHistoryIndex].slice(0, 10)}
              index={chatHistoryIndex}
              holdPreviewFunctions={holdPreviewFunctions}
            />
          );
        })
        .reverse()}
    </View>
  );
};

const styles = StyleSheet.create({
  drawerChatsHeaderText: (theme) => ({
    fontSize: 14,
    lineHeight: 16,
    color: theme.secondaryIconColor,
    fontWeight: "500",
    paddingHorizontal: 32,
    paddingBottom: 8,
    paddingTop: 16,
  }),
});

function arePropsEqual(prevProps, nextProps) {
  return (
    prevProps.stickyHeadersData === nextProps.stickyHeadersData &&
    prevProps.bottomSheetRef == nextProps.bottomSheetRef
  );
}
export default memo(ChatHistoryList, arePropsEqual);
