import { FlatList, StyleSheet, Text, View } from "react-native";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { TextButton } from "../components";
import { BlurView } from "expo-blur";
import { StatusBar } from "expo-status-bar";

export const AuthenticateScreen = ({
  theme,
  onAuthenticate,
  color,
  isDarkMode,
}) => {
  const data = [
    <TextButton
      text={"Authenticate"}
      onPress={() => {
        onAuthenticate();
      }}
      theme={theme}
      color={color}
    />,
  ];
  return (
    <BlurView
      style={styles.blurView(isDarkMode)}
      tint={isDarkMode ? "light" : "dark"}
    >
      <View style={styles.container}>
        <TextButton
          text={"Unlock"}
          onPress={() => {
            onAuthenticate();
          }}
          theme={theme}
          color={color}
          buttonStyle={styles.buttonStyle}
          textStyle={styles.textStyle}
        />
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    flex: 1,
  },
  blurView: (isDarkMode) => ({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: "absolute",
    zIndex: 100,
    backgroundColor: isDarkMode ? "rgba(0, 0, 0, 0)" : "rgba(0, 0, 0, 0.5)",
  }),
  buttonStyle: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    alignItems: "center",
    paddingVertical: 16,
    marginHorizontal: 80,
    borderRadius: 100,
  },
  textStyle: {
    fontSize: 16,
    lineHeight: 18,
    fontWeight: "500",
    color: "#fff",
  },
});
