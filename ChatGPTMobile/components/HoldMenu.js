import Animated from "react-native-reanimated";
import { getTheme } from "../theme";
import { Text } from "react-native";
import { StyleSheet } from "react-native";
import { BlurView } from "expo-blur";

export const HoldMenu = ({ theme, holdMenuRef = null }) => {
  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
  return (
    <AnimatedBlurView
      ref={holdMenuRef}
      style={styles.blurView(theme)}
      tint={theme === getTheme("dark") ? "dark" : "light"}
      intensity={80}
    >
      <Text style={{ color: "white" }}>Test</Text>
    </AnimatedBlurView>
  );
};

const styles = StyleSheet.create({
  blurView: (theme) => ({
    backgroundColor: theme.holdItem.menu.backgroundColor,
    flex: 1,
    borderRadius: 16,
    overflow: "hidden",
    height: 208,
    width: 200,
  }),
});
