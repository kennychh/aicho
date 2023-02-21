import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
  LayoutAnimation,
  UIManager,
  TouchableOpacity,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useEffect, useRef, useState } from "react";
import { MessageModal } from "./MessageModal";
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export const Message = ({ item, index, setMessage }) => {
  const text = item.result?.text || "";
  const isInput = item.isInput;
  const windowWidth = Dimensions.get("window").width;

  const [expandMessage, setExpandMessage] = useState(index != 0);
  const toggleExpandMessage = () => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: { type: "linear", property: "opacity" },
      update: { type: "spring", springDamping: 1 },
      delete: { type: "linear", property: "opacity" },
    });
  };

  const toggleExpandMessage2 = () => {
    LayoutAnimation.configureNext({
      duration: 300,
      create: { type: "linear", property: "opacity" },
      update: { type: "spring", springDamping: 1 },
      delete: { type: "linear", property: "opacity" },
    });
    setExpandMessage(true);
  };
  useEffect(() => {
    if (index == 0) {
      toggleExpandMessage();
      setTimeout(toggleExpandMessage2, 30);
    }
  }, []);

  return (
    <TouchableOpacity
      onLongPress={() => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setMessage(item);
      }}
      delayLongPress={300}
      style={[
        styles.itemContainer,
        {
          maxWidth: windowWidth - 120,
          bottom: 64,
        },
        expandMessage ? styles.movedItemContainer : null,
        isInput
          ? {
              marginLeft: "auto",
              backgroundColor: "#10a37f",
              fontColor: "white",
            }
          : { marginRight: "auto" },
      ]}
    >
      <View>
        <Text
          style={[
            styles.text,
            isInput ? { color: "white" } : { fontColor: "black" },
          ]}
        >
          {text}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  itemContainer: {
    backgroundColor: "#F7F7F7",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginTop: 16,
    alignSelf: "left",
    alignItems: "center",
    justifyContent: "center",
  },
  movedItemContainer: {
    bottom: 0,
  },
});
