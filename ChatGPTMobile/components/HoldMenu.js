import Animated from "react-native-reanimated";
import { getTheme } from "../theme";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { Close } from "../icons";
import * as Haptics from "expo-haptics";
import { TouchableOpacity } from "react-native";

export const HoldMenu = ({
  theme,
  holdMenuRef = null,
  onLayout,
  numItems = 2,
  data,
  onPress,
  duration = 200,
}) => {
  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
  const defaultData = Array.from({ length: numItems }, () => ({}));
  return (
    <AnimatedBlurView
      ref={holdMenuRef}
      onLayout={(e) => {
        const { width, height } = e.nativeEvent.layout;
        onLayout && onLayout(width, height);
      }}
      style={styles.blurView(theme)}
      tint={theme === getTheme("dark") ? "dark" : "light"}
      intensity={80}
    >
      {!data
        ? defaultData.map((data, index) => {
            return (
              <View>
                <TouchableOpacity style={styles.menuItemContainer}>
                  <Text style={styles.text(theme)} numberOfLines={1}>
                    Test
                  </Text>
                  <View style={styles.icon}>
                    <Close width={20} height={20} />
                  </View>
                </TouchableOpacity>
                {index == 0 && <View style={styles.border(theme)} />}
              </View>
            );
          })
        : data.map((item, index) => {
            return (
              <View>
                <TouchableOpacity
                  style={styles.menuItemContainer}
                  onPressIn={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  onPress={() => {
                    onPress();
                    setTimeout(() => {
                      item.onPress();
                    }, duration);
                  }}
                >
                  <Text
                    style={[
                      styles.text(theme),
                      item.isDestructive ? { color: "#FF0000" } : {},
                    ]}
                    numberOfLines={1}
                  >
                    {item.title}
                  </Text>
                  <View style={styles.icon}>{item.icon}</View>
                </TouchableOpacity>
                {index != data.length - 1 && (
                  <View>
                    <View style={styles.border(theme)} />
                    <View
                      style={[
                        styles.border(theme),
                        { backgroundColor: "transparent" },
                      ]}
                    />
                  </View>
                )}
              </View>
            );
          })}
    </AnimatedBlurView>
  );
};

const styles = StyleSheet.create({
  blurView: (theme) => ({
    backgroundColor: theme.holdItem.menu.backgroundColor,
    // flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    width: 232,
  }),
  text: (theme) => ({
    marginVertical: 12,
    color: theme.fontColor,
    fontSize: 16,
    lineHeight: 18,
    maxWidth: 148,
  }),
  menuItemContainer: {
    paddingHorizontal: 16,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    paddingLeft: 16,
  },
  border: (theme) => ({
    backgroundColor: theme.holdItem.menu.borderColor,
    height: 0.5,
  }),
});
