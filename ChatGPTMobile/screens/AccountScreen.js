import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { Header, SettingsInput } from "../components";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { getTheme } from "../theme";
import { TextButton } from "./../components";
import { useState } from "react";

export const AccountScreen = ({
  props,
  theme,
  setKey,
  apiKey,
  setKeyChanged,
}) => {
  const navigation = props.navigation;
  const [tempKey, setTempKey] = useState(apiKey);
  const data = [
    <Text style={styles.text(theme)}>OpenAI API key</Text>,
    <SettingsInput
      placeholder={tempKey == "" ? "Enter API key" : tempKey}
      theme={theme}
      value={tempKey}
      setValue={setTempKey}
    />,
    <View style={styles.subTextContainer}>
      <Text style={styles.subtext(theme)}>
        Login to OpenAI to access your API key.
      </Text>
      <TouchableOpacity>
        <Text style={styles.subtextCTA(theme)}>{" Learn more"}</Text>
      </TouchableOpacity>
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
          headerTitle={"Account"}
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
        <View style={{ marginBottom: 8 }}>
          <TextButton
            text={"Save"}
            theme={theme}
            disabled={tempKey == ""}
            onPress={() => {
              setKey(tempKey);
              setKeyChanged(true);
              navigation.goBack();
            }}
          />
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
  subTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  subtext: (theme) => ({
    paddingTop: 16,
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
