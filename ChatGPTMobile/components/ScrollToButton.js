import {
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { ChevronDown, Close } from "../icons";
import { useEffect, useState } from "react";

export const ScrollToButton = ({
  theme,
  inputOffset,
  listRef,
  showScrollToButton,
  editMessageHeight,
}) => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    if (showScrollToButton) {
      // listRef.current?.prepareForLayoutAnimationRender();
      LayoutAnimation.configureNext({
        duration: 200,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
          springDamping: 1,
        },
        update: {
          type: LayoutAnimation.Types.spring,
          springDamping: 1,
        },
      });
      setShowButton(true);
    } else {
      // listRef.current?.prepareForLayoutAnimationRender();
      LayoutAnimation.configureNext({
        duration: 200,
        create: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
          springDamping: 1,
        },
        update: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
          springDamping: 1,
        },
        delete: {
          type: LayoutAnimation.Types.easeInEaseOut,
          property: LayoutAnimation.Properties.opacity,
          springDamping: 1,
        },
      });
      setShowButton(false);
    }
  }, [showScrollToButton]);
  return (
    <View
      style={{
        zIndex: 2,
        position: "absolute",
        transform: [{ scaleY: -1 }],
        left: 0,
        right: 0,
        marginLeft: "auto",
        marginRight: "auto",
        alignItems: "center",
        top: showButton ? inputOffset + 16 + editMessageHeight : -40,
      }}
    >
      <TouchableOpacity
        style={styles.icon}
        onPress={() => {
          listRef?.current.scrollToOffset({ animated: true, offset: 0 });
        }}
      >
        <View
          style={{
            backgroundColor: theme.scrollToButton.backgroundColor,
            padding: 8,
            borderRadius: "100%",
          }}
        >
          <ChevronDown
            width="24px"
            height="24px"
            stroke={theme.scrollToButton.iconColor}
          />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    justifyContent: "center",
    shadowColor: "black",
    shadowOpacity: "0.2",
    shadowOffset: {
      height: 2,
    },
  },
});
