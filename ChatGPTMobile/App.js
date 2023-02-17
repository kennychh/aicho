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
} from "react-native";
import { useState, useEffect } from "react";
import { ArrowUp } from "./icons/ArrowUp";

export default function App() {
  const API_URL = "https://chatgpt-api-blue.vercel.app/api";
  const [input, setInput] = useState("");
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isResultValid, setResultValid] = useState(false);

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
      <Text style={isInput ? { textAlign: "right" } : { textAlign: "left" }}>
        {text}
      </Text>
    );
  };
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.componentContainer}
      >
        <FlatList
          inverted
          data={result}
          renderItem={renderItem}
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
              style={styles.button}
              disabled={!isResultValid}
            >
              <ArrowUp width="18px" height="18px" viewBox="0 0 24 24" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    paddingVertical: 16,
    alignItems: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  componentContainer: {
    paddingHorizontal: 24,
    width: "100%",
    flex: 1,
  },
  buttonContainer: { marginLeft: "auto" },
  button: {
    backgroundColor: "#10a37f",
    borderRadius: "50%",
    alignItems: "center",
    width: 40,
    height: 40,
    justifyContent: "center",
    marginRight: 8,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  input: {
    fontSize: 16,
    backgroundColor: '#F6F6F6',
    borderRadius: '50%',
    padding: 16,
    flexGrow: 1,
    width: "100%",
    flex: 1,
    position: "absolute",
  },
});
