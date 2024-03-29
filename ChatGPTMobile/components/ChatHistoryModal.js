import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { PanModal } from "./PanModal";
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Copy, Delete, Edit2 } from "../icons";
import { Text } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlatList } from "react-native-gesture-handler";
import { Divider } from "./Divider";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
} from "@gorhom/bottom-sheet";
import { AppContext } from "../context";
import { getMonthsAgo, getMonthsAgoStr } from "../helpers/getTimeCreated";
import ChatHistoryList from "./ChatHistoryList";

export const ChatHistoryModal = ({
  bottomSheetRef,
  holdPreviewFunctions,
  openHoldPreview,
}) => {
  const insets = useSafeAreaInsets();
  const { theme, chatDetails } = useContext(AppContext);
  const fullChatDetailsByMonths = useMemo(
    () => getMonthsAgo(chatDetails),
    [chatDetails]
  );
  const fullStickyHeadersData = getMonthsAgoStr(
    Object.keys(fullChatDetailsByMonths)
  );
  const fullChatHistoryData = useMemo(
    () => Object.values(fullChatDetailsByMonths),
    [fullChatDetailsByMonths]
  );
  const windowHeight = Dimensions.get("window").height;
  const snapPoints = useMemo(() => ["60%", windowHeight - insets.top], []);
  const flatListRef = useRef();
  const data = [...Array(50)];
  const BottomSheetBackground = ({ style }) => {
    return (
      <View
        style={[
          {
            borderRadius: 16,
          },
          { ...style },
        ]}
      />
    );
  };

  const renderItem = useCallback(({ item, index }) => {
    return (
      <ChatHistoryList
        item={item}
        index={index}
        stickyHeadersData={fullStickyHeadersData}
        holdPreviewFunctions={holdPreviewFunctions}
        bottomSheetRef={bottomSheetRef}
        openHoldPreview={openHoldPreview}
        paddingBottom={index == fullChatHistoryData.length - 1}
      />
    );
  });

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      style={{ width: "100%" }}
      backgroundStyle={{ backgroundColor: theme.modal.backgroundColor }}
      handleIndicatorStyle={{
        backgroundColor: theme.modal.handle.backgroundColor,
        width: 40,
      }}
      enablePanDownToClose
      backgroundComponent={(props) => <BottomSheetBackground {...props} />}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          opacity={1}
          enableTouchThrough={false}
          appearsOnIndex={0}
          disappearsOnIndex={-1}
          style={[
            { backgroundColor: theme.bottomModal.backgroundColor },
            StyleSheet.absoluteFillObject,
          ]}
        />
      )}
    >
      <Text style={styles.titleText(theme)}>History</Text>
      <Divider
        backgroundColor={theme.modal.divider.backgroundColor}
        spacerColor={theme.onBackgroundColor}
        style={{ width: "100%" }}
        marginHorizontal={0}
      />
      <BottomSheetFlatList
        ref={flatListRef}
        // bounces={false}
        data={fullChatHistoryData}
        scrollEventThrottle={16}
        renderItem={renderItem}
        style={{
          flex: 1,
          flexGrow: 1,
          // backgroundColor: "red",
          width: "100%",
        }}
        scrollIndicatorInsets={{
          top: 0,
          left: 0,
          bottom: insets.bottom + 16,
          right: 0,
        }}
      />
    </BottomSheet>
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
  titleText: (theme) => ({
    fontSize: 16,
    lineHeight: 18,
    alignSelf: "center",
    fontWeight: "600",
    paddingTop: 16,
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
