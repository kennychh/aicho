import { StyleSheet, View, Pressable, TextInput } from "react-native";
import { Send } from "../icons";
export const Input = ({ input, setInput, onSubmit, isResultValid }) => {
  return (
    <View style={styles.inputContainer}>
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
            !isResultValid ? { backgroundColor: "#A3A3A3" } : {},
          ]}
          disabled={!isResultValid}
        >
          <Send width="18px" height="18px" stroke="#fff" />
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    paddingVertical: 16,
    alignItems: "center",
    paddingHorizontal: 24,
    justifyContent: "center",
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
