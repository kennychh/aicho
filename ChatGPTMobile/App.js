import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Animated,
  SafeAreaView,
  View,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { Header, MessageList, Input, MenuModal } from "./components";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const API_URL = "https://chatgpt-api-blue.vercel.app/api";
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [animate, setAnimate] = useState(true);
  const [loading, setLoading] = useState(false);
  const [isResultValid, setResultValid] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(0)).current;
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
      // remove error
    }

    console.log("Done.");
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

  const onSubmit = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const inputText = {
      result: {
        text: input,
      },
      isInput: true,
    };
    setInput("");
    const res = result[0];
    setResult((oldResult) => [inputText, ...oldResult]);
    console.log(inputText);
    try {
      const response = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          input: input,
          conversationId: res?.result.conversationId,
          id: res?.result.id,
        }),
      });
      const data = await response.json();
      setResult((oldResult) => [data, ...oldResult]);
    } catch (e) {
      Alert.alert("Couldn't generate ideas", e.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.componentContainer}
      >
        <Header setModalVisible={setModalVisible} setAnimate={setAnimate} />
        <MessageList data={result} />
        <Input
          input={input}
          setInput={setInput}
          onSubmit={onSubmit}
          isResultValid={isResultValid}
        />
      </KeyboardAvoidingView>
      <MenuModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        fadeAnim={fadeAnim}
        slideAnim={slideAnim}
        animate={animate}
        setAnimate={setAnimate}
        deleteConvo={removeData}
      />
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  componentContainer: {
    width: "100%",
    flex: 1,
  },
});
