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

export const InputScreen = ({
  props,
  theme,
  onPress,
  value,
  setValue,
  title,
  description,
  placeholder,
  headerTitle,
  buttonText,
  keyboardType,
  color,
}) => {
  const navigation = props.navigation;
  const [tempValue, setTempValue] = useState(value);
  const maxTokensDisable = tempValue <= 0 || tempValue > 4097;
  const timeoutDisable = tempValue <= 0 || tempValue > 10;
  const temperatureDisable =
    !/^-?\d+(?:\.\d+)?$/.test(tempValue) || tempValue < 0 || tempValue > 2;
  const penaltyDisable =
    !/^-?\d+(?:\.\d+)?$/.test(tempValue) || tempValue < -2 || tempValue > 2;
  const disableButton =
    headerTitle == "Max tokens"
      ? maxTokensDisable
      : headerTitle == "Timeout"
      ? timeoutDisable
      : headerTitle == "Temperature"
      ? temperatureDisable
      : headerTitle == "Presence penalty" || headerTitle == "Frequency penalty"
      ? penaltyDisable
      : false;
  const data = [
    <Text style={styles.text(theme)}>{title}</Text>,
    <SettingsInput
      placeholder={placeholder}
      theme={theme}
      value={tempValue}
      setValue={setTempValue}
      keyboardType={keyboardType}
    />,
    <Text style={styles.subtext(theme)}>{description}</Text>,
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
          headerTitle={headerTitle}
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
            text={buttonText}
            theme={theme}
            color={color}
            disabled={!tempValue || disableButton || tempValue == value}
            onPress={() => {
              if (onPress) {
                onPress();
              }
              setValue(tempValue);
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
