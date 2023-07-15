import {
  FlatList,
  View,
  Keyboard,
  Dimensions,
  LayoutAnimation,
} from "react-native";
import {
  memo,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Message from "./Message";
import { getTheme } from "../theme";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { EditMessage } from "./EditMessage";
import { ScrollToButton } from "./ScrollToButton";
import { FlashList } from "@shopify/flash-list";
import { AppContext } from "../context";

const MessageList = ({
  data,
  inputOffset,
  setMessage,
  setRegen,
  setRetry,
  setError,
  regen,
  listRef,
  showScrollToButton,
  setShowScrollToButton,
  setEditMessageHeight,
  editMessageHeight,
  intensity,
}) => {
  const { setInput, setEditMessage, theme, editMessage, color, holdMenuRef } =
    useContext(AppContext);
  const ref = useRef();
  const insets = useSafeAreaInsets();
  const [scrollEnabled, setScrollEnabled] = useState(true);
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
          listRef={ref}
          setScrollEnabled={setScrollEnabled}
          intensity={intensity}
          holdMenuRef={holdMenuRef}
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
        listRef={ref}
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
        ref={ref}
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
        scrollEnabled={scrollEnabled}
        keyboardShouldPersistTaps="always"
        onScrollBeginDrag={Keyboard.dismiss}
        removeClippedSubviews={true}
        // maxToRenderPerBatch={4}
        // // windowSize={8}
        initialNumToRender={10}
        scrollEventThrottle={16}
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

function arePropsEqual(prevProps, nextProps) {
  return (
    prevProps.color === nextProps.color &&
    prevProps.data === nextProps.data &&
    prevProps.theme === nextProps.theme &&
    prevProps.showScrollToButton === nextProps.showScrollToButton &&
    prevProps.inputOffset === nextProps.inputOffset &&
    prevProps.editMessage === nextProps.editMessage &&
    prevProps.regen === nextProps.regen &&
    prevProps.listRef === nextProps.listRef &&
    prevProps.editMessageHeight === nextProps.editMessageHeight &&
    prevProps.intensity === nextProps.intensity &&
    prevProps.holdMenuRef === nextProps.holdMenuRef
  );
}
export default MessageList;
