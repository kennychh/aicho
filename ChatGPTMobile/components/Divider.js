import { StyleSheet, View } from "react-native";

export const Divider = ({
  backgroundColor = "red",
  marginHorizontal = 16,
  spacerColor = "transparent",
  style = {},
}) => {
  return (
    <View style={[{ marginHorizontal: marginHorizontal }, style]}>
      <View
        style={[
          styles.border,
          {
            backgroundColor: backgroundColor,
            borderBottomWidth: 0.5,
            borderBottomColor: spacerColor,
          },
        ]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  border: {
    height: 1,
  },
});
