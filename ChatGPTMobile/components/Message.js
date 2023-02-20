import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Easing,
  LayoutAnimation,
  UIManager,
} from "react-native";
import { useEffect, useRef, useState } from "react";

if (
  Platform.OS === "android" &&
  UIManager.setLayoutAnimationEnabledExperimental
) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}
export const Message = ({ item, index }) => {
  const text = item.result?.text || "";
  const isInput = item.isInput;
  const windowWidth = Dimensions.get("window").width;
  const [containerHeight, setContainerHeight] = useState(0);
  const onLayout = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    if (index == 0){
      setContainerHeight(height);
    }
  };

  const [expandMessage, setExpandMessage] = useState(false);

  const toggleExpandMessage = () => {
    LayoutAnimation.configureNext({
      duration: 200,
      create: {type: 'easeInEaseOut', property: 'opacity'},
      update: { type: "easeInEaseOut" },
      delete: {type: 'easeInEaseOut', property: 'opacity'},
    });
    setExpandMessage(true);
  };

  useEffect(() => {
    if (index == 0) {
      setTimeout(toggleExpandMessage, 100);
    }
  }, [containerHeight]);
  return (
    <View
      onLayout={(event) => onLayout(event)}
      style={[
        styles.itemContainer,
        {
          maxWidth: windowWidth - 120,
          bottom: containerHeight,
        },
        expandMessage ? styles.movedItemContainer : null,
        isInput
          ? {
              marginLeft: "auto",
              backgroundColor: "#10a37f",
              fontColor: "white",
            }
          : { marginRight: "auto" },
      ]}
    >
      <View>
        <Text
          style={[
            styles.text,
            isInput ? { color: "white" } : { fontColor: "black" },
          ]}
        >
          {text}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 16,
  },
  itemContainer: {
    backgroundColor: "#F7F7F8",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginTop: 16,
    alignSelf: "left",
    alignItems: "center",
    justifyContent: "center",
  },
  movedItemContainer: {
    bottom: 0,
  },
});
