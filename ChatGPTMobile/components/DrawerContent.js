import React, { useState, useEffect, useRef } from "react";
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

export const DrawerContent = ({
  props,
  chats,
  setChatIndex,
  chatIndex,
  setChats,
  setDeleteChat,
  chatTitles,
  setChatTitles,
  setInput,
  setEditMessage,
  theme,
  setTheme,
  darkModeModalizeRef,
  setConfirmDeleteVisible,
  openHoldPreview,
  holdPreviewFunctions,
}) => {
  const navigation = props.navigation;

  const drawerChatsOnPress = (index) => {
    setChatIndex(index);
    setInput("");
    setEditMessage(null);
    navigation.closeDrawer();
  };

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
          inverted
          data={chats}
          indicatorStyle={theme == getTheme("dark") ? "white" : "black"}
          style={styles.componentContainer(theme)}
          contentContainerStyle={{
            flexGrow: 1,
            justifyContent: "flex-end",
          }}
          renderItem={({ item, index }) => (
            <DrawerChats
              theme={theme}
              onPress={() => {
                drawerChatsOnPress(index);
              }}
              text={chatTitles[index]}
              selected={chatIndex == index}
              openHoldPreview={openHoldPreview}
              data={item.slice(0, 10)}
              index={index}
              holdPreviewFunctions={holdPreviewFunctions}
              navigation={navigation}
            />
          )}
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
            setChats((oldChats) => [...oldChats, []]);
            setChatIndex(chats.length);
            setChatTitles((oldChatTitles) => [
              ...oldChatTitles.slice(0, chats.length),
              `New chat`,
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
            setConfirmDeleteVisible(true);
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
    marginRight: 32,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  drawerConversationsTitle: (theme) => ({
    fontSize: 20,
    fontWeight: "600",
    color: theme.fontColor,
  }),
  drawerConversationsTitleContainer: {
    marginBottom: 24,
    marginLeft: 16,
  },
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
    marginHorizontal: 16,
    justifyContent: "space-between",
    flex: 1,
  }),
  componentContainer: (theme) => ({
    width: "100%",
    height: "100%",
    // paddingRight: 16,
    backgroundColor: theme.drawerContent.backgroundColor,
    overflow: "visible",
    // maxHeight: 400,
  }),
});
