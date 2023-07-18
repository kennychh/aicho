import {
  Dimensions,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { View } from "react-native";
import { Close } from "../icons";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context";

export const EditMessage = ({
  inputOffset,
  setEditMessageHeight,
  showEditMessage,
  setShowEditMessage,
}) => {
  const windowWidth = Dimensions.get("window").width;
  const { handleEditMessage, theme, editMessage, setInput } =
    useContext(AppContext);

  const [showEdit, setShowEdit] = useState(false);
  useEffect(() => {
    if (showEditMessage) {
      // listRef.current?.prepareForLayoutAnimationRender();
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
      // listRef.current?.prepareForLayoutAnimationRender();
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
      setShowEditMessage(false);
      setEditMessageHeight(0);
    }
  }, [showEditMessage]);
  return (
    showEdit && (
      <View
        onLayout={(event) => {
          const { height } = event.nativeEvent.layout;
          setEditMessageHeight(height);
        }}
        style={{
          width: "100%",
          marginTop: inputOffset,
          transform: [{ scaleY: -1 }],
          zIndex: 3,
        }}
      >
        <View
          style={{
            width: windowWidth,
            backgroundColor: theme.backgroundColor,
            flexDirection: "row",
            alignItems: "center",
            borderTopColor: theme.divider.color,
            borderTopWidth: 0.5,
          }}
        >
          <TouchableOpacity
            style={styles.closeIcon}
            onPress={() => {
              handleEditMessage(null);
              setShowEditMessage(false);
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
