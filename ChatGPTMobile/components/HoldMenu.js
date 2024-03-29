import Animated from "react-native-reanimated";
import { getTheme } from "../theme";
import { Text, TouchableHighlight, View } from "react-native";
import { StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { Close } from "../icons";
import * as Haptics from "expo-haptics";
import { TouchableOpacity } from "react-native";
import { Divider } from "./Divider";

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
        if (onLayout && width != 0 && height != 0) {
          onLayout(width, height);
        }
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
                <TouchableHighlight
                  underlayColor={theme.highlight.color}
                  onPressIn={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                  }}
                  onPress={() => {
                    onPress();
                    if (item.title == "Delete") {
                      item.onPress();
                    } else {
                      setTimeout(() => {
                        item.onPress();
                      }, duration);
                    }
                  }}
                >
                  <View style={styles.menuItemContainer}>
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
                  </View>
                </TouchableHighlight>
                {index != data.length - 1 && (
                  <Divider
                    backgroundColor={theme.holdItem.menu.borderColor}
                    marginHorizontal={0}
                    spacerColor={theme.holdItem.menu.backgroundColor}
                  />
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
