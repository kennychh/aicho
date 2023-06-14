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
import { useRef } from "react";

export const PrivacyScreen = ({
  props,
  theme,
  retainContext,
  setRetainContext,
  authenticate,
  setAuthenticate,
}) => {
  const insets = useSafeAreaInsets();
  const yOffset = useRef(new Animated.Value(0)).current;
  const navigation = props.navigation;
  const data = [
    <Text style={styles.subtext(theme)}>
      Your conversations and settings are stored on your device. Your API key is
      never shared, and is encrypted and securely stored locally.
    </Text>,
    <Text style={styles.text(theme)}>Contextual Conversations</Text>,
    <View style={styles.modalOption(theme)}>
      <Text style={styles.modalOptionText(theme)}>
        Retain conversation context
      </Text>
      <Switch
        style={{ marginVertical: -16 }}
        onValueChange={() => {
          setRetainContext(!retainContext);
        }}
        value={retainContext}
      />
    </View>,
    <Text style={styles.subtext(theme)}>
      When enabled, conversations are temporarily stored remotely to retain
      previous context. Data is not linked to you and is deleted after 24 hours.
    </Text>,
    <Text style={[styles.subtext(theme), { paddingTop: 0 }]}>
      Note: Refrain from providing personal details.
    </Text>,
    <Text style={styles.text(theme)}>Security</Text>,
    <View style={styles.modalOption(theme)}>
      <Text style={styles.modalOptionText(theme)}>
        Use device authentication
      </Text>
      <Switch
        style={{ marginVertical: -16 }}
        onValueChange={() => {
          setAuthenticate(!authenticate);
        }}
        value={authenticate}
      />
    </View>,
    <Text style={styles.subtext(theme)}>Lock this app upon closing it.</Text>,
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
          style={{ flex: 1, paddingTop: insets.top + 16 }}
          indicatorStyle={theme == getTheme("dark") ? "white" : "black"}
          renderItem={({ item }) => item}
        />
        <Header
          navigation={navigation}
          headerTitle={"Privacy & Security"}
          theme={theme}
          isSettingsHeader={true}
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
    paddingLeft: 32,
    fontSize: 14,
    fontWeight: "700",
    color: theme.secondaryIconColor,
  }),
  title: (theme) => ({
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
