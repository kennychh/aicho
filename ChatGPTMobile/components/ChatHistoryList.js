import { StyleSheet, Text, View } from "react-native";
import { memo, useContext } from "react";
import { ChatHistoryItem } from "./ChatHistoryItem";
import { AppContext } from "../context";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ChatHistoryList = ({
  item,
  index,
  stickyHeadersData,
  openHoldPreview,
  holdPreviewFunctions,
  bottomSheetRef,
  paddingBottom,
}) => {
  const {
    theme,
    handleInput,
    handleEditMessage,
    setChatIndex,
    chats,
    chatDetails,
    chatIndex,
  } = useContext(AppContext);
  const insets = useSafeAreaInsets();
  const chatTitle = (index) =>
    typeof chatDetails[index] === "string" ||
    typeof chatDetails[index] === "undefined"
      ? chatDetails[index]
      : chatDetails[index][0];
  const endIndex = chats?.current
    ? !!chats?.current[chats?.current?.length - 1][0]
    : 0;
  const showHeader = item.length >= 1 || endIndex;
  return (
    <View style={paddingBottom && { paddingBottom: insets.bottom + 16 }}>
      {showHeader && (
        <Text style={[styles.drawerChatsHeaderText(theme)]}>
          {stickyHeadersData[index]}
        </Text>
      )}
      {item
        .map((chatHistoryIndex, itemIndex) => {
          if (
            chats.current &&
            chats.current.length >= chatHistoryIndex &&
            chats.current[chatHistoryIndex]?.length >= 1 &&
            chats.current[chatHistoryIndex][0]
          ) {
            let borderTopRadius = itemIndex == item.length - 1;
            if (
              chatHistoryIndex + 1 > 0 &&
              chatHistoryIndex + 1 <= chats?.current.length - 1 &&
              !chats?.current[chatHistoryIndex + 1][0] &&
              item.indexOf(chatHistoryIndex + 1) != -1
            ) {
              borderTopRadius = itemIndex == item.length - 2;
            }
            return (
              !!chats?.current[chatHistoryIndex][0] && (
                <ChatHistoryItem
                  onPress={() => {
                    handleInput("");
                    handleEditMessage(null);
                    setChatIndex(chatHistoryIndex);
                    bottomSheetRef?.current?.close();
                  }}
                  text={chatTitle(chatHistoryIndex)}
                  selected={chatIndex == chatHistoryIndex}
                  openHoldPreview={openHoldPreview}
                  data={chats?.current[chatHistoryIndex].slice(0, 10)}
                  index={chatHistoryIndex}
                  borderTopRadius={borderTopRadius}
                  borderBottomRadius={itemIndex == 0}
                  showDivider={itemIndex != 0}
                  previewText={
                    chats?.current[chatHistoryIndex][0]?.result?.text
                  }
                  holdPreviewFunctions={holdPreviewFunctions}
                />
              )
            );
          }
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
    paddingTop: 24,
  }),
});

function arePropsEqual(prevProps, nextProps) {
  return (
    prevProps.stickyHeadersData === nextProps.stickyHeadersData &&
    prevProps.bottomSheetRef == nextProps.bottomSheetRef
  );
}
export default memo(ChatHistoryList, arePropsEqual);
