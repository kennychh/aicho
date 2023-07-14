import { BlurView } from "expo-blur";
import { useCallback, useContext, useEffect, useMemo } from "react";
import { Dimensions, FlatList, StyleSheet, Text, View } from "react-native";
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
  useDerivedValue,
  interpolateColor,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Message } from "../icons";
import { getTheme } from "../theme";
import { PreviewMessage } from "./PreviewMessage";
import { HoldMenu } from "./HoldMenu";
import { AppContext } from "../context";
import { Divider } from "./Divider";

export const HoldPreview = ({
  translateX,
  translateY,
  showPreview,
  showHoldMenu,
  origin = { x: 0, y: 0, width: 0, height: 0 },
  title,
  data,
  holdMenuData,
  isFromModal,
}) => {
  const { theme, color } = useContext(AppContext);
  const windowWidth =
    Dimensions.get("window").width > 390 ? 390 : Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
  const insets = useSafeAreaInsets();
  const scale = useSharedValue(1);
  const activeHoldMenu = useSharedValue(false);

  const END_POSITION_X = 0;
  const END_POSITION_Y = 0;
  const DURATION = 200;
  const END_DURATION = 400;
  const MAX_HEIGHT = 480;
  const originX = origin.x - 12;
  const originY = origin.y - insets.top - 16;
  const progress = useDerivedValue(() => {
    return showPreview.value
      ? withTiming(1, { duration: DURATION })
      : withTiming(0, { duration: DURATION });
  });

  const renderItem = ({ item, index }) => (
    <PreviewMessage item={item} color={color} theme={theme} />
  );

  const panGesture = useAnimatedGestureHandler(
    {
      onActive: (e) => {
        translateX.value =
          END_POSITION_X + e.translationX - e.translationX / 1.08;
        translateY.value =
          END_POSITION_Y +
          e.translationY -
          (e.translationY < 0 ? e.translationY / 1.08 : 0);
        const scaleValue =
          e.translationY < 0
            ? 1 -
              (0.1 * Math.abs(e.translationY)) /
                (windowHeight - insets.top - 24 - MAX_HEIGHT / 2)
            : 1 -
              (0.5 * Math.abs(e.translationY)) /
                (windowHeight - insets.top - 24 - MAX_HEIGHT / 2);
        if (scaleValue >= 0.7) {
          scale.value = scaleValue;
        }
        if (e.translationY > 50) {
          showHoldMenu.value = false;
          activeHoldMenu.value = false;
        } else if (e.translationY < 0) {
          activeHoldMenu.value = true;
        } else {
          showHoldMenu.value = true;
          activeHoldMenu.value = withDelay(DURATION, withTiming(true, 0));
        }
      },
      onEnd: (e) => {
        let end_x = END_POSITION_X;
        let end_y = END_POSITION_Y;
        if (e.translationY > 200) {
          isFromModal.value = false;
          showPreview.value = false;
          end_y = originY;
          end_x = originX;
        } else {
          showHoldMenu.value = true;
        }
        translateX.value = withTiming(0, END_DURATION);
        translateY.value = withTiming(0, END_DURATION);
        scale.value = withTiming(1, END_DURATION);
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
      ],
      maxHeight: showPreview.value
        ? withTiming(MAX_HEIGHT, { duration: DURATION - 100 })
        : withTiming(origin.height, { duration: END_DURATION }),
      maxWidth: showPreview.value
        ? withTiming(windowWidth, { duration: DURATION })
        : withTiming(origin.width, { duration: END_DURATION }),
    };
  });

  const flatListAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: showPreview.value
        ? withTiming(1, { duration: DURATION })
        : withTiming(0, { duration: DURATION }),
      // transform: [
      //   {
      //     scale: showPreview.value
      //       ? withTiming(1, { duration: DURATION })
      //       : withTiming(0, { duration: END_DURATION }),
      //   },
      // ],
    };
  });

  const itemStyle = useMemo(
    () => [
      {
        maxWidth: windowWidth,
        // position: "absolute",
        // minHeight: 400,
        backgroundColor: theme.backgroundColor,
        borderBottomLeftRadius: 16,
        borderBottomRightRadius: 16,
        flex: 1,
        overflow: "hidden",
        // paddingBottom: 16,
      },
      animatedStyle,
    ],
    [animatedStyle]
  );

  const flatlistStyle = useMemo(
    () => [{ flex: 1, height: "100%" }, flatListAnimatedStyle],
    [flatListAnimatedStyle]
  );

  const animatedBlurViewStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      [
        "transparent",
        isFromModal.value
          ? theme.bottomModal.backgroundColor
          : theme.blurView.backgroundColor,
      ]
    );
    return {
      backgroundColor: backgroundColor,
      top: showPreview.value
        ? 0
        : withDelay(END_DURATION, withTiming(windowHeight, { duration: 0 })),
      intensity: withTiming(showPreview.value ? 50 : 0, {
        duration: DURATION,
      }),
    };
  });

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: showPreview.value
            ? withSpring(-originX, {
                damping: 40,
                stiffness: 400,
                mass: 0.8,
              })
            : withTiming(0, { duration: END_DURATION }),
        },
        {
          translateY: showPreview.value
            ? withSpring(-originY, {
                damping: 50,
                stiffness: 600,
                mass: 0.8,
              })
            : withTiming(0, { duration: DURATION }),
        },
        { scale: scale.value },
      ],
      maxWidth: showPreview.value
        ? withTiming(windowWidth, { duration: DURATION })
        : withTiming(origin.width, { duration: END_DURATION }),
    };
  });

  const containerStyle = useMemo(
    () => [
      {
        marginHorizontal: 16,
        left: originX,
        top: originY,
        maxHeight: MAX_HEIGHT + 50,
        flex: 1,
        zIndex: 1,
      },
      animatedContainerStyle,
    ],
    [animatedContainerStyle]
  );

  const animatedTitleBarStyle = useAnimatedStyle(() => {
    return {
      opacity: showPreview.value
        ? withTiming(1, { duration: DURATION - 150 })
        : withTiming(0, { duration: END_DURATION }),
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const tileBarStyle = useMemo(
    () => [styles.titleBar(theme), animatedTitleBarStyle],
    [animatedTitleBarStyle]
  );

  const animatedHoldMenuStyle = useAnimatedStyle(() => {
    return {
      opacity: showHoldMenu.value
        ? withTiming(1, { duration: DURATION })
        : withTiming(0, { duration: END_DURATION - 100 }),
      marginLeft: isFromModal.value ? "auto" : 16,
      alignSelf: isFromModal.value ? "center" : "flex-start",
      transform: [
        {
          translateY: translateY.value,
        },
        {
          scale: showHoldMenu.value
            ? withTiming(1, { duration: DURATION })
            : withTiming(0, { duration: END_DURATION - 100 }),
        },
      ],
    };
  });

  const holdMenuStyle = useMemo(
    () => [styles.holdMenu, animatedHoldMenuStyle],
    [animatedHoldMenuStyle]
  );

  const animatedHoldMenuContainerStyle = useAnimatedStyle(() => {
    return {
      // transform: [
      //   {
      //     scale: showHoldMenu.value ? withTiming(1, { duration: DURATION }) : 1,
      //   },
      // ],
    };
  });

  const holdMenuContainerStyle = useMemo(
    () => [animatedHoldMenuContainerStyle],
    [animatedHoldMenuContainerStyle]
  );
  const blurViewStyle = useMemo(
    () => [
      {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        paddingTop: insets.top + 16,
        zIndex: 100,
      },
      animatedBlurViewStyle,
    ],
    [animatedBlurViewStyle]
  );

  return (
    <PanGestureHandler onGestureEvent={panGesture}>
      <AnimatedBlurView
        intensity={0}
        tint={theme === getTheme("dark") ? "dark" : "light"}
        style={blurViewStyle}
      >
        <Animated.View style={containerStyle}>
          <Animated.View style={tileBarStyle}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 16,
              }}
            >
              <Message style={{ marginRight: 8 }} stroke={theme.iconColor} />
              <Text
                style={styles.title(theme)}
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {title}
              </Text>
            </View>
            <Divider
              backgroundColor={theme.onBackgroundColor}
              spacerColor={theme.modal.divider.backgroundColor}
              marginHorizontal={0}
            />
          </Animated.View>

          <Animated.View style={itemStyle}>
            <Animated.View
              style={{
                position: "absolute",
                backgroundColor: theme.backgroundColor,
                width: "100%",
                height: "100%",
              }}
            />
            <Animated.View style={flatlistStyle}>
              <Animated.FlatList
                inverted
                data={data}
                scrollEnabled={false}
                indicatorStyle={theme == getTheme("dark") ? "white" : "black"}
                style={styles.flatList(theme)}
                renderItem={renderItem}
                contentContainerStyle={{
                  flexGrow: 1,
                }}
              />
            </Animated.View>
          </Animated.View>
        </Animated.View>
        <Animated.View style={holdMenuContainerStyle}>
          <Animated.View style={holdMenuStyle}>
            <HoldMenu
              theme={theme}
              onPress={() => {
                showPreview.value = false;
                showHoldMenu.value = false;
                isFromModal.value = false;
              }}
              data={holdMenuData}
              duration={END_DURATION}
            />
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
    // paddingHorizontal: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  }),
  title: (theme) => ({
    color: theme.fontColor,
    paddingVertical: 16,
    fontSize: 16,
    lineHeight: 18,
    // marginRigt: 16,
    flex: 1,
  }),
  flatList: (theme) => ({
    // paddingRight: 16,
    backgroundColor: theme.backgroundColor,
    // maxHeight: 400,
  }),
  holdMenu: {
    marginTop: 16,
    marginRight: "auto",
    zIndex: 0,
  },
});
