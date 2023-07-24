import { StyleSheet, Text, View } from "react-native";
import { DrawerChats } from "./DrawerChats";
import { memo, useContext, useMemo } from "react";
import { AppContext } from "../context";

const DrawerChatsList = ({
  item,
  index,
  stickyHeadersData,
  chatIndex,
  openHoldPreview,
  holdPreviewFunctions,
  drawerChatsOnPress,
  navigation,
  drawerChatData,
}) => {
  const { chats, theme } = useContext(AppContext);
  const endIndex = chats?.current
    ? !!chats?.current[chats?.current?.length - 1][0]
      ? true
      : index != 0 || item.length > 1
    : 0;

  const showHeader = item.length >= 1 && endIndex;
  return (
    <View>
      {showHeader && (
        <Text
          style={[
            styles.drawerChatsHeaderText(theme),
            { paddingBottom: 16 },
            index == 0 ||
            (index == 1 &&
              chats?.current &&
              !!!chats?.current[chats?.current?.length - 1][0] &&
              drawerChatData[index - 1].length <= 1)
              ? { paddingTop: 0 }
              : {},
          ]}
        >
          {stickyHeadersData[index]}
        </Text>
      )}
      {item
        .map((drawerChatIndex) => {
          if (
            chats.current &&
            chats.current.length >= drawerChatIndex &&
            chats.current[drawerChatIndex]?.length >= 0
          ) {
            const showItem = chats?.current[drawerChatIndex][0];
            return (
              !!showItem && (
                <DrawerChats
                  theme={theme}
                  onPress={drawerChatsOnPress}
                  selected={chatIndex == drawerChatIndex}
                  openHoldPreview={openHoldPreview}
                  index={drawerChatIndex}
                  holdPreviewFunctions={holdPreviewFunctions}
                  navigation={navigation}
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
    paddingTop: 16,
  }),
});

function arePropsEqual(prevProps, nextProps) {
  return (
    prevProps.stickyHeadersData === nextProps.stickyHeadersData &&
    prevProps.theme === nextProps.theme &&
    prevProps.chatIndex === nextProps.chatIndex
  );
}
export default memo(DrawerChatsList, arePropsEqual);
