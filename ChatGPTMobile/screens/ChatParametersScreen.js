import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Header, SettingsInput, SettingsOption } from "../components";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { getTheme } from "../theme";

export const ChatParametersScreen = ({
  props,
  theme,
  maxTokens,
  timeout,
  model,
}) => {
  const navigation = props.navigation;
  const data = [
    <Text style={styles.text(theme)}>Model parameters</Text>,
    <SettingsOption
      title={"Model"}
      onPress={() => {
        navigation.navigate("Model");
      }}
      theme={theme}
      value={model}
      showDivider={true}
    />,
    <SettingsOption
      title={"Max tokens"}
      onPress={() => {
        navigation.navigate("Max Tokens");
      }}
      theme={theme}
      value={maxTokens}
      isMiddle={true}
    />,
    <SettingsOption
      title={"Timeout"}
      onPress={() => {
        navigation.navigate("Timeout");
      }}
      theme={theme}
      value={timeout}
      showDivider={false}
      isMiddle={false}
    />,
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
          headerTitle={"Chat Parameters"}
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
    borderRadius: "100%",
    alignSelf: "center",
  },
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
