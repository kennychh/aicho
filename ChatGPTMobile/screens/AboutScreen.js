import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Keyboard,
  Image,
  Switch,
  Animated,
} from "react-native";
import { Header } from "../components";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { getTheme } from "../theme";
import { useRef, useState } from "react";

export const AboutScreen = ({ props, theme }) => {
  const navigation = props.navigation;
  const insets = useSafeAreaInsets();
  const [headerHeight, setHeaderHeight] = useState(0);
  const yOffset = useRef(new Animated.Value(0)).current;
  const data = [
    <Image source={require("../assets/circle-icon.png")} style={styles.icon} />,
    <Text style={[styles.title(theme)]}>Hi, I'm AIcho!</Text>,
    <Text style={styles.subtext(theme)}>
      AIcho is an AI chat bot that uses the official ChatGPT API powered by
      OpenAI. Experience the power of AI and ChatGPT in a beautiful and
      intuitive mobile app!
    </Text>,
    <Text style={[styles.subtext(theme), { paddingTop: 0 }]}>
      This app has a variety of features of the official ChatGPT, such as
      multiple conversations, context retention, and editing messages. It also
      includes features by including the ability to tweak ChatGPT parameters,
      and app themes!
    </Text>,
  ];
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container(theme)}>
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
          style={{ flex: 1, marginTop: headerHeight - insets.top }}
          indicatorStyle={theme == getTheme("dark") ? "white" : "black"}
          renderItem={({ item }) => item}
        />
        <Header
          navigation={navigation}
          headerTitle={"About"}
          theme={theme}
          isSettingsHeader={true}
          setHeight={setHeaderHeight}
          yOffset={yOffset}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  modalOption: (theme) => ({
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: theme.onBackgroundColor,
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 16,
  }),
  modalOptionText: (theme) => ({
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "500",
    color: theme.fontColor,
  }),
  icon: {
    marginTop: 32,
    width: 80,
    height: 80,
    alignSelf: "center",
  },
  text: (theme) => ({
    paddingTop: 8,
    paddingLeft: 32,
    fontSize: 14,
    fontWeight: "700",
    color: theme.secondaryIconColor,
  }),
  title: (theme) => ({
    paddingTop: 24,
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
    paddingTop: 8,
    paddingHorizontal: 32,
    paddingBottom: 16,
    fontSize: 12,
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
