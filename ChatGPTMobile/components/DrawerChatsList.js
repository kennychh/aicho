import { StyleSheet, Text, View } from "react-native";
import { DrawerChats } from "./DrawerChats";
import { memo } from "react";

const DrawerChatsList = ({
  item,
  index,
  stickyHeadersData,
  theme,
  chatIndex,
  openHoldPreview,
  chats,
  chatDetails,
  holdPreviewFunctions,
  drawerChatsOnPress,
  navigation,
}) => {
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
        .map((drawerChatIndex) => {
          return (
            !!chats[drawerChatIndex][0] && (
              <DrawerChats
                theme={theme}
                onPress={() => {
                  drawerChatsOnPress(drawerChatIndex);
                }}
                text={chatTitle(drawerChatIndex)}
                selected={chatIndex == drawerChatIndex}
                openHoldPreview={openHoldPreview}
                data={chats[drawerChatIndex].slice(0, 10)}
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
    prevProps.chatIndex === nextProps.chatIndex &&
    prevProps.chats === nextProps.chats
  );
}
export default memo(DrawerChatsList, arePropsEqual);
