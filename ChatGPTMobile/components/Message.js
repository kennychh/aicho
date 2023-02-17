import { StyleSheet, Text, View, Dimensions } from "react-native";
export const Message = ({ item }) => {
  const text = item.result?.text || "";
  const isInput = item.isInput;
  const windowWidth = Dimensions.get("window").width;
  return (
    <View
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

const styles = StyleSheet.create({
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
});
