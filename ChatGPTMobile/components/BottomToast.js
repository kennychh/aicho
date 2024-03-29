import { useContext, useEffect, useRef, useState } from "react";
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
import { BlurView } from "expo-blur";
import { getTheme } from "../theme";
import { AppContext } from "../context";

export const BottomToast = ({ text = "An error has occured.", isEnabled }) => {
  const { theme } = useContext(AppContext);
  const insets = useSafeAreaInsets();
  const [closeToast, setCloseToast] = useState(false);
  const [visible, setVisible] = useState(false);
  const [closeAnimation, setCloseAnimation] = useState(false);
  const { isKeyboardVisible, keyboardHeight } = useKeyboardVisible();
  const toastUserClosed = useRef(false);
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
    if (isEnabled) {
      toastUserClosed.current = false;
      setTimeout(() => {
        LayoutAnimation.configureNext({
          duration: 400,
          create: { type: "easeInEaseOut", property: "opacity" },
          update: { type: "spring", springDamping: 1 },
        });
        setVisible(true);
      }, 600);
      setTimeout(() => {
        !toastUserClosed.current && setCloseAnimation(true);
      }, 5000);
    }
  }, [isEnabled]);

  useEffect(() => {
    if (closeAnimation) {
      LayoutAnimation.configureNext({
        duration: 400,
        create: { type: "easeInEaseOut", property: "opacity" },
        update: { type: "spring", springDamping: 1 },
      });
      setVisible(false);
      setCloseAnimation(false);
      setCloseToast(false);
    }
  }, [closeAnimation]);

  useEffect(() => {
    if (closeToast) {
      toastUserClosed.current = true;
      setCloseAnimation(true);
    }
  }, [closeToast]);
  return (
    isEnabled && (
      <View
        onLayout={onLayout}
        style={{
          position: "absolute",
          bottom: visible
            ? isKeyboardVisible
              ? 60 + keyboardHeight
              : insets.bottom + 60 + keyboardHeight
            : -h,
          opacity: h != 0 ? 1 : 0,
          width: "100%",
        }}
      >
        <BlurView
          style={[styles.container(theme)]}
          tint={theme === getTheme("dark") ? "dark" : "light"}
          intensity={100}
        >
          <Alert stroke={theme.iconColor} />
          <Text style={styles.text(theme)}>{text}</Text>
          <View style={{ marginLeft: "auto" }}>
            <TouchableOpacity
              onPress={() => {
                setCloseToast(true);
              }}
            >
              <Close2
                stroke={theme.secondaryIconColor}
                width={20}
                height={20}
              />
            </TouchableOpacity>
          </View>
        </BlurView>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: (theme) => ({
    backgroundColor: theme.toast.backgroundColor,
    borderRadius: 16,
    // justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: 16,
    marginHorizontal: 16,
    overflow: "hidden",
  }),
  text: (theme) => ({
    color: theme.fontColor,
    alignSelf: "center",
    paddingRight: 52,
    paddingLeft: 16,
    paddingVertical: 16,
  }),
});
