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
import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Alert, Copy, Edit, Edit2, Refresh } from "../icons";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import * as Clipboard from "expo-clipboard";
import HoldItem from "./HoldItem";
import { getTheme } from "../theme";
import { useAnimatedRef, useSharedValue } from "react-native-reanimated";
import { AppContext } from "../context";

const Message = ({
  item,
  index,
  setRegen,
  setError,
  listRef,
  setScrollEnabled,
  setShowEditMessage,
}) => {
  const { handleEditMessage, theme, color, holdMenuRef } =
    useContext(AppContext);
  const text = item?.result?.text || "";
  const isInput = item?.isInput;
  const isError = item?.isError;
  const windowWidth = Dimensions.get("window").width;
  const swipeableRef = useRef(null);
  const progressValue = useRef();
  const [haptic, setHaptic] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const animation = useRef(new Animated.Value(0)).current;
  const inputRange = [0, 1];
  const outputRange = [1, 0.97];
  const scale = animation.interpolate({ inputRange, outputRange });
  const [swipeEnabled, setSwipeEnabled] = useState(true);
  const active = useSharedValue(false);
  const containerRef = useAnimatedRef();
  const menuRef = useAnimatedRef();
  const itemRectY = useSharedValue(0);
  const itemRectX = useSharedValue(0);
  const itemRectWidth = useSharedValue(0);
  const itemRectHeight = useSharedValue(0);
  const [showPortal, setShowPortal] = useState(false);
  const menuWidth = useSharedValue(0);
  const menuHeight = useSharedValue(0);
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(text);
  };
  const holdMenuInputData = [
    {
      title: "Copy",
      icon: <Copy stroke={theme.iconColor} width={20} height={20} />,
      onPress: () => {
        copyToClipboard();
      },
    },
    {
      title: "Edit",
      icon: <Edit2 stroke={theme.iconColor} width={20} height={20} />,
      onPress: () => {
        handleEditMessage(item);
        // handleInput(text);
      },
    },
  ];

  const holdMenuData = [
    {
      title: "Copy",
      icon: <Copy stroke={theme.iconColor} width={20} height={20} />,
      onPress: () => {
        copyToClipboard();
      },
    },
    {
      title: "Regenerate",
      icon: <Refresh stroke={theme.iconColor} width={20} height={20} />,
      onPress: () => {
        setError(false);
        setRegen(item);
      },
    },
  ];

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
            marginLeft: 16,
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
            marginRight: 16,
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
        onScaleInOut();
        setSwipeEnabled(false);
        setShowPortal(true);
        setScrollEnabled(false);
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        Keyboard.dismiss();
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        containerRef?.current?.measure((x, y, width, height, pageX, pageY) => {
          if (itemRectY.value != pageY || !active.value) {
            itemRectX.value = pageX;
            itemRectY.value = pageY;
            itemRectHeight.value = height;
            itemRectWidth.value = width;
            active.value = true;
          }
        });
        // Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        // setMessage(item);
      }}
    >
      <Animated.View
        style={[
          styles.itemContainer,
          {
            maxWidth: (windowWidth - 16) * 0.8,
            transform: [{ scale: scale }],
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
      </Animated.View>
    </TouchableWithoutFeedback>
  );
  return (
    text != "" && (
      <View style={{ transform: [{ scaleY: -1 }] }}>
        <View>
          <Swipeable
            enabled={swipeEnabled}
            ref={swipeableRef}
            friction={2}
            rightThreshold={48}
            leftThreshold={48}
            renderRightActions={(progress, dragX) => {
              progressValue.current = progress;
              progress.addListener(({ value }) => {
                if (value >= 1 && !haptic) {
                  setHaptic(true);
                }
              });
              return isInput && renderRightAction(progress, dragX);
            }}
            renderLeftActions={(progress, dragX) => {
              progressValue.current = progress;
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
                setShowEditMessage(true);
                handleEditMessage(item);
                // handleInput(text);
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
              progressValue?.current?.removeAllListeners();
              progressValue.current = null;
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
                isError={isError}
                listRef={listRef}
                setSwipeEnabled={setSwipeEnabled}
                theme={theme}
                holdMenuRef={holdMenuRef}
                holdMenuData={isInput ? holdMenuInputData : holdMenuData}
                active={active}
                itemRectHeight={itemRectHeight}
                itemRectWidth={itemRectWidth}
                itemRectX={itemRectX}
                itemRectY={itemRectY}
                containerRef={containerRef}
                menuWidth={menuWidth}
                menuHeight={menuHeight}
                menuRef={menuRef}
                showPortal={showPortal}
                setShowPortal={setShowPortal}
                setScrollEnabled={setScrollEnabled}
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
    marginRight: 16,
  },
  messageContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
  },
  text: {
    fontSize: 16,
    lineHeight: 18,

    textAlignVertical: "center",
  },
  itemContainer: {
    paddingVertical: 11,
    paddingHorizontal: 12,
    marginHorizontal: 16,
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
