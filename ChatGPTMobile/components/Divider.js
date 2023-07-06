import { StyleSheet, View } from "react-native";

export const Divider = ({ backgroundColor }) => {
  return (
    <View>
      <View style={styles.border(backgroundColor)} />
      <View
        style={[
          styles.border(backgroundColor),
          { backgroundColor: "transparent" },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  border: (backgroundColor) => ({
    backgroundColor: backgroundColor,
    height: 0.5,
  }),
});
