import { FlatList, View, Keyboard, Dimensions, Animated } from "react-native";
import { useEffect, useRef, useState } from "react";
import { Message } from "./Message";
import { getTheme } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";

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
  ref,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        marginBottom: inputOffset,
        // paddingTop: insets.top + 56,
      }}
    >
      <FlashList
        ref={ref}
        inverted
        data={data}
        estimatedItemSize={32}
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
        scrollIndicatorInsets={{
          top: -insets.top,
          left: 0,
          bottom: insets.top + 56,
          right: 0,
        }}
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
        contentContainerStyle={{
          paddingBottom: insets.top + 56,
          overflow: "visible",
        }}
        keyExtractor={(item) => {
          return item?.result?.id;
        }}
      />
    </View>
  );
};
