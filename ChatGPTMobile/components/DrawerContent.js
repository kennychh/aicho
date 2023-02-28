import React, { useState, useEffect } from "react";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import {
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  ScrollView,
} from "react-native";
import { Message, Delete, Moon, Plus, Settings } from "../icons";
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
}) => {
  const navigation = props.navigation;
  const [selectedItem, setSelectedItem] = useState(chatIndex);
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
          selectedItem == index ? { backgroundColor: "#EFEFEF" } : {},
        ]}
      >
        <Message style={styles.chatItemIcon} />
        <Text style={styles.chatItemText}>{chatTitles[index]}</Text>
      </TouchableOpacity>
    );
  };

  useEffect(() => {
    setSelectedItem(chatIndex);
  }, [chatIndex]);
  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={styles.container}
      scrollEnabled={false}
    >
      <View style={styles.drawerConversationsTitleContainer}>
        <Text style={styles.drawerConversationsTitle}>ChatGPT</Text>
      </View>
      <View style={{ maxHeight: 400 }}>
        <FlatList
          inverted
          data={chats}
          style={styles.componentContainer}
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
      <View style={styles.drawerDivider} />
      <ScrollView>
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
          <Plus style={styles.chatItemIcon} />
          <Text style={styles.chatItemText}>New chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.drawerOptions}>
          <Moon style={styles.chatItemIcon} />
          <Text style={styles.chatItemText}>Dark mode</Text>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.drawerOptions}>
          <Settings style={styles.chatItemIcon} />
          <Text style={styles.chatItemText}>Settings</Text>
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
          <Delete style={styles.chatItemIcon} stroke={"#FF0000"} />
          <Text style={[styles.chatItemText, { color: "#FF0000" }]}>
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
  drawerDivider: {
    height: 1,
    backgroundColor: "#DBDBDB",
    marginRight: 16,
  },
  drawerConversationsTitle: {
    fontSize: 20,
    fontWeight: "500",
  },
  drawerConversationsTitleContainer: {
    marginBottom: 24,
    marginLeft: 16,
  },
  chatItemText: { fontSize: 16, fontWeight: "500" },
  chatItemIcon: { marginRight: 16 },
  chatItem: {
    padding: 16,
    borderRadius: 16,
    marginBottom: 8,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
  container: {
    backgroundColor: "white",
    marginVertical: 16,
    marginLeft: 16,
  },
  componentContainer: {
    width: "100%",
    height: "100%",
    paddingRight: 16,
  },
});
