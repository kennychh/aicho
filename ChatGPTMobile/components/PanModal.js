import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Divider } from "./Divider";
import * as Haptics from "expo-haptics";
import { useMemo } from "react";
import {
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";

export const PanModal = ({ visible, theme, children }) => {
  const insets = useSafeAreaInsets();
  const DURATION = 200;
  const windowHeight = Dimensions.get("window").height;
  const containerHeight = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGesture = useAnimatedGestureHandler(
    {
      onActive: (e) => {
        translateY.value =
          e.translationY < 0
            ? e.translationY - e.translationY / 1.08
            : e.translationY;
      },
      onEnd: (e) => {
        if (e.velocityY > 2000) {
          visible.value = false;
        }
        translateY.value = withTiming(0, 200);
      },
    },
    [translateY]
  );
  const progress = useDerivedValue(() => {
    return visible.value
      ? withSpring(1, { damping: 100, stiffness: 600 })
      : withSpring(0, { damping: 100, stiffness: 600 });
  });
  const animatedViewStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ["transparent", theme.bottomModal.backgroundColor]
    );
    return {
      backgroundColor: backgroundColor,
      top: visible.value
        ? 0
        : withDelay(DURATION, withTiming(windowHeight, { duration: 0 })),
    };
  });

  const animatedParentViewStyle = useAnimatedStyle(() => {
    return {
      top: visible.value
        ? 0
        : withDelay(DURATION, withTiming(windowHeight, { duration: 0 })),
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      top: containerHeight.value != 0 ? containerHeight.value : 0,
      transform: [
        {
          translateY: visible.value
            ? withSpring(-containerHeight.value + 500, {
                damping: 100,
                stiffness: 500,
              })
            : withSpring(0, { damping: 100, stiffness: 600 }),
        },
      ],
    };
  });
  const animatedChildrenStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  const viewStyle = useMemo(
    () => [animatedViewStyle, styles.view(theme)],
    [animatedViewStyle]
  );

  const parentViewStyle = useMemo(
    () => [
      animatedParentViewStyle,
      styles.view(theme),
      { backgroundColor: "transparent" },
    ],
    [animatedParentViewStyle]
  );

  const containerStyle = useMemo(
    () => [styles.container, animatedContainerStyle],
    [animatedContainerStyle]
  );

  const childrenStyle = useMemo(
    () => [animatedChildrenStyle],
    [animatedChildrenStyle]
  );
  return (
    <Animated.View style={parentViewStyle}>
      <TapGestureHandler
        onHandlerStateChange={() => {
          visible.value = false;
        }}
      >
        <Animated.View style={viewStyle} />
      </TapGestureHandler>
      <Animated.View style={containerStyle}>
        <PanGestureHandler onGestureEvent={panGesture}>
          <Animated.View
            style={childrenStyle}
            onLayout={(event) => {
              var { x, y, width, height } = event.nativeEvent.layout;
              if (height != 0) {
                containerHeight.value = height;
              }
            }}
          >
            {children}
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  view: (theme) => ({
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: theme.bottomModal.backgroundColor,
    zIndex: 10,
    justifyContent: "flex-end",
  }),
  text: (theme) => ({
    fontSize: 16,
    lineHeight: 18,
    alignSelf: "center",
    // fontWeight: "500",
    color: theme.fontColor,
  }),
  description: (theme) => ({
    fontSize: 14,
    alignSelf: "center",
    color: theme.secondaryIconColor,
    textAlign: "center",
  }),
  descriptionContainer: (theme) => ({
    paddingVertical: 16,
    paddingHorizontal: 48,
    backgroundColor: theme.onBackgroundColor,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  }),
  container: {
    width: "100%",
    zIndex: 11,
  },
  ctaButtonContainer: (theme) => ({
    paddingVertical: 16,
    paddingHorizontal: 48,
    backgroundColor: theme.onBackgroundColor,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  }),
  dividerContainer: (theme) => ({
    backgroundColor: theme.onBackgroundColor,
    marginHorizontal: 16,
  }),
  cancelButtonContainer: (theme) => ({
    paddingVertical: 16,
    paddingHorizontal: 48,
    backgroundColor: theme.onBackgroundColor,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 16,
    borderRadius: 16,
    marginTop: 8,
  }),
});
