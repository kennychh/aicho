import React, { useState, useEffect, useRef } from "react";
import { HomeScreen, SettingsScreen } from "./screens";
import { DrawerContent } from "./components";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { DarkModeModel, ConfirmDeleteConvosModel } from "./components";
import { Alert, FlatList, Text, useColorScheme, View } from "react-native";
import { getTheme } from "./theme";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const Stack = createNativeStackNavigator();
  const Drawer = createDrawerNavigator();
  const [chats, setChats] = useState([[]]);
  const [chatIndex, setChatIndex] = useState(0);
  const [chatTitles, setChatTitles] = useState([]);
  const [deleteChat, setDeleteChat] = useState(false);
  const [editMessage, setEditMessage] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(colorScheme === "dark");
  const [useDeviceSettings, setUseDeviceSettings] = useState(true);
  const [count, setCount] = useState(0);
  const [input, setInput] = useState("");
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState(getTheme(colorScheme));
  const darkModeModalizeRef = useRef(null);
  const confirmDeleteConvosModalizeRef = useRef(null);
  const navigationRef = useNavigationContainerRef();
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

  const storeChatTitles = async () => {
    try {
      const chatTitlesJson = JSON.stringify(chatTitles);
      await AsyncStorage.setItem("@chatTitles", chatTitlesJson);
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
      setChatTitles((oldChatTitles) => [
        ...oldChatTitles.slice(0, index),
        ...oldChatTitles.slice(index + 1),
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
    if (chatTitles[0] != null) {
      storeChatTitles();
    }
  }, [chatTitles]);

  const storeDarkMode = async () => {
    try {
      const darkModeJson = JSON.stringify(isDarkMode);
      const useDeviceSettingsJson = JSON.stringify(useDeviceSettings);
      await AsyncStorage.setItem("@darkMode", darkModeJson);
      await AsyncStorage.setItem("@useDeviceSettings", useDeviceSettingsJson);
    } catch (e) {
      // saving error
      Alert.alert("Couldn't store dark mode settings", e.message);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@chatgpt");
        const chatTitlesJson = await AsyncStorage.getItem("@chatTitles");
        const darkModeJsonValue = await AsyncStorage.getItem("@darkMode");
        const useDeviceSettingsValue = await AsyncStorage.getItem(
          "@useDeviceSettings"
        );
        const storedChatTitles =
          chatTitlesJson != null ? JSON.parse(chatTitlesJson) : ["New chat"];
        const storedRes = jsonValue != null ? JSON.parse(jsonValue) : [[]];
        const storedDarkMode =
          darkModeJsonValue != null ? JSON.parse(darkModeJsonValue) : true;
        const storedUseDeviceSettings =
          useDeviceSettingsValue != null
            ? JSON.parse(useDeviceSettingsValue)
            : true;
        if (storedRes) {
          setChatTitles(storedChatTitles);
          setChats(storedRes);
          setChatIndex(storedRes.length - 1);
        }
        setIsDarkMode(storedDarkMode);
        setUseDeviceSettings(storedUseDeviceSettings);
      } catch (e) {
        // error reading value
        Alert.alert("Couldn't retrieve chats", e.message);
      }
    };
    getData();
  }, []);

  useEffect(() => {
    if (useDeviceSettings) {
      setTheme(getTheme(colorScheme));
    } else {
      setTheme(getTheme(isDarkMode ? "dark" : "light"));
    }
  }, [colorScheme, isDarkMode, useDeviceSettings]);

  useEffect(() => {
    if (useDeviceSettings) {
      setTheme(getTheme(colorScheme));
    } else {
      setTheme(getTheme(isDarkMode ? "dark" : "light"));
    }
    if (count != 0) {
      storeDarkMode();
    } else {
      setCount(1);
    }
  }, [isDarkMode, useDeviceSettings]);

  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator>
        <Stack.Screen name="HomeScreen" options={{ headerShown: false }}>
          {(props) => (
            <HomeScreen
              props={props}
              chats={chats}
              setChatIndex={setChatIndex}
              chatIndex={chatIndex}
              setChats={setChats}
              setDeleteChat={setDeleteChat}
              chatTitles={chatTitles}
              setChatTitles={setChatTitles}
              setInput={setInput}
              setEditMessage={setEditMessage}
              theme={theme}
              setTheme={setTheme}
              darkModeModalizeRef={darkModeModalizeRef}
              confirmDeleteConvosModalizeRef={confirmDeleteConvosModalizeRef}
              index={chatIndex}
              clearConversation={clearConversation}
              input={input}
              editMessage={editMessage}
            />
          )}
        </Stack.Screen>
        <Stack.Screen name="Settings" options={{ headerShown: false }}>
          {(props) => <SettingsScreen props={props} theme={theme} />}
        </Stack.Screen>
      </Stack.Navigator>
      <DarkModeModel
        theme={theme}
        setTheme={setTheme}
        modalizeRef={darkModeModalizeRef}
        isDarkMode={isDarkMode}
        setIsDarkMode={setIsDarkMode}
        useDeviceSettings={useDeviceSettings}
        setUseDeviceSettings={setUseDeviceSettings}
        storeDarkMode={storeDarkMode}
      />
      <ConfirmDeleteConvosModel
        setChatIndex={setChatIndex}
        setChats={setChats}
        setDeleteChat={setDeleteChat}
        setChatTitles={setChatTitles}
        setInput={setInput}
        setEditMessage={setEditMessage}
        theme={theme}
        modalizeRef={confirmDeleteConvosModalizeRef}
      ></ConfirmDeleteConvosModel>
    </NavigationContainer>
  );
}
