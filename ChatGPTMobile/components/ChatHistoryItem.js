import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { Copy, Delete, Edit, Edit2, Message } from "../icons";
import { useContext, useMemo, useRef, useState } from "react";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import * as Haptics from "expo-haptics";
import { AppContext } from "../context";

export const ChatHistoryItem = ({
  onPress,
  text,
  openHoldPreview,
  data,
  index,
  holdPreviewFunctions,
}) => {
  const { theme } = useContext(AppContext);
  const expandContainer = useSharedValue(false);
  const ref = useRef(null);
  const DURATION = 400;

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: expandContainer.value
            ? withTiming(1.05, { duration: DURATION + 100 })
            : withTiming(1, { duration: DURATION }),
        },
      ],
    };
  });

  const containerStyle = useMemo(
    () => [animatedContainerStyle],
    [animatedContainerStyle]
  );

  const holdMenuData = [
    {
      title: "Copy",
      icon: <Copy stroke={theme.iconColor} width={20} height={20} />,
      onPress: () => {
        holdPreviewFunctions.copyChat(index);
      },
    },
    {
      title: "Rename",
      icon: <Edit2 stroke={theme.iconColor} width={20} height={20} />,
      onPress: () => {
        holdPreviewFunctions.editTitle(index);
      },
    },
    {
      title: "Delete",
      icon: <Delete stroke={"#FF0000"} width={20} height={20} />,
      isDestructive: true,
      onPress: () => {
        holdPreviewFunctions.deleteChat(index);
      },
    },
  ];
  return (
    <Animated.View style={containerStyle}>
      <TouchableOpacity
        ref={ref}
        onPress={onPress}
        delayLongPress={200}
        onLongPress={() => {
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
          expandContainer.value = true;
          setTimeout(() => {
            ref?.current?.measure((x, y, width, height, pageX, pageY) => {
              openHoldPreview(
                {
                  x: pageX,
                  y: pageY,
                  width: width,
                  height: height,
                },
                text,
                data,
                holdMenuData,
                true
              );
            });
          }, DURATION - 200);
        }}
        onPressOut={() => {
          expandContainer.value = false;
        }}
        style={[styles.chatItem]}
      >
        <Message style={{ marginRight: 8 }} stroke={theme.iconColor} />
        <Text
          style={[styles.chatItemText(theme), { flex: 1 }]}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {text}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  chatItemText: (theme) => ({
    fontSize: 16,
    lineHeight: 18,
    // fontWeight: "500",
    color: theme.fontColor,
    paddingVertical: 16,
  }),
  chatItemIcon: { marginRight: 16 },
  chatItem: {
    paddingHorizontal: 16,
    marginHorizontal: 16,
    borderRadius: 16,
    marginBottom: 8,
    flexDirection: "row",
    flex: 1,
    alignItems: "center",
  },
});
