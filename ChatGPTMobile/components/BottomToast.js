import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Dimensions,
  Text,
  LayoutAnimation,
  UIManager,
  Platform,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { About, Alert, Close2 } from "../icons";
import { useKeyboardVisible } from "./../hooks/useKeyboardVisible";

export const BottomToast = ({
  theme,
  text = "An error has occured.",
}) => {
  const insets = useSafeAreaInsets();
  const [closeToast, setCloseToast] = useState(false);
  const [visible, setVisible] = useState(false);
  const { isKeyboardVisible, keyboardHeight } = useKeyboardVisible();
  const [h, setH] = useState(0);
  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setH(height);
  };
  if (
    Platform.OS === "android" &&
    UIManager.setLayoutAnimationEnabledExperimental
  ) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }

  useEffect(() => {
    setTimeout(() => {
      LayoutAnimation.configureNext({
        duration: 400,
        create: { type: "easeInEaseOut", property: "opacity" },
        update: { type: "spring", springDamping: 1 },
      });
      setVisible(true);
    }, 500);
    setTimeout(() => {
      LayoutAnimation.configureNext({
        duration: 400,
        create: { type: "easeInEaseOut", property: "opacity" },
        update: { type: "spring", springDamping: 1 },
      });
      setVisible(false);
    }, 5000);
  }, []);

  useEffect(() => {
    if (closeToast) {
      LayoutAnimation.configureNext({
        duration: 400,
        create: { type: "easeInEaseOut", property: "opacity" },
        update: { type: "spring", springDamping: 1 },
      });
      setVisible(false);
      setCloseToast(false);
    }
  }, [closeToast]);
  return (
    <View
      onLayout={onLayout}
      style={{
        position: "absolute",
        bottom: visible
          ? isKeyboardVisible
            ? 68 + keyboardHeight
            : insets.bottom + 68 + keyboardHeight
          : -h,
        width: "100%",
      }}
    >
      <View style={[styles.container(theme)]}>
        <Alert stroke={theme.iconColor} />
        <Text style={styles.text(theme)}>{text}</Text>
        <View style={{ marginLeft: "auto" }}>
          <TouchableOpacity
            onPress={() => {
              setCloseToast(true);
            }}
          >
            <Close2 stroke={theme.secondaryIconColor} width={20} height={20} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: (theme) => ({
    backgroundColor: theme.toast.backgroundColor,
    borderRadius: 16,
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: 16,
  }),
  text: (theme) => ({
    color: theme.fontColor,
    alignSelf: "center",
    paddingRight: 52,
    paddingLeft: 16,
  }),
});
