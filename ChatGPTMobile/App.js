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
import { ArrowUp } from "./icons/ArrowUp";

export default function App() {
  const API_URL = "https://chatgpt-api-blue.vercel.app/api";
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isResultValid, setResultValid] = useState(false);
  const windowWidth = Dimensions.get("window").width;

  useEffect(() => {
    if (input != "") {
      setResultValid(true);
    } else {
      setResultValid(false);
    }
  }, [input]);

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
        <View style={styles.bar}>
          <Image
            source={require("./assets/chat-gpt-logo.jpg")}
            style={styles.icon}
          />
          <Text style={styles.barText}>ChatGPT</Text>
        </View>
        <FlatList
          inverted
          data={result}
          renderItem={renderItem}
          style={{ paddingHorizontal: 24 }}
          keyExtractor={(item) => {
            return item.result.id;
          }}
        />
        <View style={styles.messageContainer}>
          <TextInput
            placeholder="Enter prompt"
            style={styles.input}
            value={input}
            onChangeText={(s) => setInput(s)}
          />
          <View style={styles.buttonContainer}>
            <Pressable
              onPress={() => {
                onSubmit();
              }}
              style={[
                styles.button,
                !isResultValid ? { backgroundColor: "transparent" } : {},
              ]}
              disabled={!isResultValid}
            >
              {isResultValid ? (
                <ArrowUp width="18px" height="18px" viewBox="0 0 24 24" />
              ) : (
                <View />
              )}
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
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
    width: "100%",
    borderBottomColor: "#F6F6F6",
    borderBottomWidth: 1,
    backgroundColor: "white",
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
