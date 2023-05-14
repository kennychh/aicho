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
}) => {
  const navigation = props.navigation;
  const [tempValue, setTempValue] = useState(value);
  const disableButton = headerTitle == "Max tokens" && tempValue <= 0;
  const data = [
    <Text style={styles.text(theme)}>{title}</Text>,
    <SettingsInput
      placeholder={placeholder}
      theme={theme}
      value={tempValue}
      setValue={setTempValue}
      keyboardType={keyboardType}
    />,
    <View style={styles.subTextContainer}>
      <Text style={styles.subtext(theme)}>{description}</Text>
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
            disabled={!tempValue || disableButton}
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
