import { Portal } from "@gorhom/portal";
import { BlurView } from "expo-blur";
import { nanoid } from "nanoid/non-secure";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
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

const HoldItem = ({ children, isActive, setIsActive, tint }) => {
  const windowHeight = Dimensions.get("window").height;
  const insets = useSafeAreaInsets();
  const containerRef = useAnimatedRef();
  const [itemRectY, setItemRectY] = useState(null);
  const [itemRectX, setItemRectX] = useState(null);
  const [itemRectWidth, setItemRectWidth] = useState(null);
  const [itemRectHeight, setItemRectHeight] = useState(null);
  const [showPortal, setShowPortal] = useState(false);
  const active = useSharedValue(false);
  const duration = 200;
  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);

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
        ? withTiming(0, { duration: 50 })
        : withDelay(duration, withTiming(1, { duration: 0 })),
    };
  });

  const calculateTransformValue = () => {
    "worklet";
    if (itemRectY != null && itemRectY < insets.top) {
      return -itemRectY + insets.top;
    } else if (
      itemRectY != null &&
      itemRectY + itemRectHeight > windowHeight - insets.bottom
    ) {
      return -itemRectY - itemRectHeight + windowHeight - insets.bottom;
    }
    return 0;
  };

  const animatedMessageStyle = useAnimatedStyle(() => {
    const animateOpacity = () =>
      withDelay(duration, withTiming(0, { duration: 0 }));
    let ty = calculateTransformValue();
    const transformAnimation = () =>
      active.value
        ? withSpring(ty, {
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
          translateY: transformAnimation(),
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
        left: itemRectX,
        width: itemRectWidth,
        height: itemRectHeight,
      },
      animatedMessageStyle,
    ],
    [animatedMessageStyle]
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
                setTimeout(() => {
                  setIsActive(false);
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
