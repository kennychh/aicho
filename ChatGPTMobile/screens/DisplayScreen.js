import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Keyboard,
  Image,
  TouchableOpacity,
} from "react-native";
import { Header, RadioButtonList } from "../components";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { getTheme } from "../theme";
import { useEffect, useState } from "react";
import { Check } from "../icons";

export const DisplayScreen = ({
  props,
  theme,
  isDarkMode,
  setIsDarkMode,
  useDeviceSettings,
  setUseDeviceSettings,
  color,
  setColor,
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
  const colorData = [
    "#10a37f",
    "#3678DD",
    "#ee2677",
    "#8546D7",
    "#E55631",
    "#D32D49",
  ];
  const data = [
    <Text style={styles.text(theme)}>Appearance</Text>,
    <View style={styles.appearanceContainer(theme)}>
      <View style={styles.themeImagesContainer}>
        <Image
          source={require("../assets/light-theme.png")}
          style={styles.themeImage(color)}
        />
        <Image
          source={require("../assets/dark-theme.png")}
          style={styles.themeImage(color)}
        />
        <Image
          source={require("../assets/system-theme.png")}
          style={styles.themeImage(color)}
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
        color={color}
      />
    </View>,
    <Text style={styles.text(theme)}>Theme</Text>,
    <View style={styles.themeContainer(theme)}>
      {colorData.map((value) => (
        <TouchableOpacity
          style={[styles.circle, { backgroundColor: value }]}
          onPress={() => {
            setColor(value);
          }}
        >
          {color == value && <Check stroke={"#fff"} />}
        </TouchableOpacity>
      ))}
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
          style={{ flex: 1 }}
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
  themeContainer: (theme) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    backgroundColor: theme.onBackgroundColor,
    marginHorizontal: 16,
    borderRadius: 16,
  }),
  circle: {
    width: 40,
    height: 40,
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  themeImage: (color) => ({
    height: 100,
    width: 52,
    resizeMode: "contain",
    aspectRatio: 0.52,
    backgroundColor: color,
    borderRadius: 8,
  }),
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
    paddingTop: 16,
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
    paddingTop: 32,
    paddingLeft: 32,
    fontSize: 14,
    fontWeight: "700",
    color: theme.secondaryIconColor,
  }),
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
