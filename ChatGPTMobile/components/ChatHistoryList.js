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
    setInput,
    setEditMessage,
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
  return (
    <View style={paddingBottom && { paddingBottom: insets.bottom + 16 }}>
      <Text style={[styles.drawerChatsHeaderText(theme)]}>
        {stickyHeadersData[index]}
      </Text>
      {item
        .map((chatHistoryIndex, itemIndex) => {
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
              borderTopRadius={itemIndex == item.length - 1}
              borderBottomRadius={itemIndex == 0}
              showDivider={itemIndex != 0}
              previewText={chats[chatHistoryIndex][0]?.result?.text}
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
