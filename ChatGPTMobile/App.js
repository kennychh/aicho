import React, { useState, useEffect, useRef } from "react";
import { ChatScreen } from "./screens";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const [chats, setChats] = useState([[]]);
  const [chatIndex, setChatIndex] = useState(0);
  const [chatValue, setChatValue] = useState([]);
  const [deleteChat, setDeleteChat] = useState(false);

  const storeChats = async (value, index) => {
    try {
      const newChats = [value, ...chats.slice(index+1)];
      setChats(newChats);
      setDeleteChat(false);
      const jsonValue = JSON.stringify(newChats);
      await AsyncStorage.setItem("@chatgpt", jsonValue);
    } catch (e) {
      // saving error
      Alert.alert("Couldn't store results", e.message);
    }
  };

  const clearConversation = (index) => {
    setChatIndex(index);
    setChatValue([]);
    setDeleteChat(true);
    setChats([[]])
  };

  useEffect(() => {
    if (chatValue.length > 0 || deleteChat) {
      storeChats(chatValue, chatIndex);
    }
  }, [chatValue, deleteChat]);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@chatgpt");
        const storedRes = jsonValue != null ? JSON.parse(jsonValue) : [[]];
        if (storedRes) {
          setChats(storedRes);
          setChatValue(storedRes[0])
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
              setChatValue={setChatValue}
              clearConversation={clearConversation}
            />
          )}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
