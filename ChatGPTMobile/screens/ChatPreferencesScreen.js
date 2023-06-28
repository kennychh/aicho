import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Keyboard,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Header, SettingsInput, SettingsOption } from "../components";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { getTheme } from "../theme";
import { useRef, useState } from "react";

export const ChatPreferencesScreen = ({
  props,
  theme,
  maxTokens,
  temperature,
  presencePenalty,
  frequencyPenalty,
  timeout,
  model,
}) => {
  const navigation = props.navigation;
  const insets = useSafeAreaInsets();
  const yOffset = useRef(new Animated.Value(0)).current;
  const [headerHeight, setHeaderHeight] = useState(0);
  const data = [
    <Text style={styles.text(theme)}>Parameters</Text>,
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
      title={"Temperature"}
      onPress={() => {
        navigation.navigate("Temperature");
      }}
      theme={theme}
      value={temperature}
      isMiddle={true}
    />,
    <SettingsOption
      title={"Presence penalty"}
      onPress={() => {
        navigation.navigate("Presence penalty");
      }}
      theme={theme}
      value={presencePenalty}
      isMiddle={true}
    />,
    <SettingsOption
      title={"Frequency penalty"}
      onPress={() => {
        navigation.navigate("Frequency penalty");
      }}
      theme={theme}
      value={frequencyPenalty}
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
    <View style={{ paddingBottom: 16 }} />,
  ];
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container(theme)} edges={["left", "right"]}>
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
          onScrollBeginDrag={Keyboard.dismiss}
          style={{ flex: 1, paddingTop: headerHeight}}
          indicatorStyle={theme == getTheme("dark") ? "white" : "black"}
          renderItem={({ item }) => item}
        />
        <Header
          navigation={navigation}
          headerTitle={"Chat Preferences"}
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
  icon: {
    width: 80,
    height: 80,
    borderRadius: "100%",
    alignSelf: "center",
  },
  text: (theme) => ({
    paddingBottom: 8,
    paddingTop: 32,
    paddingLeft: 32,
    fontSize: 14,
    fontWeight: "600",
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
