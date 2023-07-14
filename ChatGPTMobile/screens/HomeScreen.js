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
import { useContext, useRef, useState } from "react";
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
    setChats,
    setDeleteChat,
    chatDetails,
    setChatDetails,
    setInput,
    setEditMessage,
    theme,
    setTheme,
    darkModeModalizeRef,
    clearConversation,
    input,
    editMessage,
    key,
    keyChanged,
    setKeyChanged,
    timeout,
    model,
    maxTokens,
    color,
    retainContext,
    confirmDeleteVisible,
    temperature,
    presencePenalty,
    frequencyPenalty,
    holdMenuRef,
  } = useContext(AppContext);
  const showPreview = useSharedValue(false);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const showHoldMenu = useSharedValue(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [holdMenuData, setHoldMenuData] = useState();
  const [confirmDeleteChatIndex, setConfirmDeleteChatIndex] = useState(0);
  const confirmDeleteChatVisible = useSharedValue(false);
  const panModalVisible = useSharedValue(false);
  const bottomSheetRef = useRef(null);
  const [previewData, setPreviewData] = useState(chats[0].slice(0, 10));
  const [origin, setOrigin] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isHeaderEditable, setIsHeaderEditable] = useState(false);
  const windowWidth = Dimensions.get("window").width;

  const MAX_CHATS_SHOWN = 10;
  const cutOffNum =
    chatDetails.length <= MAX_CHATS_SHOWN
      ? 0
      : chatDetails.length - MAX_CHATS_SHOWN;
  const cutOffChatDetailsByMonths = getMonthsAgo(chatDetails, cutOffNum);
  const stickyHeadersData = getMonthsAgoStr(
    Object.keys(cutOffChatDetailsByMonths)
  );
  const drawerChatData = Object.values(cutOffChatDetailsByMonths);
  const openHoldPreview = (layout, title, data, holdMenuData) => {
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
      const chatTexts = chats[index]
        .map((chat) => chat.result?.text + "*#")
        .reverse()
        .toString()
        .split("*#,")
        .join("\n\n")
        .replace("*#", "");
      Clipboard.setStringAsync(chatTexts);
    },
    editTitle: (index, navigation) => {
      setChatIndex(index);
      setInput("");
      setEditMessage(null);
      setIsHeaderEditable(true);
      navigation.closeDrawer();
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
          theme={theme}
          title={previewTitle}
          data={previewData}
          color={color}
        />
        <ConfirmDeleteChatModal
          onPress={() => {
            clearConversation(confirmDeleteChatIndex);
          }}
          theme={theme}
          visible={confirmDeleteChatVisible}
        ></ConfirmDeleteChatModal>
        <ChatHistoryModal bottomSheetRef={bottomSheetRef} theme={theme} />
      </PortalProvider>
    </GestureHandlerRootView>
  );
};
