import {
  StyleSheet,
  TextInput,
  Text,
  View,
  Image,
  Keyboard,
  Animated,
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
  setChatTitles,
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
        outputRange: [1, 80],
      })
    : 80;
  const chatGptTitle = (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        flexDirection: "row",
      }}
    >
      <View style={[styles.icon, { backgroundColor: color }]}>
        <CircleIconTransparent width={32} height={32} />
      </View>

      <TextInput
        ref={textInputRef}
        keyboardAppearance={theme === getTheme("dark") ? "dark" : "light"}
        style={styles.barText(theme)}
        numberOfLines={1}
        ellipsizeMode="tail"
        value={headerTitle}
        editable={isHeaderEditable}
        returnKeyType={"done"}
        maxLength={25}
        onChangeText={(s) => {
          setChatTitles((oldChatTitles) => [
            ...oldChatTitles.slice(0, chatIndex),
            s,
            ...oldChatTitles.slice(chatIndex + 1),
          ]);
        }}
        onSubmitEditing={() => {
          setIsHeaderEditable(false);
        }}
      />
    </View>
  );

  const settingsTitle = (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "row",
        height: 32,
      }}
    >
      <Text style={[styles.barText(theme), { fontWeight: "700" }]}>
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
    </BlurView>
  );
};

const styles = StyleSheet.create({
  barText: (theme) => ({
    fontSize: 16,
    fontWeight: "500",
    color: theme.fontColor,
    marginRight: 16,
    flex: 1,
  }),
  icon: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    alignSelf: "center",
    marginLeft: 16,
    marginRight: 8,
  },
  bar: (theme) => ({
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    width: "100%",
    borderBottomColor: theme.divider.color,
    borderBottomWidth: 1,
    alignContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 8,
    zIndex: 1,
    overflow: "visible",
    position: "absolute",
  }),
});
