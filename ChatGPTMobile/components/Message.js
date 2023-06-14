import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Platform,
  LayoutAnimation,
  UIManager,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import * as Haptics from "expo-haptics";
import { useCallback, useEffect, useRef, useState } from "react";
import { Alert, Edit2, Refresh } from "../icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

export const Message = ({
  item,
  index,
  setMessage,
  setEditMessage,
  setInput,
  setRegenIndex,
  setRegen,
  theme,
  color,
}) => {
  const text = item?.result?.text || "";
  const isInput = item?.isInput;
  const isError = item?.isError;
  const windowWidth = Dimensions.get("window").width;
  const swipeableRef = useRef(null);
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

  const renderAction = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-48, 0],
      outputRange: [-16, 0],
    });
    const opacity = dragX.interpolate({
      inputRange: [0, 48],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    const scale = dragX.interpolate({
      inputRange: [0, 16],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    return (
      <Animated.View
        style={[
          styles.text,
          {
            transform: [{ translateX: trans }, { scale }],
            opacity: opacity,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            height: 40,
            backgroundColor: theme.onBackgroundColor,
            borderRadius: "100%",
            marginRight: 8,
          },
        ]}
      >
        <Refresh width="20px" height="20px" stroke={theme.iconColor} />
      </Animated.View>
    );
  };

  const renderRightAction = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [-48, 0],
      outputRange: [0, 16],
    });
    const scale = dragX.interpolate({
      inputRange: [-16, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    const opacity = dragX.interpolate({
      inputRange: [-48, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    return (
      <Animated.View
        style={[
          {
            transform: [{ translateX: trans }, { scale }],
            opacity: opacity,
            width: 40,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            height: 40,
            backgroundColor: theme.onBackgroundColor,
            borderRadius: "100%",
            marginRight: 16,
          },
        ]}
      >
        <Edit2 width="20px" height="20px" stroke={theme.iconColor} />
      </Animated.View>
    );
  };
  return (
    <GestureHandlerRootView>
      <View style={{ paddingTop: 16 }}>
        <Swipeable
          ref={swipeableRef}
          friction={2}
          rightThreshold={40}
          renderRightActions={isInput && renderRightAction}
          renderLeftActions={!isInput && renderAction}
          overshootFriction={2}
          hitSlop={{ left: -60 }}
          onSwipeableWillOpen={(direction) => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            if (direction == "right") {
              setMessage(null);
              setEditMessage(item);
              setInput(text);
            } else {
              setRegenIndex(index);
              setRegen(true);
            }
            setTimeout(() => {
              swipeableRef.current.close();
            }, 100);
          }}
          // onSwipeableOpen={(direction) => {
          //   console.log(direction);
          //   swipeableRef.current.close()
          // }}
        >
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
              expandMessage ? styles.movedItemContainer : null,
            ]}
          >
            {isError && !isInput && (
              <View
                style={[styles.alertIcon, { marginLeft: 0, marginRight: 8 }]}
              >
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
                      backgroundColor: color,
                      fontColor: "white",
                    }
                  : {
                      marginRight: "auto",
                      backgroundColor:
                        theme.message.itemContainer.backgroundColor,
                    },
              ]}
            >
              <View>
                <Text
                  style={[
                    styles.text,
                    isInput
                      ? { color: "white" }
                      : { color: theme.message.fontColor },
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
        </Swipeable>
      </View>
    </GestureHandlerRootView>
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
    marginHorizontal: 16,
    borderRadius: 24,
    alignSelf: "left",
    alignItems: "center",
    justifyContent: "center",
    minHeight: 40,
  },
  movedItemContainer: {
    bottom: 0,
  },
  movedErrorContainer: {
    right: 0,
  },
});
