import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { getTheme } from "../theme";
import { Divider } from "./Divider";

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
      {data.map((item, index) => (
        <TouchableWithoutFeedback
          key={item.value}
          onPress={() => {
            setSelected(item.value);
          }}
        >
          <View>
            <View
              style={[
                itemStyle ? itemStyle : styles.radioButtonItem,
                { alignItems: "center" },
              ]}
            >
              <Text
                style={textStyle ? textStyle : styles.text(theme)}
                numberOfLines={1}
              >
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
            {showDividerItems.indexOf(item.value) > -1 && (
              <Divider
                backgroundColor={theme.modal.divider.backgroundColor}
                spacerColor={theme.onBackgroundColor}
                marginHorizontal={0}
              />
            )}
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
    paddingHorizontal: 16,
  },
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
    lineHeight: 18,
    alignSelf: "center",
    // fontWeight: "500",
    color: theme.iconColor,
  }),
});
