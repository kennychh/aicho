import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Keyboard,
  TouchableOpacity,
  Animated,
  Alert,
  Platform,
} from "react-native";
import { Header, SettingsInput } from "../components";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { getTheme } from "../theme";
import { TextButton } from "./../components";
import { useEffect, useRef, useState } from "react";
import Constants from "expo-constants";

const subscriptionSkus = Platform.select({
  ios: ["aicho_pro"],
});

export const ProScreen = ({ props, theme, onPress, color }) => {
  const navigation = props.navigation;
  const insets = useSafeAreaInsets();
  const yOffset = useRef(new Animated.Value(0)).current;
  const [headerHeight, setHeaderHeight] = useState(0);
  const [isUpgradeBtnLoading, setIsUpgradeBtnLoading] = useState(false);
  const [text, setText] = useState("");
  const data = [<Text style={styles.text(theme)}>{text}</Text>];
  const key = "appl_OpEHIehKoJaOakWiZDphVifxLrU";

  useEffect(() => {
    if (Constants.appOwnership === "expo") {
      setText("expo");
    } else {
      const main = async () => {
        const Purchases = await import("react-native-purchases"),
          { getProducts } = await import("react-native-purchases");
        await Purchases.configure({
          apiKey: key,
        });
        const prods = await getProducts(["aicho_pro"]);
        setText(prods);
      };
      main();
    }
  }, []);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container(theme)}>
        <StatusBar
          animated={true}
          style={theme === getTheme("dark") ? "light" : "dark"}
        />
        <FlatList
          data={data}
          onScrollBeginDrag={Keyboard.dismiss}
          onScroll={(event) => {
            const offset = event.nativeEvent.contentOffset.y;
            yOffset.setValue(offset);
          }}
          style={{ flex: 1, marginTop: headerHeight - insets.top }}
          indicatorStyle={theme == getTheme("dark") ? "white" : "black"}
          renderItem={({ item }) => item}
        />
        <Header
          navigation={navigation}
          headerTitle={"AIcho Pro"}
          theme={theme}
          isSettingsHeader={true}
          yOffset={yOffset}
          setHeight={setHeaderHeight}
        />
        <View style={{ marginBottom: 8 }}>
          <TextButton
            text={"$1.99/month"}
            theme={theme}
            color={color}
            onPress={() => {}}
          />
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  text: (theme) => ({
    paddingBottom: 16,
    paddingLeft: 32,
    paddingTop: 24,
    fontSize: 14,
    fontWeight: "700",
    color: theme.secondaryIconColor,
  }),
  subTextContainer: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    paddingHorizontal: 32,
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
