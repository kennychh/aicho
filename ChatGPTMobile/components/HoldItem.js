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

const HoldItem = ({
  children,
  isActive,
  setIsActive,
  tint,
  isInput,
  listRef,
  swipeEnabled,
  theme,
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
  const [menuWidth, menuHeight] = [200, 108];
  const active = useSharedValue(false);
  const duration = 200;
  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

  const getMeasurements = useCallback(() => {
    if (isActive) {
      active.value = true;
      containerRef.current?.measure((x, y, width, height, pageX, pageY) => {
        console.log(x, y, width, pageX);
        if (itemRectY != pageY || !showPortal) {
          setItemRectX(pageX);
          setItemRectHeight(height);
          setItemRectWidth(width);
          setItemRectY(pageY);
          setShowPortal(true);
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

  const animatedInitialMessageStyle = useAnimatedStyle(() => {
    return {
      opacity: active.value
        ? withDelay(50, withTiming(0, { duration: 50 }))
        : withDelay(duration, withTiming(1, { duration: 0 })),
    };
  });

  const calculateTransformValue = () => {
    "worklet";
    if (itemRectY != null && itemRectY < insets.top) {
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
        24
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
    return tX;
  };

  const animatedMessageStyle = useAnimatedStyle(() => {
    const animateOpacity = () =>
      withDelay(duration, withTiming(0, { duration: 0 }));
    let tY = calculateTransformValue();
    let tX = calculateTransformXValue();
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
      ],
    };
  });

  const animatedMenuStyle = useAnimatedStyle(() => {
    let tX = calculateTransformXValue();
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
      shadowRadius: 24,
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
        top: itemRectY,
        // width: itemRectWidth,
        // height: itemRectHeight,
      },
      isInput
        ? itemRectWidth != windowWidth
          ? { right: itemRectX + windowWidth - itemRectWidth }
          : { right: itemRectX }
        : { left: itemRectX },
      animatedMessageStyle,
    ],
    [animatedMessageStyle]
  );

  const menuContainerStyle = useMemo(
    () => [
      {
        position: "absolute",
        zIndex: 101,
        top: itemRectY + itemRectHeight + 8 + calculateTransformValue(),
        width: menuWidth,
        height: menuHeight,
        borderRadius: 16,
        // overflow: "hidden",
      },
      isInput ? { right: 8 } : { left: 8 },
      animatedMenuStyle,
    ],
    [animatedMenuStyle]
  );

  const initialMessageContainerStyle = useMemo(
    () => [{ flex: 1 }, animatedInitialMessageStyle],
    [animatedInitialMessageStyle]
  );

  return (
    <>
      {active.value ? (
        <Portal>
          <TapGestureHandler
            onHandlerStateChange={() => {
              if (isActive) {
                active.value = false;
                swipeEnabled.current = true;
                setTimeout(() => {
                  setIsActive(false);
                  listRef?.current?.setNativeProps({ scrollEnabled: true });
                }, duration);
              }
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
            <AnimatedBlurView
              style={{
                backgroundColor: theme.holdItem.menu.backgroundColor,
                flex: 1,
                borderRadius: 16,
                overflow: "hidden",
              }}
              tint={tint}
              intensity={80}
            >
              <Text style={{ color: "white" }}>Test</Text>
            </AnimatedBlurView>
          </Animated.View>
        </Portal>
      ) : null}
      <Animated.View ref={containerRef} style={initialMessageContainerStyle}>
        {children}
      </Animated.View>
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
