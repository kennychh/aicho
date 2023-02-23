import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  View,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  Header,
  MessageList,
  Input,
  MenuModal,
  MessageModal,
} from "./components";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const API_URL = "https://chatgpt-api-blue.vercel.app/api";
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [retry, setRetry] = useState(null);
  const [isResultValid, setResultValid] = useState(false);
  const [inputHeight, setInputHeight] = useState(0);
  const modalizeRef = useRef(null);
  const messageModalizeRef = useRef(null);

  const onLayout = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setInputHeight(height);
  };

  const onOpen = (modalizeRef) => {
    modalizeRef.current?.open();
  };

  const onClose = (modalizeRef) => {
    modalizeRef.current?.close();
  };

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@storage_Key", jsonValue);
    } catch (e) {
      // saving error
      Alert.alert("Couldn't store results", e.message);
    }
  };

  const removeData = async () => {
    try {
      await AsyncStorage.removeItem("@storage_Key");
      setResult([]);
    } catch (e) {
      Alert.alert("Failed to remove conversation", e.message);
    }
  };

  useEffect(() => {
    const getData = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem("@storage_Key");
        const storedRes = jsonValue != null ? JSON.parse(jsonValue) : [];
        setResult(storedRes);
      } catch (e) {
        // error reading value
        Alert.alert("Couldn't retrieve results", e.message);
      }
    };

    getData();
  }, []);

  useEffect(() => {
    if (input.replace(/\s+/g, "") != "") {
      setResultValid(true);
    } else {
      setResultValid(false);
    }
  }, [input]);

  useEffect(() => {
    storeData(result);
  }, [result]);

  useEffect(() => {
    if (message) {
      onOpen(messageModalizeRef);
    }
  }, [message]);

  useEffect(() => {
    if (retry != null) {
      setResult((oldResult) => [
        ...oldResult.filter((message) => message.result.id !== retry.result.id),
      ]);
      onSubmit();
      setRetry(null);
    }
  }, [retry]);

  const generateInputId = () => {
    const char =
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const random = Array.from(
      { length: 6 },
      () => char[Math.floor(Math.random() * char.length)]
    );
    const randomString = random.join("");
    return randomString;
  };

  const onSubmit = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const inputId = generateInputId();
    const inputText =
      retry != null
        ? retry
        : {
            result: {
              text: input,
              id: inputId,
            },
            isInput: true,
          };
    setInput("");
    const res = retry && result.length > 1 ? result[1] : result[0];
    setResult((oldResult) => [inputText, ...oldResult]);
    try {
      const response = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: retry != null ? retry.result?.text : input,
          conversationId: res?.result?.conversationId,
          id: res?.result?.id,
        }),
      });
      const data = await response.json();
      if (data.error) {
        console.log(data.error.message);
        const errorInputText = {
          ...inputText,
          isError: true,
        };
        setResult((oldResult) => [errorInputText, ...oldResult.slice(1)]);
      } else {
        setResult((oldResult) => [data, ...oldResult]);
      }
    } catch (e) {
      Alert.alert("Error occured", e.message);
      const errorInputText = {
        ...inputText,
        isError: true,
      };
      setResult((oldResult) => [errorInputText, ...oldResult.slice(1)]);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container}
        edges={["top", "left", "right", "bottom"]}
      >
        <StatusBar animated={true} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.componentContainer}
        >
          <Header onOpen={onOpen} modalizeRef={modalizeRef} />
          <View style={{ flex: 1, overflow: "hidden" }}>
            <MessageList
              data={result}
              inputOffset={inputHeight}
              setMessage={setMessage}
            />
            <Input
              input={input}
              setInput={setInput}
              onSubmit={onSubmit}
              isResultValid={isResultValid}
              onLayout={onLayout}
              height={inputHeight}
            />
          </View>
        </KeyboardAvoidingView>
        <MenuModal
          deleteConvo={removeData}
          modalizeRef={modalizeRef}
          onClose={onClose}
        />
        <MessageModal
          message={message}
          modalizeRef={messageModalizeRef}
          onClose={onClose}
          setMessage={setMessage}
          setRetry={setRetry}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  componentContainer: {
    width: "100%",
    flex: 1,
  },
});
