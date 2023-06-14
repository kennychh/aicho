import { FlatList, View, Keyboard, Dimensions, Animated } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import { getTheme } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const MessageList = ({
  data,
  inputOffset,
  setMessage,
  setEditMessage,
  setInput,
  setRegen,
  setRegenIndex,
  regen,
  theme,
  color,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <Animated.View
      style={{
        flex: 1,
        width: "100%",
        paddingTop: insets.top + 56,
      }}
    >
      <FlatList
        inverted
        data={data}
        indicator
        // onScroll={(event) => {
        //   const y =
        //     event.nativeEvent.contentSize.height -
        //     event.nativeEvent.layoutMeasurement.height;

        //   const invertedYOffset = event.nativeEvent.contentOffset.y;
        //   yOffset.setValue(y - invertedYOffset);
        // }}
        keyboardShouldPersistTaps="always"
        onScrollBeginDrag={Keyboard.dismiss}
        indicatorStyle={theme == getTheme("dark") ? "white" : "black"}
        renderItem={({ item, index }) => (
          <Message
            item={item}
            index={index}
            setMessage={setMessage}
            setEditMessage={setEditMessage}
            setInput={setInput}
            setRegen={setRegen}
            setRegenIndex={setRegenIndex}
            regen={regen}
            theme={theme}
            color={color}
          />
        )}
        style={{
          overflow: "visible",
          marginBottom: inputOffset,
        }}
        keyExtractor={(item) => {
          return item?.result?.id;
        }}
      />
    </Animated.View>
  );
};
