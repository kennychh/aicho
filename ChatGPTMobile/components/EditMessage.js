import {
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { Close } from "../icons";
import { useEffect, useState } from "react";

export const EditMessage = ({
  theme,
  inputOffset,
  setEditMessage,
  setInput,
  editMessage,
  listRef,
}) => {
  const windowWidth = Dimensions.get("window").width;

  const [showEdit, setShowEdit] = useState(false);
  useEffect(() => {
    if (editMessage) {
      listRef.current?.prepareForLayoutAnimationRender();
      LayoutAnimation.configureNext({
        duration: 300,
        create: {
          type: LayoutAnimation.Types.spring,
          property: LayoutAnimation.Properties.opacity,
          springDamping: 1,
        },
        update: {
          type: LayoutAnimation.Types.spring,
          springDamping: 1,
        },
      });
      setShowEdit(true);
    } else {
      listRef.current?.prepareForLayoutAnimationRender();
      LayoutAnimation.configureNext({
        duration: 300,
        create: {
          type: LayoutAnimation.Types.spring,
          property: LayoutAnimation.Properties.opacity,
          springDamping: 1,
        },
        update: {
          type: LayoutAnimation.Types.spring,
          springDamping: 1,
        },
      });
      setShowEdit(false);
    }
  }, [editMessage]);
  return (
    showEdit && (
      <View
        style={{
          width: "100%",
          marginTop: inputOffset,
          transform: [{ scaleY: -1 }],
        }}
      >
        <View
          style={{
            width: windowWidth,
            backgroundColor: theme.backgroundColor,
            flexDirection: "row",
            alignItems: "center",
            borderTopColor: theme.divider.color,
            borderTopWidth: 1,
          }}
        >
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => {
              setEditMessage(null);
              setInput("");
            }}
          >
            <Close
              width="20px"
              height="20px"
              stroke={theme.secondaryIconColor}
            />
          </TouchableOpacity>
          <Text style={styles.text(theme)}>Editing message</Text>
        </View>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  closeIcon: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 16,
    paddingLeft: 16,
    paddingRight: 8,
  },
  text: (theme) => ({
    fontSize: 14,
    color: theme.input.placeholderFontColor,
    marginLeft: 8,
  }),
});
