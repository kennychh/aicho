import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  Keyboard,
  Animated,
  TouchableOpacity,
} from "react-native";
import { More, Menu, ArrowLeft, CircleIconTransparent } from "../icons";
import { HeaderButton } from "./HeaderButton";
import { getTheme } from "../theme";
import { BlurView } from "expo-blur";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useEffect, useState } from "react";
export const Header = ({
  onOpen,
  modalizeRef,
  navigation,
  headerTitle,
  textInputRef,
  setChatDetails,
  chatIndex,
  isHeaderEditable,
  setIsHeaderEditable,
  theme,
  isSettingsHeader = false,
  color,
  yOffset,
  setHeight,
}) => {
  const AnimatedBlurView = Animated.createAnimatedComponent(BlurView);
  const insets = useSafeAreaInsets();
  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setHeight && setHeight(height);
  };
  const intensity = yOffset
    ? yOffset.interpolate({
        inputRange: [0, 16],
        outputRange: [1, 100],
      })
    : 100;
  const chatGptTitle = (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      {isHeaderEditable ? (
        <TextInput
          ref={textInputRef}
          keyboardAppearance={theme === getTheme("dark") ? "dark" : "light"}
          style={[styles.barText(theme), { flex: 1, marginRight: 22 }]}
          numberOfLines={1}
          ellipsizeMode="tail"
          value={headerTitle}
          editable={isHeaderEditable}
          returnKeyType={"done"}
          onChangeText={(s) => {
            setChatDetails((oldChatTitles) => [
              ...oldChatTitles.slice(0, chatIndex),
              [s, oldChatTitles[chatIndex][1]],
              ...oldChatTitles.slice(chatIndex + 1),
            ]);
          }}
          onSubmitEditing={() => {
            setIsHeaderEditable(false);
          }}
        />
      ) : (
        <Text
          style={[styles.barText(theme), { flex: 1, marginRight: 22 }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {headerTitle}
        </Text>
      )}
    </View>
  );

  const settingsTitle = (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: 30,
      }}
    >
      <Text style={[styles.barText(theme), { fontWeight: "600" }]}>
        {headerTitle}
      </Text>
    </View>
  );
  return yOffset ? (
    <AnimatedBlurView
      onLayout={onLayout}
      style={[styles.bar(theme), { paddingTop: insets.top + 16 }]}
      tint={theme === getTheme("dark") ? "dark" : "light"}
      intensity={intensity}
    >
      {isSettingsHeader ? (
        <HeaderButton
          icon={<ArrowLeft stroke={theme.iconColor} />}
          onPress={() => navigation.goBack()}
        />
      ) : (
        <HeaderButton
          icon={<Menu stroke={theme.iconColor} />}
          onPress={() => navigation.openDrawer()}
        />
      )}
      {isSettingsHeader ? settingsTitle : chatGptTitle}
      {!isSettingsHeader ? (
        <HeaderButton
          icon={<More stroke={theme.iconColor} />}
          onPress={() => {
            Keyboard.dismiss();
            onOpen(modalizeRef);
          }}
        />
      ) : (
        <More stroke={"transparent"} />
      )}
    </AnimatedBlurView>
  ) : (
    <BlurView
      onLayout={onLayout}
      style={[styles.bar(theme), { paddingTop: insets.top + 16 }]}
      tint={theme === getTheme("dark") ? "dark" : "light"}
      intensity={intensity}
    >
      {/* <HeaderButton
        icon={<Menu stroke={theme.iconColor} />}
        onPress={() => navigation.openDrawer()}
      /> */}
      <TouchableOpacity
        style={[styles.icon, { backgroundColor: color }]}
        onPress={() => navigation.openDrawer()}
      >
        <CircleIconTransparent width={30} height={30} />
      </TouchableOpacity>
      {chatGptTitle}
      <HeaderButton
        icon={<More stroke={theme.iconColor} />}
        onPress={() => {
          Keyboard.dismiss();
          onOpen(modalizeRef);
        }}
      />
    </BlurView>
  );
};

const styles = StyleSheet.create({
  barText: (theme) => ({
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "500",
    color: theme.fontColor,
    textAlign: "center",
  }),
  icon: {
    width: 30,
    height: 30,
    borderRadius: "50%",
    alignSelf: "center",
    // marginLeft: 16,
    marginRight: 16,
  },
  bar: (theme) => ({
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    borderBottomColor: theme.divider.color,
    borderBottomWidth: 0.5,
    alignContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    zIndex: 1,
    overflow: "visible",
    position: "absolute",
  }),
});
