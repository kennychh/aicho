import React, {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  memo,
} from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { Message, Delete, Moon, Plus, Sun, Settings } from "../icons";
import { getTheme } from "../theme";
import { DrawerChats } from "./DrawerChats";
import {
  getMonthsAgo,
  getMonthsAgoStr,
  getToday,
} from "../helpers/getTimeCreated";
import DrawerChatsList from "./DrawerChatsList";

const DrawerContent = ({
  props,
  chats,
  setChatIndex,
  chatIndex,
  setChats,
  setDeleteChat,
  chatDetails,
  setChatDetails,
  setInput,
  setEditMessage,
  theme,
  setTheme,
  darkModeModalizeRef,
  confirmDeleteVisible,
  openHoldPreview,
  holdPreviewFunctions,
}) => {
  const navigation = props.navigation;

  useEffect(() => {
    navigation.closeDrawer();
  }, [chatIndex]);

  const chatDetailsByMonths = getMonthsAgo(chatDetails);
  const stickyHeadersData = getMonthsAgoStr(Object.keys(chatDetailsByMonths));
  const drawerChatData = Object.values(chatDetailsByMonths);
  const drawerChatsOnPress = (index) => {
    setInput("");
    setEditMessage(null);
    setChatIndex(index);
  };
  const memoizedStickyHeadersData = useMemo(
    () => stickyHeadersData,
    [stickyHeadersData]
  );
  const memoizedTheme = useMemo(() => theme, [theme]);
  const memoizedChatIndex = useMemo(() => chatIndex, [chatIndex]);
  const memoizedChatDetails = useMemo(() => chatDetails, [chatDetails]);
  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <DrawerChatsList
          item={item}
          index={index}
          stickyHeadersData={memoizedStickyHeadersData}
          theme={memoizedTheme}
          chatIndex={memoizedChatIndex}
          chats={chats}
          chatDetails={memoizedChatDetails}
          openHoldPreview={openHoldPreview}
          holdPreviewFunctions={holdPreviewFunctions}
          drawerChatsOnPress={drawerChatsOnPress}
          navigation={navigation}
        />
      );
    },
    [
      memoizedStickyHeadersData,
      memoizedTheme,
      memoizedChatIndex,
      memoizedChatDetails,
    ]
  );

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container(theme)}
      scrollEnabled={false}
    >
      <View style={styles.drawerConversationsTitleContainer}>
        <Text style={styles.drawerConversationsTitle(theme)}>AIcho</Text>
      </View>
      <View style={{ flex: 1, overflow: "hidden" }}>
        <FlatList
          data={drawerChatData}
          indicatorStyle={theme == getTheme("dark") ? "white" : "black"}
          style={styles.componentContainer(theme)}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-start",
          }}
          renderItem={renderItem}
          keyExtractor={(item, index) => {
            return index;
          }}
        />
      </View>
      <ScrollView
        indicatorStyle={theme == getTheme("dark") ? "white" : "black"}
        style={{
          // flex: 1,
          maxHeight: 240,
          minHeight: 240,
          borderTopColor: theme.drawerContent.drawerDivider.backgroundColor,
          borderTopWidth: 0.5,
        }}
      >
        <TouchableOpacity
          style={[styles.drawerOptions, { marginTop: 24 }]}
          onPress={() => {
            const date = new Date();
            setChats((oldChats) => [...oldChats, []]);
            setChatIndex(chats.length);
            setChatDetails((oldChatTitles) => [
              ...oldChatTitles.slice(0, chats.length),
              ["New chat", date.toString()],
              ...oldChatTitles.slice(chats.length + 1),
            ]);
            setInput("");
            setEditMessage(null);
            navigation.closeDrawer();
          }}
        >
          <Plus style={styles.chatItemIcon} stroke={theme.iconColor} />
          <Text style={styles.chatItemText(theme)} numberOfLines={1}>
            New chat
          </Text>
        </TouchableOpacity>
        {/* <TouchableOpacity
          style={styles.drawerOptions}
          onPress={() => {
            darkModeModalizeRef.current?.open();
          }}
        >
          {!isDarkMode ? (
            <Sun style={styles.chatItemIcon} stroke={theme.iconColor} />
          ) : (
            <Moon style={styles.chatItemIcon} stroke={theme.iconColor} />
          )}
          <Text style={styles.chatItemText(theme)}>Appearance</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.drawerOptions}
          onPress={() => {
            navigation.navigate("Settings");
          }}
        >
          <Settings style={styles.chatItemIcon} stroke={theme.iconColor} />
          <Text style={styles.chatItemText(theme)} numberOfLines={1}>
            Settings
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.drawerOptions}
          onPress={() => {
            confirmDeleteVisible.value = true;
          }}
        >
          <Delete style={styles.chatItemIcon} stroke={theme.error.color} />
          <Text
            numberOfLines={1}
            style={[styles.chatItemText(theme), { color: theme.error.color }]}
          >
            Clear conversations
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </DrawerContentScrollView>
  );
};

const styles = StyleSheet.create({
  drawerOptions: {
    paddingHorizontal: 16,
    marginHorizontal: 16,
    marginRight: 32,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  drawerConversationsTitle: (theme) => ({
    fontSize: 20,
    fontWeight: "600",
    color: theme.fontColor,
    marginLeft: 16,
  }),
  drawerConversationsTitleContainer: {
    marginBottom: 16,
    marginLeft: 16,
  },
  drawerChatsHeaderText: (theme) => ({
    fontSize: 14,
    lineHeight: 16,
    color: theme.secondaryIconColor,
    fontWeight: "500",
    paddingHorizontal: 32,
    paddingBottom: 8,
    paddingTop: 16,
  }),
  chatItemText: (theme) => ({
    fontSize: 16,
    lineHeight: 18,
    // fontWeight: "500",
    color: theme.fontColor,
    paddingVertical: 16,
  }),
  chatItemIcon: { marginRight: 16 },
  chatItem: {
    paddingHorizontal: 16,
    borderRadius: 16,
    marginBottom: 8,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  container: (theme) => ({
    backgroundColor: theme.drawerContent.backgroundColor,
    marginVertical: 16,
    // marginHorizontal: 16,
    justifyContent: "space-between",
    flex: 1,
  }),
  componentContainer: (theme) => ({
    width: "100%",
    height: "100%",
    // paddingRight: 16,
    backgroundColor: theme.drawerContent.backgroundColor,
    overflow: "visible",
    marginTop: 16,
    // maxHeight: 400,
  }),
});
function arePropsEqual(prevProps, nextProps) {
  return (
    prevProps.props === nextProps.props &&
    prevProps.theme === nextProps.theme &&
    prevProps.chatIndex === nextProps.chatIndex &&
    prevProps.chatDetails === nextProps.chatDetails &&
    prevProps.confirmDeleteVisible === nextProps.confirmDeleteVisible
  );
}
export default memo(DrawerContent, arePropsEqual);
