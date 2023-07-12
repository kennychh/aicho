import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
  TouchableWithoutFeedback,
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
  runOnJS,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Divider } from "./Divider";
import * as Haptics from "expo-haptics";
import { useMemo } from "react";
import {
  PanGestureHandler,
  TapGestureHandler,
} from "react-native-gesture-handler";

export const PanModal = ({
  visible,
  theme,
  children,
  snap = true,
  fullHeight = false,
  translateY,
  setScrollEnabled,
  title,
  flatListRef,
}) => {
  const insets = useSafeAreaInsets();
  const DURATION = 200;
  const windowHeight = Dimensions.get("window").height;
  const containerHeight = useSharedValue(0);

  const maxTranslateY = useDerivedValue(
    () => windowHeight - containerHeight.value - insets.top,
    [containerHeight.value]
  );

  const panGesture = useAnimatedGestureHandler(
    {
      onStart: (e, ctx) => {
        ctx.startY = translateY.value;
        if (setScrollEnabled) {
          runOnJS(setScrollEnabled)(true);
        }
      },
      onActive: (e, ctx) => {
        if (
          ctx.startY + e.translationY <= -maxTranslateY.value &&
          (!snap || fullHeight)
        ) {
          translateY.value =
            -maxTranslateY.value +
            (ctx.startY + e.translationY + maxTranslateY.value) / 4;
        } else if (e.translationY < 0 && snap && !fullHeight) {
          translateY.value = ctx.startY + e.translationY - e.translationY / 1.3;
        } else {
          translateY.value = ctx.startY + e.translationY;
        }
      },
      onEnd: (e, ctx) => {
        if (e.velocityY > 2000) {
          visible.value = false;
          translateY.value = withTiming(0, 200);
        } else if (
          ctx.startY + e.translationY <= -maxTranslateY.value + 100 &&
          fullHeight
        ) {
          translateY.value = withTiming(-maxTranslateY.value, 200);
        } else {
          translateY.value = withTiming(0, 200);
        }
      },
    },
    [translateY]
  );

  const backDropPanGesture = useAnimatedGestureHandler(
    {
      onFinish: (e) => {
        if (e.translationY == 0) {
          visible.value = false;
        }
      },
    },
    []
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
            ? withSpring(-containerHeight.value, {
                damping: 100,
                stiffness: 500,
              })
            : withSpring(0, { damping: 100, stiffness: 600 }),
        },
      ],
    };
  });
  const animatedChildrenStyle = useAnimatedStyle(() => {
    const bottomPadding = fullHeight ? 0 : insets.bottom + 8;
    return {
      ...(containerHeight.value != 0 && translateY.value <= 0
        ? {
            height: containerHeight.value - translateY.value + bottomPadding,
          }
        : {}),
      transform: [{ translateY: translateY.value >= 0 ? translateY.value : 0 }],
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
    () => [
      styles.modalContainerStyle(theme),
      fullHeight && { minHeight: 500 },
      animatedChildrenStyle,
    ],
    [animatedChildrenStyle]
  );
  return (
    <Animated.View style={parentViewStyle}>
      <PanGestureHandler onGestureEvent={backDropPanGesture}>
        <Animated.View style={viewStyle} />
      </PanGestureHandler>
      <Animated.View style={containerStyle}>
        <PanGestureHandler
          onGestureEvent={panGesture}
          waitFor={flatListRef}
          activeOffsetY={[-30, 30]}
        >
          <Animated.View
            onLayout={(event) => {
              var { x, y, width, height } = event.nativeEvent.layout;
              if (height != 0 && containerHeight.value == 0) {
                containerHeight.value = height;
              }
            }}
          >
            <Animated.View style={childrenStyle}>
              <View style={styles.handleStyle(theme)} />
              {title && <Text style={styles.titleText(theme)}>History</Text>}
              {title && (
                <Divider
                  backgroundColor={theme.modal.divider.backgroundColor}
                  spacerColor={theme.onBackgroundColor}
                  style={{ width: "100%" }}
                  marginHorizontal={0}
                />
              )}
              {children}
            </Animated.View>
          </Animated.View>
        </PanGestureHandler>
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  handleStyle: (theme) => ({
    width: 40,
    height: 4,
    marginTop: 8,
    backgroundColor: theme.modal.handle.backgroundColor,
    borderRadius: "100%",
  }),
  modalContainerStyle: (theme) => ({
    // paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    backgroundColor: theme.modal.backgroundColor,
    alignItems: "center",
  }),
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
  titleText: (theme) => ({
    fontSize: 16,
    lineHeight: 18,
    alignSelf: "center",
    fontWeight: "600",
    paddingTop: 32,
    paddingBottom: 16,
    color: theme.fontColor,
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
