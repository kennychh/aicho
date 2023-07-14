import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Keyboard,
  TouchableOpacity,
  Image,
  Animated,
} from "react-native";
import {
  Header,
  RadioButtonList,
  SettingsInput,
  TextButton,
} from "../components";
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { getTheme } from "../theme";
import { useContext, useRef, useState } from "react";
import { AppContext } from "../context";

export const ModelScreen = ({ props }) => {
  const navigation = props.navigation;
  const { theme, model, setModel, color } = useContext(AppContext);
  const [selected, setSelected] = useState(model);
  const insets = useSafeAreaInsets();
  const yOffset = useRef(new Animated.Value(0)).current;
  const [headerHeight, setHeaderHeight] = useState(0);
  const radioButtonListData = [{ value: "gpt-3.5-turbo" }, { value: "gpt-4" }];
  const data = [
    <Text style={styles.text(theme)}>Model</Text>,
    <View style={styles.radioButtonListContainer(theme)}>
      <RadioButtonList
        theme={theme}
        selected={selected}
        setSelected={setSelected}
        data={radioButtonListData}
        showDividerItems={["gpt-3.5-turbo"]}
        color={color}
      />
    </View>,
    <Text style={styles.subtext(theme)}>
      Access to certain models may depend on your account, and pricing may vary
      depending on the model.
    </Text>,
  ];
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container(theme)}
        edges={["left", "right", "bottom"]}
      >
        <StatusBar
          animated={true}
          style={theme === getTheme("dark") ? "light" : "dark"}
        />
        <FlatList
          onScroll={(event) => {
            const offset = event.nativeEvent.contentOffset.y;
            yOffset.setValue(offset);
          }}
          data={data}
          onScrollBeginDrag={Keyboard.dismiss}
          style={{ flex: 1, paddingTop: headerHeight }}
          indicatorStyle={theme == getTheme("dark") ? "white" : "black"}
          renderItem={({ item }) => item}
        />
        <Header
          navigation={navigation}
          headerTitle={"Model"}
          theme={theme}
          isSettingsHeader={true}
          yOffset={yOffset}
          setHeight={setHeaderHeight}
        />
        <View style={{ marginBottom: 8 }}>
          <TextButton
            text={"Save"}
            theme={theme}
            color={color}
            disabled={selected == model}
            onPress={() => {
              setModel(selected);
              navigation.goBack();
            }}
          />
        </View>
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
    paddingLeft: 32,
    paddingTop: 32,
    fontSize: 14,
    fontWeight: "600",
    color: theme.secondaryIconColor,
  }),
  subtext: (theme) => ({
    paddingTop: 8,
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
  radioButtonListContainer: (theme) => ({
    backgroundColor: theme.onBackgroundColor,
    marginHorizontal: 16,
    borderRadius: 16,
  }),
  componentContainer: {
    width: "100%",
    flex: 1,
  },
});
