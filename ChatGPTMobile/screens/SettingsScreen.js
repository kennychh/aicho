import { StyleSheet, Text, FlatList } from "react-native";
import { Header } from "../components";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { getTheme } from "../theme";
import { SettingsOption } from "./../components/SettingsOption";
import * as WebBrowser from "expo-web-browser";

export const SettingsScreen = ({ props, theme }) => {
  const navigation = props.navigation;
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
      title: "Privacy",
      onPress: () => {
        navigation.navigate("Privacy");
      },
    },
    {
      title: "Content & Display",
      style: [styles.text(theme), { paddingTop: 32 }],
    },
    {
      title: "Chat Preferences",
      onPress: () => {
        navigation.navigate("Chat Preferences");
      },
    },
    {
      title: "Display",
      onPress: () => {
        navigation.navigate("Display");
      },
    },
    {
      title: "More",
      style: [styles.text(theme), { paddingTop: 32 }],
    },
    {
      title: "AIcho Pro",
      onPress: () => {
        navigation.navigate("Account");
      },
    },
    {
      title: "About",
      onPress: () => {
        navigation.navigate("Account");
      },
    },
    {
      title: "Report a problem",
      onPress: () => {
        handleOpenBrowserPress();
      },
    },
  ];

  const SettingsItem = ({ item }) => {
    const showDivider =
      ["Account", "Chat Preferences", "AIcho Pro"].indexOf(item.title) > -1;
    const isMiddle = ["About"].indexOf(item.title) > -1;
    return ["User", "Content & Display", "More"].indexOf(item.title) > -1 ? (
      <Text style={item.style}>{item.title}</Text>
    ) : (
      <SettingsOption
        title={item.title}
        theme={theme}
        onPress={item.onPress}
        showDivider={showDivider}
        isMiddle={isMiddle}
      />
    );
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container(theme)}>
        <StatusBar
          animated={true}
          style={theme === getTheme("dark") ? "light" : "dark"}
        />
        <Header
          navigation={navigation}
          headerTitle={"Settings"}
          theme={theme}
          isSettingsHeader={true}
        />
        <FlatList
          data={data}
          indicatorStyle={theme == getTheme("dark") ? "white" : "black"}
          style={{ flex: 1, paddingTop: 32 }}
          renderItem={({ item }) => <SettingsItem item={item} />}
          keyExtractor={(item, index) => {
            return index;
          }}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  divider: (theme) => ({
    width: "100%",
    height: 1,
    backgroundColor: theme.divider.color,
  }),
  text: (theme) => ({
    paddingBottom: 16,
    paddingLeft: 32,
    fontSize: 14,
    fontWeight: "700",
    color: theme.secondaryIconColor,
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
