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
} from "react-native";
import { useState, useEffect } from "react";

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
    return <Text style={isInput ? {textAlign: 'right'} : {textAlign: 'left'}}>{text}</Text>;
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <FlatList
        inverted
        data={result}
        renderItem={renderItem}
        keyExtractor={(item) => {
          return item.result.id;
        }}
      />
      <TextInput
        placeholder="Enter prompt"
        style={styles.input}
        value={input}
        onChangeText={(s) => setInput(s)}
      />
      <Pressable
        onPress={() => {
          onSubmit();
        }}
        style={styles.button}
        disabled={!isResultValid}
      >
        <Text style={styles.buttonText}>Generate gift ideas</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#10a37f",
    padding: 16,
    borderRadius: 4,
    alignItems: "center",
    marginVertical: 6,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  input: {
    fontSize: 16,

    borderColor: "#353740;",
    borderWidth: 1,
    borderRadius: 4,

    padding: 16,
    marginTop: 6,
    marginBottom: 12,
  },
});
