import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { Send } from "../icons";
export const Input = ({
  input,
  setInput,
  onSubmit,
  isResultValid,
  onLayout,
  height,
}) => {
  const windowWidth = Dimensions.get("window").width;
  return (
    <View>
      <View
        style={[
          styles.inputBottomBackground,
          { height: height / 2, width: windowWidth - 16 },
        ]}
      />
      <View style={styles.container} onLayout={(event) => onLayout(event)}>
        <View style={{ overflow: "hidden", borderRadius: 32 }}>
          <BlurView>
            <View style={styles.inputContainer}>
              <View style={{ flex: 1, paddingTop: 12, paddingBottom: 12 }}>
                <TextInput
                  placeholder="Enter prompt"
                  style={styles.input}
                  multiline={true}
                  value={input}
                  onChangeText={(s) => setInput(s)}
                />
              </View>
              <TouchableOpacity
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
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBottomBackground: {
    position: "absolute",
    backgroundColor: "white",
    bottom: 0,
  },
  container: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    position: "absolute",
    width: "100%",
    bottom: 0,
    overflow: "hidden",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 6,
    backgroundColor: "rgba(235, 235, 235,0.4)",
    flex: 1,
    maxHeight: 160,
  },
  button: {
    backgroundColor: "#10a37f",
    borderRadius: "50%",
    alignItems: "center",
    width: 32,
    height: 32,
    justifyContent: "center",
  },
  input: {
    fontSize: 16,
    marginLeft: 16,
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 6
  },
});
