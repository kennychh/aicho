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
import { DarkModeModel } from "./DarkModeModel";
import { Message, Delete, Moon, Plus, Sun } from "../icons";
import { getTheme } from "../theme";

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
}) => {
  const navigation = props.navigation;
  const [selectedItem, setSelectedItem] = useState(chatIndex);
  const isDarkMode = theme === getTheme("dark");
  const ChatsItem = ({ item, index }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setSelectedItem(index);
          setChatIndex(index);
          setInput("");
          setEditMessage(null);
          navigation.closeDrawer();
        }}
        style={[
          styles.chatItem,
          selectedItem == index
            ? {
                backgroundColor:
                  theme.drawerContent.chatItem.selected.backgroundColor,
              }
            : {},
        ]}
      >
        <Message style={styles.chatItemIcon} stroke={theme.iconColor} />
        <Text style={styles.chatItemText(theme)}>{chatTitles[index]}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setSelectedItem(chatIndex);
  }, [chatIndex]);

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container(theme)}
      scrollEnabled={false}
    >
      <View style={styles.drawerConversationsTitleContainer}>
        <Text style={styles.drawerConversationsTitle(theme)}>ChatGPT</Text>
      </View>
      <View style={{ maxHeight: 400 }}>
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
            <ChatsItem item={item} index={index} />
          )}
          keyExtractor={(item, index) => {
            return index;
          }}
        />
      </View>
      <View style={styles.drawerDivider(theme)} />
      <ScrollView
        indicatorStyle={theme == getTheme("dark") ? "white" : "black"}
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
          <Text style={styles.chatItemText(theme)}>New chat</Text>
        </TouchableOpacity>
        <TouchableOpacity
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
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.drawerOptions}>
          <Settings style={styles.chatItemIcon} />
          <Text style={styles.chatItemText(theme)}>Settings</Text>
        </TouchableOpacity> */}
        <TouchableOpacity
          style={styles.drawerOptions}
          onPress={() => {
            setDeleteChat(true);
            setChats([[]]);
            setChatIndex(0);
            setChatTitles(["New chat"]);
            setInput("");
            setEditMessage(null);
            navigation.closeDrawer();
          }}
        >
          <Delete style={styles.chatItemIcon} stroke={theme.error.color} />
          <Text
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
    padding: 16,
    marginRight: 16,
    marginBottom: 8,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  drawerDivider: (theme) => ({
    height: 1,
    backgroundColor: theme.drawerContent.drawerDivider.backgroundColor,
    marginRight: 16,
  }),
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
    fontWeight: "500",
    color: theme.fontColor,
  }),
  chatItemIcon: { marginRight: 16 },
  chatItem: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  container: (theme) => ({
    backgroundColor: theme.drawerContent.backgroundColor,
    marginVertical: 16,
    marginLeft: 16,
  }),
  componentContainer: (theme) => ({
    width: "100%",
    height: "100%",
    paddingRight: 16,
    backgroundColor: theme.drawerContent.backgroundColor,
  }),
});
