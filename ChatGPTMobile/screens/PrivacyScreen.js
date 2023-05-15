import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Keyboard,
  TouchableOpacity,
  Image,
} from "react-native";
import { Header, SettingsInput } from "../components";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { getTheme } from "../theme";
import { TextButton } from "./../components";
import { useState } from "react";

export const PrivacyScreen = ({ props, theme }) => {
  const navigation = props.navigation;
  const data = [
    <Image
      source={require("../assets/circle-icon.png")}
      style={styles.icon}
    />,
    <Text style={styles.text(theme)}>Your privacy matters</Text>,
    <View style={styles.subTextContainer}>
      <Text style={styles.subtext(theme)}>
        All data, such as your conversations, are stored on your device.
        Specifically, your API key is encrypted and securely stored locally.
      </Text>
    </View>,
  ];
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container(theme)}>
        <StatusBar
          animated={true}
          style={theme === getTheme("dark") ? "light" : "dark"}
        />
        <Header
          navigation={navigation}
          headerTitle={"Privacy"}
          theme={theme}
          isSettingsHeader={true}
        />
        <FlatList
          data={data}
          onScrollBeginDrag={Keyboard.dismiss}
          style={{ flex: 1, paddingTop: 32 }}
          indicatorStyle={theme == getTheme("dark") ? "white" : "black"}
          renderItem={({ item }) => item}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  divider: (theme) => ({
    width: "100%",
    height: 1,
    backgroundColor: theme.divider.color,
  }),
  text: (theme) => ({
    paddingTop: 16,
    paddingHorizontal: 16,
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "700",
    color: theme.iconColor,
  }),
  subTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  subtext: (theme) => ({
    paddingTop: 16,
    paddingHorizontal: 16,
    fontSize: 12,
    fontWeight: "500",
    color: theme.secondaryIconColor,
  }),
  subtextCTA: (theme) => ({
    fontSize: 12,
    fontWeight: "500",
    color: theme.iconColor,
  }),
  container: (theme) => ({
    backgroundColor: theme.backgroundColor,
    flex: 1,
  }),
  componentContainer: {
    width: "100%",
    flex: 1,
  },
});
