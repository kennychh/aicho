import { StyleSheet, Text, FlatList, View } from "react-native";
import { Header } from "../components";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { getTheme } from "../theme";
import { SettingsOption } from "./../components/SettingsOption";
import * as WebBrowser from "expo-web-browser";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRef, useState } from "react";
import { Animated } from "react-native";

export const SettingsScreen = ({ props, theme, setConfirmResetVisible }) => {
  const navigation = props.navigation;
  const yOffset = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const [headerHeight, setHeaderHeight] = useState(0);
  const handleOpenBrowserPress = async () => {
    await WebBrowser.openBrowserAsync("https://forms.gle/3GC4GSN9aVirATC8A");
  };

  const data = [
    {
      title: "User",
      style: styles.text(theme),
    },
    {
      title: "Account",
      onPress: () => {
        navigation.navigate("Account");
      },
    },
    {
      title: "Privacy & Security",
      onPress: () => {
        navigation.navigate("Privacy");
      },
    },
    {
      title: "Content & Display",
      style: styles.text(theme),
    },
    {
      title: "Chat Preferences",
      onPress: () => {
        navigation.navigate("Chat Preferences");
      },
    },
    {
      title: "Appearance",
      onPress: () => {
        navigation.navigate("Appearance");
      },
    },
    {
      title: "More info and support",
      style: styles.text(theme),
    },
    {
      title: "About",
      onPress: () => {
        navigation.navigate("About");
      },
    },
    {
      title: "Report a problem",
      onPress: () => {
        handleOpenBrowserPress();
      },
    },
    {
      title: "Data",
      style: styles.text(theme),
    },
    {
      title: "Reset data",
      onPress: () => {
        setConfirmResetVisible(true);
      },
    },
  ];

  const SettingsItem = ({ item }) => {
    const showDivider =
      ["Account", "Chat Preferences", "About"].indexOf(item.title) > -1;
    const isMiddle = [""].indexOf(item.title) > -1;
    return [
      "User",
      "Content & Display",
      "More info and support",
      "Data",
    ].indexOf(item.title) > -1 ? (
      <Text style={item.style}>{item.title}</Text>
    ) : (
      <View style={item.title == "Reset data" && { paddingBottom: 16 }}>
        <SettingsOption
          title={item.title}
          theme={theme}
          onPress={item.onPress}
          showDivider={showDivider}
          isMiddle={isMiddle}
          isSingle={item.title == "Reset data"}
        />
      </View>
    );
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container(theme)}
        edges={["top", "left", "right"]}
      >
        <StatusBar
          animated={true}
          style={theme === getTheme("dark") ? "light" : "dark"}
        />

        <FlatList
          data={data}
          onScroll={(event) => {
            const offset = event.nativeEvent.contentOffset.y;
            yOffset.setValue(offset);
          }}
          indicatorStyle={theme == getTheme("dark") ? "white" : "black"}
          style={{ flex: 1, marginTop: headerHeight - insets.top }}
          renderItem={({ item }) => <SettingsItem item={item} />}
          keyExtractor={(item, index) => {
            return index;
          }}
        />
        <Header
          navigation={navigation}
          headerTitle={"Settings"}
          theme={theme}
          isSettingsHeader={true}
          yOffset={yOffset}
          setHeight={setHeaderHeight}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  text: (theme) => ({
    paddingBottom: 8,
    paddingTop: 32,
    paddingLeft: 32,
    fontSize: 14,
    fontWeight: "700",
    color: theme.secondaryIconColor,
  }),
  textButton: {
    paddingTop: 16,
    paddingLeft: 32,
    fontSize: 16,
    color: "#FF0000",
  },
  container: (theme) => ({
    backgroundColor: theme.backgroundColor,
    flex: 1,
  }),
  componentContainer: {
    width: "100%",
    flex: 1,
  },
});
