import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { PanModal } from "./PanModal";
import { useEffect, useMemo, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Copy, Delete, Edit2 } from "../icons";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { Divider } from "./Divider";

export const ChatHistoryModal = ({ visible, theme, onPressOptions }) => {
  const insets = useSafeAreaInsets();
  const windowHeight = Dimensions.get("window").height;
  const [scrollEnabled, setScrollEnabled] = useState(true);
  const [topReached, setTopReached] = useState(false);
  const flatListRef = useRef();
  const isFullHeight = useSharedValue(false);
  const translateY = useSharedValue(0);
  const animatedModalContainerStyle = useAnimatedStyle(() => {
    return {
      minHeight: 400,
    };
  });

  const modalContainerStyle = useMemo(
    () => [styles.modalContainerStyle(theme), animatedModalContainerStyle],
    [animatedModalContainerStyle]
  );
  const data = [...Array(50)];

  const modalContainer = (
    <Animated.View style={modalContainerStyle}>
      <FlatList
        ref={flatListRef}
        scrollEnabled={scrollEnabled}
        data={data}
        onScroll={(event) => {
          y = event.nativeEvent.contentOffset.y;
          if (topReached && y == 0 && isFullHeight.value) {
            setScrollEnabled(false);
          }
          if (y < 0 && scrollEnabled) {
            setTopReached(true);
          } else if (y > 0 && !scrollEnabled) {
            setScrollEnabled(true);
          }
        }}
        scrollEventThrottle={16}
        renderItem={({ index }) => {
          return (
            <View style={{ backgroundColor: "red" }}>
              <Text style={styles.text(theme)}>{index}</Text>
            </View>
          );
        }}
        style={{
          flex: 1,
          flexGrow: 1,
          // backgroundColor: "red",
          width: "100%",
        }}
      />
    </Animated.View>
  );
  return (
    <PanModal
      visible={visible}
      theme={theme}
      translateY={translateY}
      fullHeight={true}
      setScrollEnabled={setScrollEnabled}
      flatListRef={flatListRef}
      isFullHeight={isFullHeight}
      title="History"
    >
      {modalContainer}
    </PanModal>
  );
};

const styles = StyleSheet.create({
  handleStyle: (theme) => ({
    width: 40,
    height: 4,
    marginTop: 8,
    backgroundColor: theme.modal.handle.backgroundColor,
    borderRadius: "100%",
  }),
  modalContainerStyle: (theme) => ({
    // paddingHorizontal: 16,
    alignItems: "center",
    width: "100%",
    flex: 1,
  }),
  text: (theme) => ({
    fontSize: 16,
    lineHeight: 18,
    alignSelf: "center",
    fontWeight: "600",
    paddingTop: 32,
    paddingBottom: 16,
    color: theme.fontColor,
  }),
  modalOptionDivider: (theme) => ({
    width: "100%",
    height: 0.5,
    backgroundColor: theme.modal.divider.backgroundColor,
  }),
  modalOption: {
    width: "100%",
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  modalOptionsContainer: (theme) => ({
    marginTop: 32,
    backgroundColor: theme.modal.container.backgroundColor,
    width: "100%",
    borderRadius: 16,
  }),
});