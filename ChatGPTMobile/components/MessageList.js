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
  setRegen,
  setRetry,
  setError,
  regen,
  showScrollToButton,
  setShowScrollToButton,
  intensity,
  showEditMessage,
  setShowEditMessage,
}) => {
  const { theme, editMessage, color, chatIndex } = useContext(AppContext);
  const [editMessageHeight, setEditMessageHeight] = useState(0);
  const ref = useRef();
  const insets = useSafeAreaInsets();
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const memoizedColor = useMemo(() => color, [color]);
  const memoizedTheme = useMemo(() => theme, [theme]);
  const [page, setPage] = useState(1);
  const PAGE_LIMIT = 10;
  const pageData = useMemo(
    () => (data ? data.slice(0, PAGE_LIMIT * page) : []),
    [data, page]
  );
  console.log("messagelist");
  const renderItem = useCallback(
    ({ item, index }) => {
      return (
        <Message
          item={item}
          index={index}
          setRegen={setRegen}
          setRetry={setRetry}
          setError={setError}
          regen={regen}
          theme={memoizedTheme}
          color={memoizedColor}
          listRef={ref}
          setScrollEnabled={setScrollEnabled}
          intensity={intensity}
          setShowEditMessage={setShowEditMessage}
        />
      );
    },
    [memoizedColor, memoizedTheme]
  );

  const keyExtractor = (item, index) => item?.result?.id || index;

  const onEndReached = () => {
    if (pageData.length < data.length) {
      setPage((oldPage) => oldPage + 1);
    }
  };

  useEffect(() => {
    setPage(1);
  }, [chatIndex]);
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
        inputOffset={inputOffset}
        setEditMessageHeight={setEditMessageHeight}
        showEditMessage={showEditMessage}
        setShowEditMessage={setShowEditMessage}
      />
      <FlatList
        ref={ref}
        data={pageData}
        indicator
        onScroll={(event) => {
          y = event.nativeEvent.contentOffset.y;
          if (y > 144 && !showScrollToButton) {
            setShowScrollToButton(true);
          } else if (y <= 144 && showScrollToButton) {
            setShowScrollToButton(false);
          }
        }}
        onEndReachedThreshold={0}
        onEndReached={onEndReached}
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
          paddingTop: !!showEditMessage ? 8 : inputOffset + 8,
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
    prevProps.regen === nextProps.regen &&
    prevProps.editMessageHeight === nextProps.editMessageHeight &&
    prevProps.intensity === nextProps.intensity &&
    prevProps.holdMenuRef === nextProps.holdMenuRef &&
    prevProps.showEditMessage === nextProps.showEditMessage
  );
}
export default memo(MessageList, arePropsEqual);
