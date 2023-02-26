import React, { useState, useEffect, useRef } from "react";
import { ChatScreen } from "./screens";
import { DrawerContent } from "./components";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { Alert, FlatList, Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const [chats, setChats] = useState([[]]);
  const [chatIndex, setChatIndex] = useState(0);
  const [chatValue, setChatValue] = useState([]);
  const [deleteChat, setDeleteChat] = useState(false);

  const storeChats = async () => {
    try {
      setDeleteChat(false);
      const jsonValue = JSON.stringify(chats);
      await AsyncStorage.setItem("@chatgpt", jsonValue);
    } catch (e) {
      // saving error
      Alert.alert("Couldn't store results", e.message);
    }
  };

  const clearConversation = (index) => {
    setChatIndex(index == 0 ? 0 : index - 1);
    setDeleteChat(true);
    if (chats.length == 1) {
      setChats([[]]);
    } else {
      setChats((oldChats) => [
        ...oldChats.slice(0, index),
        ...oldChats.slice(index + 1),
      ]);
    }
  };

  useEffect(() => {
    const dontStoreChat = chats.length == 1 && chats[0].length == 0;
    if (!dontStoreChat || deleteChat) {
      storeChats();
    }
  }, [chats, chatIndex]);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@chatgpt");
        const storedRes = jsonValue != null ? JSON.parse(jsonValue) : [[]];
        if (storedRes) {
          setChats(storedRes);
          setChatIndex(storedRes.length - 1);
        }
      } catch (e) {
        // error reading value
        Alert.alert("Couldn't retrieve chats", e.message);
      }
    };
    getData();
  }, []);

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => (
          <DrawerContent
            props={props}
            chats={chats}
            setChatIndex={setChatIndex}
            chatIndex={chatIndex}
            setChats={setChats}
          />
        )}
        initialRouteName="Chat"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Drawer.Screen name="Chat">
          {(props) => (
            <ChatScreen
              {...props}
              chats={chats}
              index={chatIndex}
              chatValue={chatValue}
              chatIndex={chatIndex}
              setChatIndex={setChatIndex}
              clearConversation={clearConversation}
              setChats={setChats}
            />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
