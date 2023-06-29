import Animated from "react-native-reanimated";
import { getTheme } from "../theme";
import { Text, View } from "react-native";
import { StyleSheet } from "react-native";
import { BlurView } from "expo-blur";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Close } from "../icons";
import * as Haptics from "expo-haptics";

export const HoldMenu = ({
  theme,
  holdMenuRef = null,
  numItems = 2,
  data,
  onPress,
}) => {
  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
  const defaultData = Array.from({ length: numItems }, () => ({}));
  return (
    <AnimatedBlurView
      ref={holdMenuRef}
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
        : data.map((data, index) => {
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
                      data.onPress();
                    }, 200);
                  }}
                >
                  <Text style={styles.text(theme)} numberOfLines={1}>
                    {data.title}
                  </Text>
                  <View style={styles.icon}>{data.icon}</View>
                </TouchableOpacity>
                {index == 0 && <View style={styles.border(theme)} />}
              </View>
            );
          })}
    </AnimatedBlurView>
  );
};

const styles = StyleSheet.create({
  blurView: (theme) => ({
    backgroundColor: theme.holdItem.menu.backgroundColor,
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    width: 232,
  }),
  text: (theme) => ({
    marginVertical: 12,
    color: theme.fontColor,
    fontSize: 16,
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
