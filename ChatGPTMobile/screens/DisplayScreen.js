import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Keyboard,
  TouchableOpacity,
  Image,
} from "react-native";
import {
  Header,
  RadioButtonList,
  SettingsInput,
  TextButton,
} from "../components";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { getTheme } from "../theme";
import { useEffect, useState } from "react";

export const DisplayScreen = ({
  props,
  theme,
  isDarkMode,
  setIsDarkMode,
  useDeviceSettings,
  setUseDeviceSettings,
}) => {
  const navigation = props.navigation;
  const [selected, setSelected] = useState(
    useDeviceSettings ? "System" : isDarkMode ? "Dark" : "Light"
  );
  const radioButtonListData = [
    { value: "Light" },
    { value: "Dark" },
    { value: "System" },
  ];

  useEffect(() => {
    if (selected == "System") {
      setUseDeviceSettings(true);
    } else if (selected == "Dark") {
      setUseDeviceSettings(false);
      setIsDarkMode(true);
    } else {
      setUseDeviceSettings(false);
      setIsDarkMode(false);
    }
  }, [selected]);
  const data = [
    <Text style={styles.text(theme)}>Appearance</Text>,
    <View style={styles.appearanceContainer(theme)}>
      <View style={styles.themeImagesContainer}>
        <Image
          source={require("../assets/light-theme.png")}
          style={styles.themeImage}
        />
        <Image
          source={require("../assets/dark-theme.png")}
          style={styles.themeImage}
        />
        <Image
          source={require("../assets/system-theme.png")}
          style={styles.themeImage}
        />
      </View>
      <RadioButtonList
        theme={theme}
        selected={selected}
        setSelected={setSelected}
        data={radioButtonListData}
        style={styles.radioButtonListStyle}
        itemStyle={styles.radioButtonItem}
        textStyle={styles.radioButtonText(theme)}
      />
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
          headerTitle={"Display"}
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
  themeImage: {
    height: 100,
    width: 52,
    resizeMode: "contain",
    aspectRatio: 0.52,
  },
  appearanceContainer: (theme) => ({
    backgroundColor: theme.onBackgroundColor,
    paddingVertical: 32,
    marginHorizontal: 16,
    borderRadius: 16,
  }),
  themeImagesContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  radioButtonText: (theme) => ({
    fontSize: 12,
    fontWeight: "500",
    color: theme.fontColor,
    paddingBottom: 16,
  }),
  radioButtonListStyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  radioButtonItem: {
    paddingVertical: 16,
    alignItems: "center",
    width: 52,
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
  subTextContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingHorizontal: 16,
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
