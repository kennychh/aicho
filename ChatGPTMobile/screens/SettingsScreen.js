import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { Header } from "../components";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { getTheme } from "../theme";
import { NavArrowRight } from "../icons";
import { SettingsOption } from "./../components/SettingsOption";

export const SettingsScreen = ({ props, theme }) => {
  const navigation = props.navigation;
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
        <View style={{ flex: 1, paddingTop: 32 }}>
          <Text style={styles.text(theme)}>Account</Text>
          <SettingsOption title={"Account"} theme={theme} />
          <SettingsOption title={"Privacy"} theme={theme} />
          <Text style={[styles.text(theme), { paddingTop: 24 }]}>Content</Text>
          <SettingsOption title={"Chat Preferences"} theme={theme} />
          <SettingsOption title={"Language"} theme={theme} />
          <Text style={[styles.text(theme), { paddingTop: 24 }]}>More</Text>
          <SettingsOption title={"Report a problem"} theme={theme} />
          <SettingsOption title={"About"} theme={theme} />
          <SettingsOption title={"Support me"} theme={theme} />
        </View>
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
