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
  TouchableWithoutFeedback,
} from "react-native";
import * as Haptics from "expo-haptics";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Alert, Edit2, Refresh } from "../icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import HoldItem from "./HoldItem";
import { getTheme } from "../theme";

const Message = ({
  item,
  index,
  setMessage,
  setEditMessage,
  setInput,
  setRegen,
  regen,
  setRetry,
  setError,
  theme,
  color,
  listRef,
}) => {
  const text = item?.result?.text || "";
  const isInput = item?.isInput;
  const isError = item?.isError;
  const windowWidth = Dimensions.get("window").width;
  const swipeableRef = useRef(null);
  const [progressValue, setProgressValue] = useState();
  const progressRef = useRef();
  const [expandMessage, setExpandMessage] = useState(index != 0);
  const [haptic, setHaptic] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const animation = new Animated.Value(0);
  const inputRange = [0, 1];
  const outputRange = [1, 0.97];
  const scale = animation.interpolate({ inputRange, outputRange });
  const swipeEnabled = useRef(true);

  const onScaleInOut = () => {
    Animated.sequence([
      Animated.timing(animation, {
        duration: 80,
        toValue: 1,
        useNativeDriver: true,
      }),
      Animated.timing(animation, {
        duration: 80,
        toValue: 0,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (haptic) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    }
  }, [haptic]);

  const renderAction = (progress, dragX) => {
    const trans = dragX.interpolate({
      inputRange: [0, 48],
      outputRange: [-16, 0],
      extrapolate: "clamp",
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
            padding: 8,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            backgroundColor: theme.onBackgroundColor,
            borderRadius: "100%",
            marginRight: 8,
            marginLeft: 8,
            marginTop: 16,
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
      extrapolate: "clamp",
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
            padding: 8,
            justifyContent: "center",
            alignItems: "center",
            alignSelf: "center",
            backgroundColor: theme.onBackgroundColor,
            borderRadius: "100%",
            marginRight: 8,
            marginLeft: 8,
            marginTop: 16,
          },
        ]}
      >
        <Edit2 width="20px" height="20px" stroke={theme.iconColor} />
      </Animated.View>
    );
  };
  const messageItem = (
    <TouchableWithoutFeedback
      delayLongPress={200}
      onLongPress={() => {
        swipeEnabled.current = false;
        onScaleInOut();
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Keyboard.dismiss();
        listRef?.current?.setNativeProps({ scrollEnabled: false });
        setTimeout(() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          setIsActive(true);
        }, 160);
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        // setMessage(item);
      }}
    >
      <Animated.View
        style={[
          styles.itemContainer,
          {
            maxWidth: windowWidth - 100,
            transform: [{ scale }],
          },
          isInput
            ? {
                alignSelf: "flex-end",
                backgroundColor: color,
                fontColor: "white",
              }
            : {
                alignSelf: "flex-start",
                backgroundColor: theme.message.itemContainer.backgroundColor,
              },
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
      </Animated.View>
    </TouchableWithoutFeedback>
  );
  return (
    text != "" && (
      <View style={{ transform: [{ scaleY: -1 }] }}>
        <View>
          <Swipeable
            enabled={swipeEnabled.current}
            ref={swipeableRef}
            friction={2}
            rightThreshold={48}
            leftThreshold={48}
            renderRightActions={(progress, dragX) => {
              setProgressValue(progress);
              progress.addListener(({ value }) => {
                if (value >= 1 && !haptic) {
                  setHaptic(true);
                }
              });
              return isInput && renderRightAction(progress, dragX);
            }}
            renderLeftActions={(progress, dragX) => {
              setProgressValue(progress);
              progress.addListener(({ value }) => {
                if (value >= 1 && !haptic) {
                  setHaptic(true);
                }
              });
              return !isInput && renderAction(progress, dragX);
            }}
            overshootFriction={2}
            hitSlop={{ left: -60 }}
            onSwipeableWillOpen={(direction) => {
              if (direction == "right") {
                setMessage(null);
                setEditMessage(item);
                setInput(text);
              } else {
                setError(false);
                setRegen(item);
              }
              setTimeout(() => {
                swipeableRef.current?.close();
              }, 10);
            }}
            onSwipeableClose={() => {
              setHaptic(false);
              progressValue.removeAllListeners();
              setProgressValue(null);
            }}
          >
            <View style={styles.messageContainer}>
              {isError && !isInput && (
                <View
                  style={{
                    marginLeft: 8,
                    marginRight: 0,
                    justifyContent: "center",
                  }}
                >
                  <Alert />
                </View>
              )}
              <HoldItem
                isActive={isActive}
                setIsActive={setIsActive}
                tint={theme == getTheme("dark") ? "dark" : "light"}
                isInput={isInput}
                listRef={listRef}
                swipeEnabled={swipeEnabled}
                theme={theme}
              >
                {messageItem}
              </HoldItem>
              {isError && isInput && (
                <View style={styles.alertIcon}>
                  <Alert />
                </View>
              )}
            </View>
          </Swipeable>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  alertIcon: {
    marginRight: 8,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  text: {
    fontSize: 16,
  },
  itemContainer: {
    padding: 12,
    marginHorizontal: 8,
    borderRadius: 22,
    alignSelf: "left",
    alignItems: "center",
    justifyContent: "center",
    // minHeight: 40,
    minWidth: 48,
  },
  movedItemContainer: {
    bottom: 0,
  },
  movedErrorContainer: {
    right: 0,
  },
});

function arePropsEqual(prevProps, nextProps) {
  return (
    prevProps.color === nextProps.color &&
    prevProps.item === nextProps.item &&
    prevProps.theme === nextProps.theme
  );
}

export default memo(Message, arePropsEqual);
