import { Portal } from "@gorhom/portal";
import { BlurView } from "expo-blur";
import { nanoid } from "nanoid/non-secure";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, StyleSheet, Text } from "react-native";
import Animated, {
  measure,
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedProps,
  useAnimatedRef,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
  withSequence,
  withSpring,
  useAnimatedReaction,
  Easing,
  useDerivedValue,
  interpolateColor,
} from "react-native-reanimated";
import {
  TapGestureHandler,
  TapGestureHandlerGestureEvent,
} from "react-native-gesture-handler";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { HoldMenu } from "./HoldMenu";

const HoldItem = ({
  children,
  isActive,
  setIsActive,
  tint,
  isInput,
  isError,
  listRef,
  setSwipeEnabled,
  theme,
  holdMenuRef,
  holdMenuData,
  active,
  itemRectHeight,
  itemRectWidth,
  itemRectX,
  itemRectY,
  containerRef,
  menuWidth,
  menuHeight,
  menuRef,
  showPortal,
}) => {
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const insets = useSafeAreaInsets();

  const duration = 200;
  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
  const messageScale = useSharedValue(1);
  const progress = useDerivedValue(() => {
    return active.value ? withTiming(1, duration) : withTiming(0, duration);
  });
  const closeHoldItem = () => {
    active.value = false;
    setTimeout(() => {
      listRef?.current?.setNativeProps({ scrollEnabled: true });
      setSwipeEnabled(true);
    }, duration);
  };

  const animatedContainerProps = useAnimatedProps(() => {
    return {
      intensity: withTiming(active.value ? 50 : 0, {
        duration: duration,
      }),
    };
  });

  const onHoldMenuLayout = (width, height) => {
    if (width != menuWidth.value || height != menuHeight.value) {
      menuHeight.value = height;
      menuWidth.value = width;
    }
  };

  const calculateInitialMessageDelay = () => {
    "worklet";
    if (
      itemRectY.value != null &&
      itemRectY.value + itemRectHeight.value + menuHeight.value >
        windowHeight - insets.bottom
    ) {
      return 10;
    }
    return 30;
  };

  const animatedInitialMessageStyle = useAnimatedStyle(() => {
    let delay = calculateInitialMessageDelay();
    return {
      opacity: active.value
        ? withDelay(delay, withTiming(0, { duration: 10 }))
        : withDelay(duration, withTiming(1, { duration: 0 })),
    };
  });

  const calculateTransformValue = () => {
    "worklet";
    if (messageScale.value != 1) {
      const scaledItemRectHeight = itemRectHeight.value * messageScale.value;
      const heightDifference = itemRectHeight.value - scaledItemRectHeight;
      return -itemRectY.value - heightDifference / 2 + (insets.top + 16);
    } else if (itemRectY.value != null && itemRectY.value < insets.top + 16) {
      return -itemRectY.value + (insets.top + 16);
    } else if (
      itemRectY.value != null &&
      itemRectY.value + itemRectHeight.value + menuHeight.value >
        windowHeight - insets.bottom
    ) {
      return (
        -itemRectY.value -
        itemRectHeight.value -
        menuHeight.value +
        windowHeight -
        insets.bottom -
        24
      );
    }
    return 0;
  };

  const calculateTransformXValue = () => {
    "worklet";
    let tX = 0;
    if (isInput) {
      tX = 0;
    }
    if (messageScale.value != 1) {
      const scaledItemRectWidth =
        (itemRectWidth.value - 32) * messageScale.value;
      const widthDifference = itemRectWidth.value - scaledItemRectWidth;
      if (isInput) {
        return widthDifference / 2 + tX - 16;
      }
      return -widthDifference / 2 + tX + 16;
    }
    return tX;
  };

  const calculateTransformMenuXValue = () => {
    "worklet";
    let tX = 0;
    if (isInput) {
      tX = 0;
    }
    return tX;
  };

  const calculateScaleValue = () => {
    "worklet";
    let scale = 1;
    const messageMenuHeight = itemRectHeight.value;
    const availableHeight =
      windowHeight - (insets.top + 16) - menuHeight.value - insets.bottom - 24;
    if (messageMenuHeight > availableHeight) {
      scale = availableHeight / messageMenuHeight;
    }
    return scale;
  };

  const calculateTopValue = () => {
    "worklet";
    let top = 0;
    return top;
  };

  const animatedMessageStyle = useAnimatedStyle(() => {
    const animateOpacity = () =>
      withDelay(duration, withTiming(0, { duration: 0 }));
    let tY = calculateTransformValue();
    let tX = calculateTransformXValue();
    messageScale.value = calculateScaleValue();
    let top = calculateTopValue();
    const transformYAnimation = () =>
      active.value
        ? withSpring(tY, {
            damping: 33,
            mass: 1.03,
            stiffness: 400,
            restDisplacementThreshold: 0.0001,
            restSpeedThreshold: 0.0001,
          })
        : withSpring(0, {
            damping: 33,
            mass: 1.03,
            stiffness: 400,
            restDisplacementThreshold: 0.0001,
            restSpeedThreshold: 0.0001,
          });
    const transformXAnimation = () =>
      active.value
        ? withSpring(tX, {
            damping: 33,
            mass: 1.03,
            stiffness: 400,
            restDisplacementThreshold: 0.0001,
            restSpeedThreshold: 0.0001,
          })
        : withSpring(0, {
            damping: 33,
            mass: 1.03,
            stiffness: 400,
            restDisplacementThreshold: 0.0001,
            restSpeedThreshold: 0.0001,
          });
    return {
      ...(isInput
        ? itemRectX.value + itemRectWidth.value == windowWidth
          ? { right: 0 }
          : { right: windowWidth - (itemRectX.value + itemRectWidth.value) }
        : { left: 0 }),
      transform: [
        {
          translateY: active.value
            ? transformYAnimation()
            : withTiming(0, { duration: duration }),
        },
        {
          translateX: active.value
            ? transformXAnimation()
            : withTiming(0, { duration: duration }),
        },
        {
          scale: active.value
            ? withTiming(messageScale.value, { duration: duration })
            : withTiming(1, { duration: duration }),
        },
      ],
      top: active.value
        ? itemRectY.value
        : withDelay(duration, withTiming(windowHeight, { duration: 0 })),
    };
  });

  const calculateMenuTopValue = () => {
    "worklet";
    let scaledTopValue = 0;
    if (messageScale.value != 1) {
      const scaledItemRectHeight = itemRectHeight.value * messageScale.value;
      const heightDifference = itemRectHeight.value - scaledItemRectHeight;
      scaledTopValue =
        -itemRectHeight.value + scaledItemRectHeight + heightDifference / 2;
    }
    return (
      itemRectY.value +
      itemRectHeight.value +
      16 +
      calculateTransformValue() +
      scaledTopValue
    );
  };

  const animatedMenuStyle = useAnimatedStyle(() => {
    let tX = calculateTransformMenuXValue();
    let top = calculateMenuTopValue();
    const transformXAnimation = () =>
      active.value
        ? withSpring(tX, {
            damping: 33,
            mass: 1.03,
            stiffness: 400,
            restDisplacementThreshold: 0.0001,
            restSpeedThreshold: 0.0001,
          })
        : withSpring(0, {
            damping: 33,
            mass: 1.03,
            stiffness: 400,
            restDisplacementThreshold: 0.0001,
            restSpeedThreshold: 0.0001,
          });
    return {
      ...(isInput
        ? itemRectX.value + itemRectWidth.value == windowWidth
          ? { right: 16 }
          : isError
          ? {
              right: windowWidth - (itemRectX.value + itemRectWidth.value) + 8,
            }
          : { right: windowWidth - (itemRectX.value + itemRectWidth.value) + 16 }
        : { left: 16 }),
      top: messageScale.value != 1 ? (menuHeight.value > 0 ? top : 0) : top,
      opacity: active.value
        ? withTiming(1, { duration: duration })
        : withTiming(0, { duration: duration }),
      transform: [
        { translateX: transformXAnimation() },
        {
          scale: active.value
            ? withTiming(1, { duration: duration })
            : withTiming(0, { duration: duration }),
        },
      ],
    };
  });

  const messageContainerStyle = useMemo(
    () => [
      {
        position: "absolute",
        zIndex: 100,
      },
      animatedMessageStyle,
    ],
    [animatedMessageStyle]
  );

  const menuContainerStyle = [
    {
      position: "absolute",
      borderRadius: 16,
    },
    animatedMenuStyle,
  ];

  const initialMessageContainerStyle = useMemo(
    () => [
      isInput ? { marginLeft: "auto" } : { marginRight: "auto" },
      animatedInitialMessageStyle,
    ],
    [animatedInitialMessageStyle]
  );

  const animatedBlurViewStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ["transparent", theme.blurView.backgroundColor]
    );
    return {
      backgroundColor: backgroundColor,
      top: active.value
        ? 0
        : withDelay(duration, withTiming(windowHeight, { duration: 0 })),
    };
  });
  const blurViewStyle = useMemo(
    () => [styles.blurView, animatedBlurViewStyle],
    [animatedBlurViewStyle]
  );

  return (
    <>
      <Animated.View style={initialMessageContainerStyle} ref={containerRef}>
        {children}
      </Animated.View>
      <Portal>
        <TapGestureHandler
          onHandlerStateChange={() => {
            closeHoldItem();
            // setShowPortal(false);
          }}
        >
          <AnimatedBlurView
            tint={tint}
            style={blurViewStyle}
            animatedProps={animatedContainerProps}
          >
            <Animated.View style={messageContainerStyle}>
              {children}
            </Animated.View>
            <Animated.View style={menuContainerStyle}>
              <HoldMenu
                theme={theme}
                data={holdMenuData}
                onPress={closeHoldItem}
                onLayout={onHoldMenuLayout}
              />
            </Animated.View>
          </AnimatedBlurView>
        </TapGestureHandler>
      </Portal>
    </>
  );
};

export default memo(HoldItem);

const styles = StyleSheet.create({
  blurView: {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
    zIndex: 10,
  },
});
