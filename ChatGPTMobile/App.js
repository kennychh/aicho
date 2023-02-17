import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  Dimensions,
  Image,
} from "react-native";
import { useState, useEffect } from "react";
import { Send, More, Menu } from "./icons";
import { Header, MessageList, Input } from "./components";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function App() {
  const API_URL = "https://chatgpt-api-blue.vercel.app/api";
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isResultValid, setResultValid] = useState(false);
  const windowWidth = Dimensions.get("window").width;

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
    if (input != "") {
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
  const renderItem = ({ item }) => {
    const text = item.result?.text || "";
    const isInput = item.isInput;
    return (
      <View
        key={item.result.id}
        style={[
          styles.itemContainer,
          { maxWidth: windowWidth - 120 },
          isInput
            ? {
                marginLeft: "auto",
                backgroundColor: "#10a37f",
                fontColor: "white",
              }
            : { marginRight: "auto" },
        ]}
      >
        <Text
          style={[
            styles.text,
            isInput ? { color: "white" } : { fontColor: "black" },
          ]}
        >
          {text}
        </Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar animated={true} />
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.componentContainer}
      >
        <Header />
        <MessageList data={result} />
        <Input
          input={input}
          setInput={setInput}
          onSubmit={onSubmit}
          isResultValid={isResultValid}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  barIcon: {
    width: 24,
    height: 24,
  },
  barText: {
    fontSize: 12,
    marginVertical: 8,
  },
  icon: {
    width: 48,
    height: 48,
    borderRadius: "50%",
  },
  bar: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    borderBottomColor: "#F6F6F6",
    borderBottomWidth: 1,
    backgroundColor: "white",
    alignContent: "space-between",
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 16,
  },
  itemContainer: {
    backgroundColor: "#F7F7F8",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginTop: 16,
    alignSelf: "left",
    alignItems: "center",
    justifyContent: "center",
  },
  messageContainer: {
    flexDirection: "row",
    paddingVertical: 16,
    alignItems: "center",
    paddingHorizontal: 24,
    justifyContent: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  componentContainer: {
    width: "100%",
    flex: 1,
  },
  buttonContainer: { marginLeft: "auto" },
  button: {
    backgroundColor: "#10a37f",
    borderRadius: "50%",
    alignItems: "center",
    width: 32,
    height: 32,
    justifyContent: "center",
    marginRight: 6,
    marginVertical: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  input: {
    fontSize: 16,
    backgroundColor: "#F6F6F6",
    borderRadius: 32,
    paddingVertical: 12,
    paddingLeft: 16,
    paddingRight: 42,
    flexGrow: 1,
    width: "100%",
    flex: 1,
    position: "absolute",
  },
});
