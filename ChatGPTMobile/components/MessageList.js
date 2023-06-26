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
import { ScrollToButton } from "./ScrollToButton";

export const MessageList = ({
  data,
  inputOffset,
  setMessage,
  editMessage,
  setEditMessage,
  setInput,
  setRegen,
  setRetry,
  setError,
  regen,
  regenIndex,
  theme,
  color,
  listRef,
  showScrollToButton,
  setShowScrollToButton,
  setEditMessageHeight,
  editMessageHeight,
  intensity,
}) => {
  const insets = useSafeAreaInsets();
  const [showCurrentMessage, setShowCurrentMessage] = useState(false);
  const [isCurrentMessage, setIsCurrentMessage] = useState(false);
  const [indexChanged, setIndexChanged] = useState(false);
  const memoizedColor = useMemo(() => color, [color]);
  const memoizedTheme = useMemo(() => theme, [theme]);
  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <Message
          item={item}
          index={index}
          setMessage={setMessage}
          setEditMessage={setEditMessage}
          setInput={setInput}
          setRegen={setRegen}
          setRetry={setRetry}
          setError={setError}
          regen={regen}
          theme={memoizedTheme}
          color={memoizedColor}
          listRef={listRef}
          intensity={intensity}
        />
      );
    },
    [memoizedColor, memoizedTheme]
  );

  const keyExtractor = (item, index) => item?.result?.id || index;
  return (
    <View
      style={{
        flex: 1,
        width: "100%",
        transform: [{ scaleY: -1 }],
      }}
    >
      <ScrollToButton
        listRef={listRef}
        theme={theme}
        inputOffset={inputOffset}
        showScrollToButton={showScrollToButton}
        setShowScrollToButton={setShowScrollToButton}
        editMessageHeight={editMessageHeight}
      />
      <EditMessage
        theme={theme}
        inputOffset={inputOffset}
        setEditMessage={setEditMessage}
        setInput={setInput}
        editMessage={editMessage}
        listRef={listRef}
        setEditMessageHeight={setEditMessageHeight}
      />
      <FlatList
        ref={(list) => (listRef.current = list)}
        data={data}
        indicator
        onScroll={(event) => {
          y = event.nativeEvent.contentOffset.y;
          if (y > 144 && !showScrollToButton) {
            setShowScrollToButton(true);
          } else if (y <= 144 && showScrollToButton) {
            setShowScrollToButton(false);
          }
        }}
        keyboardShouldPersistTaps="always"
        onScrollBeginDrag={Keyboard.dismiss}
        removeClippedSubviews={true}
        initialNumToRender={10}
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
