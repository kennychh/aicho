import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Pressable, Alert } from "react-native";
import { useState } from "react";

export default function App() {
  const API_URL = "http://localhost:3000/api";
  const [input, setInput] = useState("what is chatgpt");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    setResult("");
    try {
      const response = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({input: input}),
      });
      const data = await response.json();
      setResult(data.result);
    } catch (e) {
      Alert.alert("Couldn't generate ideas", e.message);
    } finally {
      setLoading(false);
    }
  };
  console.log(result)
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <Text>{result}</Text>
      <Pressable onPress={() => {onSubmit()}} style={styles.button}>
        <Text style={styles.buttonText}>Generate gift ideas</Text>
      </Pressable>
    </View>
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
});
