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
  color,
}) => {
  return (
    <View style={style}>
      {data.map((item) => (
        <TouchableWithoutFeedback
          key={item.value}
          onPress={() => {
            setSelected(item.value);
          }}
        >
          <View
            style={[
              itemStyle
                ? itemStyle
                : styles.radioButtonItem(
                    theme,
                    showDividerItems.indexOf(item.value) > -1
                  ),
              { alignItems: "center" },
            ]}
          >
            <Text style={textStyle ? textStyle : styles.text(theme)} numberOfLines={1}>
              {item.value}
            </Text>
            <View
              style={
                selected == item.value
                  ? styles.radio(color)
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
    paddingHorizontal: 16,
    borderBottomWidth: showDivider ? 0.5 : 0,
    borderBottomColor: showDivider
      ? theme.modal.divider.backgroundColor
      : "transparent",
  }),
  radio: (color) => ({
    backgroundColor: "white",
    borderColor: color,
    borderWidth: 8,
    width: 24,
    height: 24,
    borderRadius: 100,
  }),
  unselectedRadio: (theme) => ({
    borderColor: theme.radioButton.disabledColor,
    borderWidth: 1.5,
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
  text: (theme) => ({
    paddingVertical: 16,
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "500",
    color: theme.iconColor,
  }),
});
