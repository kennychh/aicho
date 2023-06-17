import {
  FlatList,
  View,
  Keyboard,
  Dimensions,
  LayoutAnimation,
} from "react-native";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Message from "./Message";
import { getTheme } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlashList } from "@shopify/flash-list";
import { EditMessage } from "./EditMessage";
import Animated, {
  FadeIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";

export const MessageList = ({
  data,
  inputOffset,
  setMessage,
  editMessage,
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
  const [showCurrentMessage, setShowCurrentMessage] = useState(false);
  const [isCurrentMessage, setIsCurrentMessage] = useState(false);
  const memoizedColor = useMemo(() => color, [color]);

  const renderItem = useCallback(({ item, index }) => {
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
        color={memoizedColor}
        listRef={listRef}
      />
    );
  }, [memoizedColor]);

  const keyExtractor = (item, index) => item?.result?.id || index;
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        transform: [{ scaleY: -1 }],
      }}
    >
      <EditMessage
        theme={theme}
        inputOffset={inputOffset}
        setEditMessage={setEditMessage}
        setInput={setInput}
        editMessage={editMessage}
        listRef={listRef}
      />
      <FlatList
        ref={listRef}
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
        removeClippedSubviews={true}
        initialNumToRender={20}
        indicatorStyle={theme == getTheme("dark") ? "white" : "black"}
        scrollIndicatorInsets={{
          top: 8,
          left: 0,
          bottom: insets.top + 56,
          right: 0,
        }}
        renderItem={renderItem}
        contentContainerStyle={{
          // paddingBottom: insets.top + 56,
          // paddingTop: inputOffset,
          paddingTop: !!editMessage ? 8 : inputOffset + 8,
          paddingBottom: insets.top + 56,
        }}
        keyExtractor={keyExtractor}
      />
    </View>
  );
};
