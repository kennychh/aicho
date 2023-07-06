import {
  StyleSheet,
  View,
  Text,
  TouchableHighlight,
  Dimensions,
} from "react-native";
import Modal from "react-native-modal";
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Divider } from "./Divider";
import * as Haptics from "expo-haptics";
import { useMemo } from "react";

export const BottomModal = ({
  visible,
  onPress,
  theme,
  title,
  description = "This will delete all conversations from your device.",
  buttonText = "Delete",
}) => {
  const insets = useSafeAreaInsets();
  const DURATION = 200;
  const windowHeight = Dimensions.get("window").height;
  const containerHeight = useSharedValue(0);
  const progress = useDerivedValue(() => {
    return visible.value
      ? withTiming(1, { duration: DURATION })
      : withTiming(0, { duration: DURATION });
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

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      top: containerHeight.value != 0 ? containerHeight.value : 600,
      transform: [
        {
          translateY: visible.value
            ? withTiming(-containerHeight.value, { duration: DURATION })
            : withTiming(0, { duration: DURATION }),
        },
      ],
    };
  });

  const viewStyle = useMemo(
    () => [animatedViewStyle, styles.view(theme)],
    [animatedViewStyle]
  );

  const containerStyle = useMemo(
    () => [styles.container, animatedContainerStyle],
    [animatedContainerStyle]
  );
  return (
    <Animated.View style={viewStyle}>
      <Animated.View
        style={containerStyle}
        onLayout={(event) => {
          var { x, y, width, height } = event.nativeEvent.layout;
          if (height != 0) {
            containerHeight.value = height;
          }
        }}
      >
        <View style={styles.descriptionContainer(theme)}>
          <Text style={styles.description(theme)}>{description}</Text>
        </View>
        <View style={styles.dividerContainer(theme)}>
          <Divider backgroundColor={theme.modal.divider.backgroundColor} />
        </View>
        <TouchableHighlight
          style={styles.ctaButtonContainer(theme)}
          // activeOpacity={0.6}
          underlayColor={theme.highlight.color}
          onPressIn={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          onPress={() => {
            onPress();
            visible.value = false;
          }}
        >
          <Text style={[styles.text(theme), { color: theme.error.color }]}>
            {buttonText}
          </Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={[
            styles.cancelButtonContainer(theme),
            { marginBottom: insets.bottom + 8 },
          ]}
          // activeOpacity={0.6}
          underlayColor={theme.highlight.color}
          onPressIn={() => {
            Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
          }}
          onPress={() => {
            visible.value = false;
          }}
        >
          <Text style={styles.text(theme)}>Cancel</Text>
        </TouchableHighlight>
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
    zIndex: 200,
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
