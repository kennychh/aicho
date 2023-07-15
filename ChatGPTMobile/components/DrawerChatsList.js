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
}) => {
  const { chats, theme } = useContext(AppContext);
  const showHeader = item.length > 1 || !!chats[0][0];
  return (
    <View>
      <Text
        style={[
          styles.drawerChatsHeaderText(theme),
          index == 0 ? { paddingTop: 0 } : {},
        ]}
      >
        {showHeader && stickyHeadersData[index]}
      </Text>
      {item
        .map((drawerChatIndex) => {
          const showItem = chats[drawerChatIndex][0];
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
