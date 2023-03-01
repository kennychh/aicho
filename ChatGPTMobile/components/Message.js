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
  Keyboard,
  useColorScheme,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useEffect, useRef, useState } from "react";
import { Alert } from "../icons";
import { getTheme } from "../theme";
if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export const Message = ({ item, index, setMessage }) => {
  const colorScheme = useColorScheme();
  const theme = getTheme(colorScheme);
  const text = item?.result?.text || "";
  const isInput = item?.isInput;
  const isError = item?.isError;
  const windowWidth = Dimensions.get("window").width;

  const [expandMessage, setExpandMessage] = useState(index != 0);

  const toggleExpandMessage = () => {
    LayoutAnimation.configureNext({
      duration: 400,
      create: { type: "easeInEaseOut", property: "opacity" },
      update: { type: "spring", springDamping: 1 },
    });
  };

  const toggleExpandMessage2 = () => {
    LayoutAnimation.configureNext({
      duration: 400,
      create: { type: "easeInEaseOut", property: "opacity" },
      update: { type: "spring", springDamping: 1 },
    });
    setExpandMessage(true);
  };
  useEffect(() => {
    if (index == 0) {
      toggleExpandMessage();
      setTimeout(toggleExpandMessage2, 10);
    }
  }, []);

  return (
    <TouchableOpacity
      delayPressIn={150}
      onLongPress={() => {
        Keyboard.dismiss();
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        setMessage(item);
      }}
      delayLongPress={150}
      style={[
        styles.messageContainer,
        { bottom: 32 },
        expandMessage ? styles.movedItemContainer : null,
      ]}
    >
      {isError && !isInput && (
        <View style={[styles.alertIcon, { marginLeft: 0, marginRight: 8 }]}>
          <Alert />
        </View>
      )}
      <View
        style={[
          styles.itemContainer,
          {
            maxWidth: windowWidth - 100,
          },
          isInput
            ? {
                marginLeft: "auto",
                backgroundColor: "#10a37f",
                fontColor: "white",
              }
            : {
                marginRight: "auto",
                backgroundColor: theme.message.itemContainer.backgroundColor,
              },
        ]}
      >
        <View>
          <Text
            style={[
              styles.text,
              isInput ? { color: "white" } : { color: theme.message.fontColor },
            ]}
          >
            {text}
          </Text>
        </View>
      </View>
      {isError && isInput && (
        <View style={styles.alertIcon}>
          <Alert />
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  alertIcon: {
    marginTop: 16,
    marginLeft: 8,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 16,
  },
  itemContainer: {
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
  movedErrorContainer: {
    right: 0,
  },
});
