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
import { useState } from "react";

export const ModelScreen = ({ props, theme, model, setModel }) => {
  const navigation = props.navigation;
  const [selected, setSelected] = useState(model);
  const radioButtonListData = [{ value: "gpt-3.5-turbo" }, { value: "gpt-4" }];
  const data = [
    <Text style={styles.text(theme)}>Model</Text>,
    <RadioButtonList
      theme={theme}
      selected={selected}
      setSelected={setSelected}
      data={radioButtonListData}
    />,
    <View style={styles.subTextContainer}>
      <Text style={styles.subtext(theme)}>Select which model to use.</Text>
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
          headerTitle={"Model"}
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