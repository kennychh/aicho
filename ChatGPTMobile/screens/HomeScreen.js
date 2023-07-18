import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  ChatHistoryModal,
  ConfirmDeleteChatModal,
  HoldPreview,
} from "../components";
import DrawerContent from "../components/DrawerContent";
import { ChatScreen } from "./ChatScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";
import { Dimensions, TouchableOpacity } from "react-native";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import * as Clipboard from "expo-clipboard";
import { getMonthsAgo, getMonthsAgoStr } from "../helpers/getTimeCreated";
import { AppContext } from "../context";

const Drawer = createDrawerNavigator();

export const HomeScreen = () => {
  const {
    chats,
    setChatIndex,
    chatIndex,
    chatDetails,
    setInput,
    handleEditMessage,
    theme,
    clearConversation,
  } = useContext(AppContext);
  const showPreview = useSharedValue(false);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const showHoldMenu = useSharedValue(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [holdMenuData, setHoldMenuData] = useState();
  const [confirmDeleteChatIndex, setConfirmDeleteChatIndex] = useState(0);
  const confirmDeleteChatVisible = useSharedValue(false);
  const isFromModal = useSharedValue(false);
  const bottomSheetRef = useRef(null);
  const [previewData, setPreviewData] = useState();
  const [origin, setOrigin] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isHeaderEditable, setIsHeaderEditable] = useState(false);
  const windowWidth = Dimensions.get("window").width;

  const MAX_CHATS_SHOWN = 10;
  const cutOffNum = useMemo(
    () =>
      chatDetails.length <= MAX_CHATS_SHOWN
        ? 0
        : chatDetails.length - MAX_CHATS_SHOWN,
    [chatDetails]
  );
  const cutOffChatDetailsByMonths = useMemo(
    () => getMonthsAgo(chatDetails, cutOffNum),
    [chatDetails, cutOffNum]
  );

  const stickyHeadersData = useMemo(
    () => getMonthsAgoStr(Object.keys(cutOffChatDetailsByMonths)),
    [cutOffChatDetailsByMonths]
  );
  const drawerChatData = useMemo(
    () => Object.values(cutOffChatDetailsByMonths),
    [cutOffChatDetailsByMonths]
  );
  const openHoldPreview = (
    layout,
    title,
    data,
    holdMenuData,
    fromModal = false
  ) => {
    isFromModal.value = fromModal;
    setOrigin({
      x: layout.x,
      y: layout.y,
      width: layout.width,
      height: layout.height,
    });
    setPreviewTitle(title);
    setPreviewData(data);
    setHoldMenuData(holdMenuData);
    showHoldMenu.value = true;
    showPreview.value = true;
    translateX.value = 0;
    translateY.value = 0;
  };

  const holdPreviewFunctions = {
    deleteChat: (index) => {
      setConfirmDeleteChatIndex(index);
      confirmDeleteChatVisible.value = true;
    },
    copyChat: (index) => {
      const chatTexts = chats.current
        ? chats?.current[index]
            .map((chat) => chat.result?.text + "*#")
            .reverse()
            .toString()
            .split("*#,")
            .join("\n\n")
            .replace("*#", "")
        : "";
      Clipboard.setStringAsync(chatTexts);
      bottomSheetRef?.current?.close();
    },
    editTitle: (index) => {
      setChatIndex(index);
      setInput("");
      handleEditMessage(null);
      setIsHeaderEditable(true);
      bottomSheetRef?.current?.close();
    },
  };

  const deleteChatFromModal = () => {
    setConfirmDeleteChatIndex(chatIndex);
    confirmDeleteChatVisible.value = true;
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <PortalProvider>
        <Drawer.Navigator
          drawerContent={(props) => (
            <DrawerContent
              props={props}
              openHoldPreview={openHoldPreview}
              holdPreviewFunctions={holdPreviewFunctions}
              bottomSheetRef={bottomSheetRef}
              stickyHeadersData={stickyHeadersData}
              drawerChatData={drawerChatData}
            />
          )}
          initialRouteName="Chat"
          screenOptions={{
            headerShown: false,
            swipeEdgeWidth: 60,
            drawerStyle: {
              backgroundColor: theme.drawerContent.backgroundColor,
              width: Math.round(windowWidth * 0.82),
            },
            overlayColor: theme.drawerContent.overlayColor,
          }}
        >
          <Drawer.Screen name="Chat">
            {(props) => (
              <ChatScreen
                {...props}
                isHeaderEditable={isHeaderEditable}
                setIsHeaderEditable={setIsHeaderEditable}
                deleteChatFromModal={deleteChatFromModal}
              />
            )}
          </Drawer.Screen>
        </Drawer.Navigator>
        <HoldPreview
          showPreview={showPreview}
          showHoldMenu={showHoldMenu}
          holdMenuData={holdMenuData}
          translateX={translateX}
          translateY={translateY}
          origin={origin}
          title={previewTitle}
          data={previewData}
          isFromModal={isFromModal}
        />
        <ConfirmDeleteChatModal
          onPress={() => {
            clearConversation(confirmDeleteChatIndex);
            bottomSheetRef?.current?.close();
          }}
          visible={confirmDeleteChatVisible}
        ></ConfirmDeleteChatModal>
        <ChatHistoryModal
          bottomSheetRef={bottomSheetRef}
          holdPreviewFunctions={holdPreviewFunctions}
          openHoldPreview={openHoldPreview}
        />
      </PortalProvider>
    </GestureHandlerRootView>
  );
};
