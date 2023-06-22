import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Keyboard,
  Image,
  TouchableOpacity,
  Animated,
} from "react-native";
import { Header, RadioButtonList } from "../components";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { getTheme } from "../theme";
import { useEffect, useRef, useState } from "react";
import { Check, DarkTheme, LightTheme, SystemTheme } from "../icons";

export const AppearanceScreen = ({
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
  const insets = useSafeAreaInsets();
  const yOffset = useRef(new Animated.Value(0)).current;
  const [headerHeight, setHeaderHeight] = useState(0);
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
    "#8d7ce6",
    "#EA55A2",
    "#f25c54",
    "#D32D49",
    "#4361ee",
  ];
  const data = [
    <Text style={styles.text(theme)}>Theme</Text>,
    <View style={styles.appearanceContainer(theme)}>
      <View style={styles.themeImagesContainer}>
        <View style={styles.themeImage(color)}>
          <LightTheme />
        </View>
        <View style={styles.themeImage(color)}>
          <DarkTheme />
        </View>
        <View style={styles.themeImage(color)}>
          <SystemTheme />
        </View>
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
    <Text style={styles.text(theme)}>Accent color</Text>,
    <View style={styles.themeContainer(theme)}>
      {colorData.map((value) => (
        <TouchableOpacity
          key={value}
          style={[
            styles.circle,
            {
              backgroundColor: value,
              marginRight: value === "#4361ee" ? 0 : 8,
            },
          ]}
          onPress={() => {
            setColor(value);
          }}
        >
          {color == value && <Check stroke={"#fff"} />}
        </TouchableOpacity>
      ))}
    </View>,
    <View style={{ paddingBottom: 16 }} />,
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
          headerTitle={"Appearance"}
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
  themeContainer: (theme) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    alignItems: "center",
    backgroundColor: theme.onBackgroundColor,
    marginHorizontal: 16,
    borderRadius: 16,
    height: 72,
  }),
  circle: {
    maxWidth: 40,
    aspectRatio: 1,
    flex: 1,
    borderRadius: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  themeImage: (color) => ({
    // height: 100,
    width: 56,
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
  text: (theme) => ({
    paddingBottom: 8,
    paddingTop: 32,
    paddingLeft: 32,
    fontSize: 14,
    fontWeight: "700",
    color: theme.secondaryIconColor,
  }),
  subtext: (theme) => ({
    paddingTop: 24,
    paddingHorizontal: 32,
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
