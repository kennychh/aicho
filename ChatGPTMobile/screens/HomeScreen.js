import { createDrawerNavigator } from "@react-navigation/drawer";
import {
  ConfirmDeleteChatModal,
  DrawerContent,
  HoldPreview,
} from "../components";
import { ChatScreen } from "./ChatScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";
import { Dimensions, TouchableOpacity } from "react-native";
import { useRef, useState } from "react";
import { useSharedValue } from "react-native-reanimated";
import * as Clipboard from "expo-clipboard";

const Drawer = createDrawerNavigator();

export const HomeScreen = ({
  chats,
  setChatIndex,
  chatIndex,
  setChats,
  setDeleteChat,
  chatTitles,
  setChatTitles,
  setInput,
  setEditMessage,
  theme,
  setTheme,
  darkModeModalizeRef,
  clearConversation,
  input,
  editMessage,
  apiKey,
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
  setChatDateCreated,
}) => {
  const showPreview = useSharedValue(false);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const showHoldMenu = useSharedValue(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [holdMenuData, setHoldMenuData] = useState();
  const [confirmDeleteChatIndex, setConfirmDeleteChatIndex] = useState(0);
  const confirmDeleteChatVisible = useSharedValue(false);
  const [previewData, setPreviewData] = useState(chats[0].slice(0, 10));
  const [origin, setOrigin] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isHeaderEditable, setIsHeaderEditable] = useState(false);
  const windowWidth = Dimensions.get("window").width;
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
              chats={chats}
              setChatIndex={setChatIndex}
              chatIndex={chatIndex}
              setChats={setChats}
              setDeleteChat={setDeleteChat}
              chatTitles={chatTitles}
              setChatTitles={setChatTitles}
              setInput={setInput}
              setEditMessage={setEditMessage}
              theme={theme}
              setTheme={setTheme}
              darkModeModalizeRef={darkModeModalizeRef}
              confirmDeleteVisible={confirmDeleteVisible}
              openHoldPreview={openHoldPreview}
              holdPreviewFunctions={holdPreviewFunctions}
              setChatDateCreated={setChatDateCreated}
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
                chats={chats}
                index={chatIndex}
                chatIndex={chatIndex}
                clearConversation={clearConversation}
                setChats={setChats}
                chatTitles={chatTitles}
                setChatTitles={setChatTitles}
                input={input}
                setInput={setInput}
                editMessage={editMessage}
                setEditMessage={setEditMessage}
                theme={theme}
                apiKey={apiKey}
                keyChanged={keyChanged}
                setKeyChanged={setKeyChanged}
                timeout={timeout}
                model={model}
                maxTokens={maxTokens}
                color={color}
                retainContext={retainContext}
                temperature={temperature}
                presencePenalty={presencePenalty}
                frequencyPenalty={frequencyPenalty}
                holdMenuRef={holdMenuRef}
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
      </PortalProvider>
    </GestureHandlerRootView>
  );
};
