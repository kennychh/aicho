import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { getTheme } from "../theme";

export const RadioButtonList = ({
  theme,
  selected,
  setSelected,
  data,
  style,
  itemStyle,
  textStyle,
  showDividerItems = [],
}) => {
  return (
    <View style={style}>
      {data.map((item) => (
        <TouchableWithoutFeedback
          onPress={() => {
            setSelected(item.value);
          }}
        >
          <View
            style={
              itemStyle
                ? itemStyle
                : styles.radioButtonItem(
                    theme,
                    showDividerItems.indexOf(item.value) > -1
                  )
            }
          >
            <Text style={textStyle ? textStyle : styles.text(theme)}>
              {item.value}
            </Text>
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
  radioButtonItem: (theme, showDivider) => ({
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    borderBottomWidth: showDivider ? 1 : 0,
    borderBottomColor: showDivider
      ? theme.modal.divider.backgroundColor
      : "transparent",
  }),
  radio: (theme) => ({
    backgroundColor: "white",
    borderColor: theme.radioButton.color,
    borderWidth: 8,
    width: 24,
    height: 24,
    borderRadius: 100,
  }),
  unselectedRadio: (theme) => ({
    borderColor: theme.radioButton.disabledColor,
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
});
