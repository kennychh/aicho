import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { PanModal } from "./PanModal";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
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

export const ChatHistoryModal = ({ bottomSheetRef }) => {
  const insets = useSafeAreaInsets();
  const { theme } = useContext(AppContext);
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

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      snapPoints={snapPoints}
      style={{ width: "100%" }}
      backgroundStyle={{ backgroundColor: theme.onBackgroundColor }}
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
        data={data}
        scrollEventThrottle={16}
        renderItem={({ index }) => {
          return (
            <View style={{ backgroundColor: "transparent" }}>
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
