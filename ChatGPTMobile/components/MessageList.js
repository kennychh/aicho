import { FlatList, View, Keyboard, Dimensions } from "react-native";
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
  setRetry,
  setError,
  regen,
  theme,
  color,
  listRef,
}) => {
  const insets = useSafeAreaInsets();

  const renderItem = ({ item, index }) => {
    return (
      <Message
        item={item}
        index={index}
        setMessage={setMessage}
        setEditMessage={setEditMessage}
        setInput={setInput}
        setRegen={setRegen}
        setRegenIndex={setRegenIndex}
        setRetry={setRetry}
        setError={setError}
        regen={regen}
        theme={theme}
        color={color}
      />
    );
  };

  const keyExtractor = (item, index) => item?.result?.id || index;
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        transform: [{ scaleY: -1 }],
      }}
    >
      <FlashList
        ref={listRef}
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
          // top: -insets.top,
          left: 0,
          bottom: insets.top + 56,
          right: 0,
        }}
        renderItem={renderItem}
        contentContainerStyle={{
          // paddingBottom: insets.top + 56,
          // paddingTop: inputOffset,
          paddingTop: inputOffset,
          paddingBottom: insets.top + 56,
        }}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};
