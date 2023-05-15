import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { getTheme } from "../theme";

export const RadioButtonList = ({ theme, selected, setSelected, data }) => {
  return (
    <View>
      {data.map((item) => (
        <TouchableWithoutFeedback
          onPress={() => {
            setSelected(item.value);
          }}
        >
          <View style={styles.radioButtonItem}>
            <Text style={styles.text(theme)}>{item.value}</Text>
            <View
              style={
                selected == item.value
                  ? styles.radio(theme)
                  : styles.unselectedRadio(theme)
              }
            />
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  radioButtonItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  radio: (theme) => ({
    backgroundColor: "white",
    borderColor: theme.button.color,
    borderWidth: 8,
    width: 24,
    height: 24,
    borderRadius: 100,
  }),
  unselectedRadio: (theme) => ({
    borderColor: theme.button.disabledColor,
    borderWidth: 2,
    width: 24,
    height: 24,
    borderRadius: 100,
  }),
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
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "500",
    color: theme.iconColor,
  }),
  subTextContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  subtext: (theme) => ({
    paddingTop: 16,
    paddingHorizontal: 16,
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
