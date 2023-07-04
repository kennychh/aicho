import { Dimensions, StyleSheet, Text, View } from "react-native";
import { Alert } from "../icons";

export const PreviewMessage = ({ item, color, theme }) => {
  const text = item?.result?.text || "";
  const isInput = item?.isInput;
  const isError = item?.isError;
  const windowWidth = Dimensions.get("window").width;

  return (
    <View style={styles.messageContainer}>
      <View
        style={[
          styles.itemContainer,
          {
            maxWidth: (windowWidth - 48) * 0.8,
          },
          isInput
            ? {
                marginLeft: "auto",
                backgroundColor: color,
                fontColor: "white",
              }
            : {
                marginRight: "auto",
                backgroundColor: theme.message.itemContainer.backgroundColor,
              },
          isError ? { marginRight: 8 } : {},
        ]}
      >
        <Text
          style={[
            styles.text,
            isInput ? { color: "white" } : { color: theme.message.fontColor },
          ]}
        >
          {text}
        </Text>
      </View>
      {isError && isInput && (
        <View style={styles.alertIcon}>
          <Alert width={20} height={20} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    width: "100%",
    transform: [{ scaleY: -1 }],
  },
  itemContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    marginHorizontal: 16,
    borderRadius: 18,
    alignSelf: "left",
    alignItems: "center",
    justifyContent: "center",
    minWidth: 40,
  },
  text: {
    fontSize: 14,
    lineHeight: 16,

    textAlignVertical: "center",
  },
  alertIcon: {
    marginRight: 16,
  },
});
