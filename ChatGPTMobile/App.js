import React, { useState, useEffect, useRef } from "react";
import {
  HomeScreen,
  SettingsScreen,
  AccountScreen,
  PrivacyScreen,
  ChatPreferencesScreen,
  TimeoutScreen,
  AppearanceScreen,
  MaxTokensScreen,
  ModelScreen,
  AboutScreen,
  AuthenticateScreen,
  TemperatureScreen,
  PresencePenaltyScreen,
  FrequencyPenaltyScreen,
  ProScreen,
} from "./screens";
import { SafeAreaProvider } from "react-native-safe-area-context";
import {
  NavigationContainer,
  useNavigationContainerRef,
} from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import {
  DarkModeModal,
  ConfirmDeleteConvosModal,
  ConfirmResetDataModal,
  BottomToast,
  ConfirmDeleteChatModal,
} from "./components";
import {
  Alert,
  AppState,
  Platform,
  Text,
  UIManager,
  useColorScheme,
  View,
} from "react-native";
import { getTheme } from "./theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as SecureStore from "expo-secure-store";
import * as LocalAuthentication from "expo-local-authentication";
import { HoldMenu } from "./components/HoldMenu";
import { useSharedValue } from "react-native-reanimated";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export default function App() {
  const Stack = createNativeStackNavigator();
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
  const navigationRef = useNavigationContainerRef();
  const [key, setKey] = useState("");
  const [keyChanged, setKeyChanged] = useState(true);
  const [authenticate, setAuthenticate] = useState();
  const [maxTokens, setMaxTokens] = useState(0);
  const [model, setModel] = useState("");
  const [timeout, setChatTimeOut] = useState();
  const [temperature, setTemperature] = useState();
  const [presencePenalty, setPrescencePenalty] = useState();
  const [frequencyPenalty, setFrequencyPenalty] = useState();
  const [color, setColor] = useState("");
  const [retainContext, setRetainContext] = useState();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const confirmDeleteVisible = useSharedValue(false);
  const confirmResetVisible = useSharedValue(false);
  const appState = useRef(AppState.currentState);
  const [_, setAppStateVisible] = useState(appState.current);
  const [authenticateSuccess, setAuthenticateSuccess] = useState(false);
  const holdMenuRef = useRef();
  const storeKey = async (value) => {
    try {
      await SecureStore.setItemAsync("key", value);
      // const jsonValue = JSON.stringify(key);
      // await AsyncStorage.setItem("@key", jsonValue);
    } catch (e) {
      // saving error
      Alert.alert("Couldn't store API key", e.message);
    }
  };
  const storeMaxTokens = async () => {
    try {
      const jsonValue = JSON.stringify(maxTokens);
      await AsyncStorage.setItem("@maxTokens", jsonValue);
      setKeyChanged(true);
    } catch (e) {
      // saving error
      Alert.alert("Couldn't store max tokens", e.message);
    }
  };

  const storeAuthenticate = async () => {
    try {
      const jsonValue = JSON.stringify(authenticate);
      await AsyncStorage.setItem("@authenticate", jsonValue);
      setKeyChanged(true);
    } catch (e) {
      // saving error
      Alert.alert("Couldn't store authenticate", e.message);
    }
  };

  const storeRetainContext = async () => {
    try {
      const jsonValue = JSON.stringify(retainContext);
      await AsyncStorage.setItem("@retainContext", jsonValue);
    } catch (e) {
      // saving error
      Alert.alert("Couldn't store retain context", e.message);
    }
  };

  const storeColor = async () => {
    try {
      const jsonValue = JSON.stringify(color);
      await AsyncStorage.setItem("@color", jsonValue);
    } catch (e) {
      // saving error
      Alert.alert("Couldn't store color", e.message);
    }
  };

  const storeTimeout = async () => {
    try {
      const jsonValue = JSON.stringify(timeout);
      await AsyncStorage.setItem("@chatTimeout", jsonValue);
      setKeyChanged(true);
    } catch (e) {
      // saving error
      Alert.alert("Couldn't store timeout", e.message);
    }
  };

  const storeModel = async () => {
    try {
      const jsonValue = JSON.stringify(model);
      await AsyncStorage.setItem("@model", jsonValue);
      setKeyChanged(true);
    } catch (e) {
      // saving error
      Alert.alert("Couldn't store model", e.message);
    }
  };
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

  const storeTemperature = async () => {
    try {
      const jsonValue = JSON.stringify(temperature);
      await AsyncStorage.setItem("@temperature", jsonValue);
    } catch (e) {
      // saving error
      Alert.alert("Couldn't store temperature", e.message);
    }
  };

  const storePresencePenalty = async () => {
    try {
      const jsonValue = JSON.stringify(presencePenalty);
      await AsyncStorage.setItem("@presencePenalty", jsonValue);
    } catch (e) {
      // saving error
      Alert.alert("Couldn't store presence penalty", e.message);
    }
  };

  const storeFrequencyPenalty = async () => {
    try {
      const jsonValue = JSON.stringify(frequencyPenalty);
      await AsyncStorage.setItem("@frequencyPenalty", jsonValue);
    } catch (e) {
      // saving error
      Alert.alert("Couldn't store frequency penalty", e.message);
    }
  };

  const clearConversation = (i) => {
    setChatIndex(i == 0 ? 0 : i - 1);
    setDeleteChat(true);
    if (chats.length == 1) {
      setChats([[]]);
      setChatTitles(["New chat"]);
    } else {
      setChats((oldChats) => [
        ...oldChats.slice(0, i),
        ...oldChats.slice(i + 1),
      ]);
      setChatTitles((oldChatTitles) => [
        ...oldChatTitles.slice(0, i),
        ...oldChatTitles.slice(i + 1),
      ]);
    }
  };

  const resetData = () => {
    setDeleteChat(true);
    setChats([[]]);
    setChatIndex(0);
    setChatTitles(["New chat"]);
    setInput("");
    setEditMessage(null);
    setKey("test");
    setModel("gpt-3.5-turbo");
    setColor("#10a37f");
    setMaxTokens(1000);
    setChatTimeOut(10);
    setRetainContext(true);
    setIsDarkMode(true);
    setUseDeviceSettings(true);
    setTemperature(1);
    setPrescencePenalty(0);
    setFrequencyPenalty(0);
  };

  function onAuthenticate() {
    const auth = LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate with Face ID",
      fallbackLabel: "Enter Password",
    });
    auth.then((result) => {
      setIsAuthenticated(result.success);
      setAuthenticateSuccess(true);
    });
  }

  useEffect(() => {
    const dontStoreChat = chats.length == 1 && chats[0].length == 0;
    if (!dontStoreChat || deleteChat) {
      storeChats();
    }
  }, [chats, chatIndex]);

  useEffect(() => {
    if (key != "") {
      storeKey(key);
    }
  }, [key]);

  useEffect(() => {
    if (color != "") {
      storeColor(color);
    }
  }, [color]);

  useEffect(() => {
    if (maxTokens != 0) {
      storeMaxTokens();
    }
  }, [maxTokens]);

  useEffect(() => {
    if (timeout != null) {
      storeTimeout();
    }
  }, [timeout]);

  useEffect(() => {
    if (model != "") {
      storeModel();
    }
  }, [model]);

  useEffect(() => {
    if (retainContext != null) {
      storeRetainContext(retainContext);
    }
  }, [retainContext]);

  useEffect(() => {
    if (chatTitles[0] != null) {
      storeChatTitles();
    }
  }, [chatTitles]);

  useEffect(() => {
    if (authenticate != null) {
      storeAuthenticate();
    }
  }, [authenticate]);

  useEffect(() => {
    if (temperature != null) {
      storeTemperature();
    }
  }, [temperature]);

  useEffect(() => {
    if (presencePenalty != null) {
      storePresencePenalty();
    }
  }, [presencePenalty]);

  useEffect(() => {
    if (frequencyPenalty != null) {
      storeFrequencyPenalty();
    }
  }, [frequencyPenalty]);

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
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (
        appState.current.match(/inactive|background/) &&
        nextAppState === "active" &&
        !authenticateSuccess
      ) {
        setIsAuthenticated(false);
        authenticate && onAuthenticate();
      }
      appState.current = nextAppState;
      setAppStateVisible(appState.current);
      setTimeout(() => {
        if (appState.current.match(/background/)) {
          setAuthenticateSuccess(false);
          setIsAuthenticated(false);
        }
      }, 1000);
    });

    return () => {
      subscription.remove();
    };
  }, [authenticateSuccess]);

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@chatgpt");
        const retainContextJsonValue = await AsyncStorage.getItem(
          "@retainContext"
        );
        const chatTitlesJson = await AsyncStorage.getItem("@chatTitles");
        const darkModeJsonValue = await AsyncStorage.getItem("@darkMode");
        const maxTokensJsonValue = await AsyncStorage.getItem("@maxTokens");
        const timeoutJsonValue = await AsyncStorage.getItem("@chatTimeout");
        const modelJsonValue = await AsyncStorage.getItem("@model");
        const colorJsonValue = await AsyncStorage.getItem("@color");
        const useDeviceSettingsValue = await AsyncStorage.getItem(
          "@useDeviceSettings"
        );
        const keyJsonValue = await SecureStore.getItemAsync("key");
        const authenticateJsonValue = await AsyncStorage.getItem(
          "@authenticate"
        );
        const temperatureJsonValue = await AsyncStorage.getItem("@temperature");
        const presenceJsonValue = await AsyncStorage.getItem(
          "@presencePenalty"
        );
        const frequencyJsonValue = await AsyncStorage.getItem(
          "@frequencyPenalty"
        );

        const storedRetainContext =
          retainContextJsonValue != null
            ? JSON.parse(retainContextJsonValue)
            : true;
        const storedColor =
          colorJsonValue != null ? JSON.parse(colorJsonValue) : "#10a37f";
        const storedChatTitles =
          chatTitlesJson != null ? JSON.parse(chatTitlesJson) : ["New chat"];
        const storedKey = keyJsonValue != null ? keyJsonValue : "test";
        const storedRes = jsonValue != null ? JSON.parse(jsonValue) : [[]];
        const storedMaxTokens =
          maxTokensJsonValue != null ? JSON.parse(maxTokensJsonValue) : 1000;
        const storedTimeout = timeoutJsonValue
          ? JSON.parse(timeoutJsonValue)
          : 10;
        const storedModel =
          modelJsonValue != null ? JSON.parse(modelJsonValue) : "gpt-3.5-turbo";
        const storedDarkMode =
          darkModeJsonValue != null ? JSON.parse(darkModeJsonValue) : true;
        const storedUseDeviceSettings =
          useDeviceSettingsValue != null
            ? JSON.parse(useDeviceSettingsValue)
            : true;
        const storedAuthenticate =
          authenticateJsonValue != null
            ? JSON.parse(authenticateJsonValue)
            : false;
        const storedTemperature =
          temperatureJsonValue != null ? JSON.parse(temperatureJsonValue) : 1;
        const storedPresence =
          presenceJsonValue != null ? JSON.parse(presenceJsonValue) : 0;
        const storedFrequency =
          frequencyJsonValue != null ? JSON.parse(frequencyJsonValue) : 0;

        if (storedRes) {
          setChatTitles(storedChatTitles);
          setChats(storedRes);
          setChatIndex(storedRes.length - 1);
        }
        if (storedKey != "") {
          setKey(storedKey);
        }
        if (storedModel != "") {
          setModel(storedModel);
        }
        if (storedColor != "") {
          setColor(storedColor);
        }
        if (storedMaxTokens != null) {
          setMaxTokens(storedMaxTokens);
        }
        if (storedTimeout != null) {
          setChatTimeOut(storedTimeout);
        }

        if (storedRetainContext != null) {
          setRetainContext(storedRetainContext);
        }
        if (storedAuthenticate != null) {
          setAuthenticate(storedAuthenticate);
          if (storedAuthenticate) {
            onAuthenticate();
          }
        }
        if (storedTemperature != null) {
          setTemperature(storedTemperature);
        }
        if (storedPresence != null) {
          setPrescencePenalty(storedPresence);
        }
        if (storedFrequency != null) {
          setFrequencyPenalty(storedFrequency);
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
    <SafeAreaProvider>
      {!isAuthenticated && authenticate && (
        <AuthenticateScreen
          theme={theme}
          onAuthenticate={onAuthenticate}
          color={color}
          isDarkMode={isDarkMode}
        />
      )}
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
                index={chatIndex}
                clearConversation={clearConversation}
                input={input}
                editMessage={editMessage}
                apiKey={key}
                keyChanged={keyChanged}
                setKeyChanged={setKeyChanged}
                timeout={timeout}
                model={model}
                maxTokens={maxTokens}
                color={color}
                retainContext={retainContext}
                confirmDeleteVisible={confirmDeleteVisible}
                temperature={temperature}
                presencePenalty={presencePenalty}
                frequencyPenalty={frequencyPenalty}
                holdMenuRef={holdMenuRef}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Settings" options={{ headerShown: false }}>
            {(props) => (
              <SettingsScreen
                props={props}
                theme={theme}
                confirmResetVisible={confirmResetVisible}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Account" options={{ headerShown: false }}>
            {(props) => (
              <AccountScreen
                props={props}
                theme={theme}
                setKey={setKey}
                apiKey={key}
                setKeyChanged={setKeyChanged}
                color={color}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Privacy" options={{ headerShown: false }}>
            {(props) => (
              <PrivacyScreen
                props={props}
                theme={theme}
                color={color}
                retainContext={retainContext}
                setRetainContext={setRetainContext}
                authenticate={authenticate}
                setAuthenticate={setAuthenticate}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Chat Preferences"
            options={{ headerShown: false }}
          >
            {(props) => (
              <ChatPreferencesScreen
                props={props}
                theme={theme}
                maxTokens={maxTokens}
                timeout={timeout}
                model={model}
                temperature={temperature}
                presencePenalty={presencePenalty}
                frequencyPenalty={frequencyPenalty}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Max Tokens" options={{ headerShown: false }}>
            {(props) => (
              <MaxTokensScreen
                props={props}
                theme={theme}
                maxTokens={maxTokens}
                setMaxTokens={setMaxTokens}
                color={color}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Timeout" options={{ headerShown: false }}>
            {(props) => (
              <TimeoutScreen
                props={props}
                theme={theme}
                timeout={timeout}
                setTimeout={setChatTimeOut}
                color={color}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Model" options={{ headerShown: false }}>
            {(props) => (
              <ModelScreen
                props={props}
                theme={theme}
                model={model}
                setModel={setModel}
                color={color}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Temperature" options={{ headerShown: false }}>
            {(props) => (
              <TemperatureScreen
                props={props}
                theme={theme}
                temperature={temperature}
                setTemperature={setTemperature}
                color={color}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Presence penalty"
            options={{ headerShown: false }}
          >
            {(props) => (
              <PresencePenaltyScreen
                props={props}
                theme={theme}
                presencePenalty={presencePenalty}
                setPresencePenalty={setPrescencePenalty}
                color={color}
              />
            )}
          </Stack.Screen>
          <Stack.Screen
            name="Frequency penalty"
            options={{ headerShown: false }}
          >
            {(props) => (
              <FrequencyPenaltyScreen
                props={props}
                theme={theme}
                frequencyPenalty={frequencyPenalty}
                setFrequencyPenalty={setFrequencyPenalty}
                color={color}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="Appearance" options={{ headerShown: false }}>
            {(props) => (
              <AppearanceScreen
                props={props}
                theme={theme}
                isDarkMode={isDarkMode}
                setIsDarkMode={setIsDarkMode}
                useDeviceSettings={useDeviceSettings}
                setUseDeviceSettings={setUseDeviceSettings}
                color={color}
                setColor={setColor}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="AIcho Pro" options={{ headerShown: false }}>
            {(props) => (
              <ProScreen
                props={props}
                theme={theme}
                onPress={() => {}}
                color={color}
              />
            )}
          </Stack.Screen>
          <Stack.Screen name="About" options={{ headerShown: false }}>
            {(props) => <AboutScreen props={props} theme={theme} />}
          </Stack.Screen>
        </Stack.Navigator>
        <ConfirmDeleteConvosModal
          setChatIndex={setChatIndex}
          setChats={setChats}
          setDeleteChat={setDeleteChat}
          setChatTitles={setChatTitles}
          setInput={setInput}
          setEditMessage={setEditMessage}
          theme={theme}
          confirmDeleteVisible={confirmDeleteVisible}
        ></ConfirmDeleteConvosModal>
        <ConfirmResetDataModal
          onPress={resetData}
          theme={theme}
          visible={confirmResetVisible}
        ></ConfirmResetDataModal>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}
