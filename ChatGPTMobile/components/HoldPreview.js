import { BlurView } from "expo-blur";
import { useCallback, useEffect, useMemo } from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  PanGestureHandler,
} from "react-native-gesture-handler";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDecay,
  withDelay,
  withSpring,
  withTiming,
  runOnJS,
  interpolate,
  Extrapolation,
  useAnimatedGestureHandler,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Message } from "../icons";

export const HoldPreview = ({
  translateX,
  translateY,
  showPreview,
  origin = { x: 0, y: 0, width: 0, height: 0 },
  title,
  theme,
}) => {
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
  const insets = useSafeAreaInsets();

  const END_POSITION_X = 0;
  const END_POSITION_Y = 0;
  const DURATION = 200;
  const END_DURATION = 400;
  const originX = origin.x - 16;
  const originY = origin.y - insets.top - 24;

  const panGesture = useAnimatedGestureHandler(
    {
      onActive: (e) => {
        translateX.value =
          END_POSITION_X + e.translationX - e.translationX / 1.08;
        translateY.value =
          END_POSITION_Y +
          e.translationY -
          (e.translationY < 0 ? e.translationY / 1.08 : e.translationY / 3.5);
      },
      onEnd: (e) => {
        let end_x = END_POSITION_X;
        let end_y = END_POSITION_Y;
        if (e.translationY > 200) {
          showPreview.value = false;
          end_y = originY;
          end_x = originX;
        }
        translateX.value = withSpring(0, {
          damping: 30,
          stiffness: 400,
          restDisplacementThreshold: 0.0001,
          restSpeedThreshold: 0.0001,
        });
        translateY.value = withSpring(0, {
          damping: 30,
          stiffness: 400,
          restDisplacementThreshold: 0.0001,
          restSpeedThreshold: 0.0001,
        });
      },
    },
    [translateX, translateY]
  );

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: showPreview.value
        ? withTiming(1, { duration: DURATION - 100 })
        : withTiming(0, { duration: END_DURATION }),
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
        // {
        //   scale: showPreview.value
        //     ? withTiming(1, { duration: DURATION })
        //     : withTiming(0, { duration: END_DURATION }),
        // },
      ],
      maxHeight: showPreview.value
        ? withTiming(460, { duration: DURATION })
        : withTiming(origin.height, { duration: END_DURATION }),
      maxWidth: showPreview.value
        ? withTiming(windowWidth, { duration: DURATION })
        : withTiming(origin.width, { duration: END_DURATION }),
    };
  });

  const itemStyle = useMemo(
    () => [
      {
        maxWidth: origin.width,
        // position: "absolute",
        // minHeight: 400,
        maxHeight: origin.height,
        backgroundColor: theme.backgroundColor,
        borderRadius: 16,
        flex: 1,
        overflow: "hidden",
      },
      animatedStyle,
    ],
    [animatedStyle]
  );

  const animatedBlurViewStyle = useAnimatedStyle(() => ({
    top: showPreview.value
      ? 0
      : withDelay(END_DURATION, withTiming(windowHeight, { duration: 0 })),
    intensity: withTiming(showPreview.value ? 50 : 0, {
      duration: DURATION,
    }),
  }));

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: showPreview.value
            ? withSpring(-originX, {
                damping: 20,
                stiffness: 200,
                mass: 0.8,
              })
            : withTiming(0, { duration: END_DURATION }),
        },
        {
          translateY: showPreview.value
            ? withSpring(-originY, {
                damping: 20,
                stiffness: 200,
                mass: 0.8,
              })
            : withTiming(0, { duration: END_DURATION }),
        },
      ],
    };
  });

  const containerStyle = useMemo(
    () => [
      {
        marginHorizontal: 16,
        left: originX,
        top: originY,
        flex: 1,
      },
      animatedContainerStyle,
    ],
    [animatedContainerStyle]
  );

  return (
    <PanGestureHandler onGestureEvent={panGesture}>
      <AnimatedBlurView
        intensity={0}
        style={[
          {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            paddingTop: insets.top + 24,
          },
          animatedBlurViewStyle,
        ]}
      >
        <Animated.View style={containerStyle}>
          <Animated.View style={itemStyle}>
            <View style={styles.titleBar(theme)}>
              <Message style={{ marginRight: 8 }} stroke={theme.iconColor} />
              <Text
                style={styles.title(theme)}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {title}
              </Text>
            </View>
          </Animated.View>
        </Animated.View>
      </AnimatedBlurView>
    </PanGestureHandler>
  );
};

const styles = StyleSheet.create({
  box: (theme) => ({
    width: "100%",
    // position: "absolute",
    // minHeight: 400,
    height: 460,
    backgroundColor: theme.backgroundColor,
  }),
  titleBar: (theme) => ({
    width: "100%",
    backgroundColor: theme.onBackgroundColor,
    flexDirection: "row",
    paddingHorizontal: 16,
    alignItems: "center",
  }),
  title: (theme) => ({
    color: theme.fontColor,
    paddingVertical: 16,
    fontSize: 16,
  }),
});
