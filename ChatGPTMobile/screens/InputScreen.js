import {
  StyleSheet,
  View,
  Text,
  TextInput,
  FlatList,
  Keyboard,
  TouchableOpacity,
  Animated,
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
import { useRef, useState } from "react";

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
  secureTextEntry = false,
  color,
}) => {
  const navigation = props.navigation;
  const insets = useSafeAreaInsets();
  const yOffset = useRef(new Animated.Value(0)).current;
  const [tempValue, setTempValue] = useState(value);
  const [headerHeight, setHeaderHeight] = useState(0);
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
      secureTextEntry={secureTextEntry}
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
          headerTitle={headerTitle}
          theme={theme}
          isSettingsHeader={true}
          yOffset={yOffset}
          setHeight={setHeaderHeight}
        />
        <View style={{ marginBottom: 16 }}>
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
