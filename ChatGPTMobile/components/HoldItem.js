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
  listRef,
  swipeEnabled,
  theme,
  holdMenuRef,
  holdMenuData,
}) => {
  const windowHeight = Dimensions.get("window").height;
  const windowWidth = Dimensions.get("window").width;
  const insets = useSafeAreaInsets();
  const containerRef = useAnimatedRef();
  const menuRef = useAnimatedRef();
  const [itemRectY, setItemRectY] = useState(null);
  const [itemRectX, setItemRectX] = useState(null);
  const [itemRectWidth, setItemRectWidth] = useState(null);
  const [itemRectHeight, setItemRectHeight] = useState(null);
  const [showPortal, setShowPortal] = useState(false);
  const [menuWidth, setMenuWidth] = useState(0);
  const [menuHeight, setMenuHeight] = useState(0);
  const active = useSharedValue(false);
  const duration = 200;
  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
  const messageScale = useSharedValue(0);
  const closeHoldItem = () => {
    if (isActive) {
      active.value = false;
      swipeEnabled.current = true;
      setTimeout(() => {
        setIsActive(false);
        listRef?.current?.setNativeProps({ scrollEnabled: true });
      }, duration);
    }
  };
  const getMeasurements = useCallback(() => {
    if (isActive) {
      active.value = true;
      containerRef.current?.measure((x, y, width, height, pageX, pageY) => {
        if (itemRectY != pageY || !showPortal) {
          setItemRectX(pageX);
          setItemRectHeight(height);
          setItemRectWidth(width);
          setItemRectY(pageY);
          setShowPortal(true);
        }
      });
      holdMenuRef?.current?.measure((x, y, width, height, pageX, pageY) => {
        if (width != 0 || height != 0) {
          setMenuHeight(height);
          setMenuWidth(width);
        }
      });
    }
  }, [
    containerRef,
    active,
    isActive,
    itemRectY,
    itemRectX,
    itemRectWidth,
    itemRectHeight,
    showPortal,
    menuWidth,
    menuHeight,
  ]);
  const isActiveFunction = useCallback(() => {
    if (isActive) {
      getMeasurements();
    } else {
      setShowPortal(false);
    }
  }, [isActive]);

  useEffect(() => {
    isActiveFunction();
  }, [isActiveFunction]);

  const animatedContainerProps = useAnimatedProps(() => {
    return {
      intensity: withTiming(active.value ? 50 : 0, {
        duration: duration,
      }),
    };
  });

  const calculateInitialMessageDelay = () => {
    "worklet";
    if (
      itemRectY != null &&
      itemRectY + itemRectHeight + menuHeight > windowHeight - insets.bottom
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
      const scaledItemRectHeight = itemRectHeight * messageScale.value;
      const heightDifference = itemRectHeight - scaledItemRectHeight;
      return -itemRectY - heightDifference / 2 + insets.top;
    } else if (itemRectY != null && itemRectY < insets.top) {
      return -itemRectY + insets.top;
    } else if (
      itemRectY != null &&
      itemRectY + itemRectHeight + menuHeight > windowHeight - insets.bottom
    ) {
      return (
        -itemRectY -
        itemRectHeight -
        menuHeight +
        windowHeight -
        insets.bottom -
        16
      );
    }
    return 0;
  };

  const calculateTransformXValue = () => {
    "worklet";
    let tX = 2;
    if (isInput) {
      tX = -2;
    }
    if (messageScale.value != 1) {
      const scaledItemRectWidth = (itemRectWidth - 16) * messageScale.value;
      const widthDifference = itemRectWidth - scaledItemRectWidth;
      if (isInput) {
        return widthDifference / 2 - 8 + tX;
      }
      return -widthDifference / 2 + 8 + tX;
    }
    return tX;
  };

  const calculateTransformMenuXValue = () => {
    "worklet";
    let tX = 2;
    if (isInput) {
      tX = -2;
    }
    return tX;
  };

  const calculateScaleValue = () => {
    "worklet";
    let scale = 1;
    const messageMenuHeight = itemRectHeight;
    const availableHeight =
      windowHeight - insets.top - menuHeight - insets.bottom - 16;
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
      transform: [
        {
          translateY: transformYAnimation(),
        },
        { translateX: transformXAnimation() },
        {
          scale: active.value
            ? withTiming(messageScale.value, { duration: duration })
            : withTiming(1, { duration: duration }),
        },
      ],
    };
  });

  const animatedMenuStyle = useAnimatedStyle(() => {
    let tX = calculateTransformMenuXValue();
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
      shadowColor: "#000",
      shadowOpacity: 0.2,
      shadowRadius: 32,
      shadowOffset: {
        height: 2,
      },
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
      messageScale.value != 1 ? { top: itemRectY } : { top: itemRectY },
      isInput ? { right: 0 } : { left: 0 },
      animatedMessageStyle,
    ],
    [animatedMessageStyle]
  );

  const menuContainerStyle = useMemo(
    () => [
      {
        position: "absolute",
        zIndex: 101,
        width: menuWidth,
        height: menuHeight,
        borderRadius: 16,
        // overflow: "hidden",
      },
      isInput ? { right: 8 } : { left: 8 },
      calculateScaleValue() != 1
        ? { bottom: insets.bottom + 8 }
        : { top: itemRectY + itemRectHeight + 8 + calculateTransformValue() },
      animatedMenuStyle,
    ],
    [animatedMenuStyle]
  );

  const initialMessageContainerStyle = useMemo(
    () => [
      isInput ? { marginLeft: "auto" } : { marginRight: "auto" },
      animatedInitialMessageStyle,
    ],
    [animatedInitialMessageStyle]
  );

  return (
    <>
      <Animated.View ref={containerRef} style={initialMessageContainerStyle}>
        {children}
      </Animated.View>
      {active.value ? (
        <Portal>
          <TapGestureHandler
            onHandlerStateChange={() => {
              closeHoldItem();
              // setShowPortal(false);
            }}
          >
            <AnimatedBlurView
              tint={tint}
              style={styles.blurView}
              animatedProps={animatedContainerProps}
            />
          </TapGestureHandler>
          <Animated.View style={messageContainerStyle}>
            {children}
          </Animated.View>
          <Animated.View style={menuContainerStyle}>
            <HoldMenu
              theme={theme}
              data={holdMenuData}
              onPress={closeHoldItem}
            />
          </Animated.View>
        </Portal>
      ) : null}
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
