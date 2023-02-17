import { StyleSheet, Text, View, Image } from "react-native";
import { More, Menu } from "../icons";
export const Header = () => {
  return (
    <View style={styles.bar}>
      <View style={styles.barIcon}>
        <Menu />
      </View>
      <View style={{ flex: 1, alignItems: "center" }}>
        <Image
          source={require("../assets/chat-gpt-logo.jpg")}
          style={styles.icon}
        />
        <Text style={styles.barText}>ChatGPT</Text>
      </View>
      <View style={styles.barIcon}>
        <More />
      </View>
    </View>
  );
};

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
});
