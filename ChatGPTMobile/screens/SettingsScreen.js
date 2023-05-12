import { StyleSheet, Text, FlatList } from "react-native";
import { Header } from "../components";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { getTheme } from "../theme";
import { SettingsOption } from "./../components/SettingsOption";

export const SettingsScreen = ({ props, theme }) => {
  const navigation = props.navigation;
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
      title: "Content",
      style: [styles.text(theme), { paddingTop: 32 }],
    },
    {
      title: "Chat Preferences",
      onPress: () => {
        navigation.navigate("Account");
      },
    },
    {
      title: "Language",
      onPress: () => {
        navigation.navigate("Account");
      },
    },
    {
      title: "More",
      style: [styles.text(theme), { paddingTop: 32 }],
    },
    {
      title: "Report a problem",
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
      title: "Support me",
      onPress: () => {
        navigation.navigate("Account");
      },
    },
  ];

  const SettingsItem = ({ item }) => {
    return ["User", "Content", "More"].indexOf(item.title) > -1 ? (
      <Text style={item.style}>{item.title}</Text>
    ) : (
      <SettingsOption title={item.title} theme={theme} onPress={item.onPress} />
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
    paddingBottom: 8,
    paddingLeft: 16,
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
