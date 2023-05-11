import { StyleSheet, View } from "react-native";
import { Header } from "../components";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { getTheme } from "../theme";

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
        <View style={{ flex: 1, overflow: "hidden" }}></View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: (theme) => ({
    backgroundColor: theme.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  }),
  componentContainer: {
    width: "100%",
    flex: 1,
  },
});
