import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent, HoldPreview } from "../components";
import { ChatScreen } from "./ChatScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";
import { TouchableOpacity } from "react-native";
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
  setConfirmDeleteVisible,
  temperature,
  presencePenalty,
  frequencyPenalty,
  holdMenuRef,
}) => {
  const showPreview = useSharedValue(false);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const showHoldMenu = useSharedValue(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [holdMenuData, setHoldMenuData] = useState();
  const [previewData, setPreviewData] = useState(chats[0].slice(0, 10));
  const [origin, setOrigin] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [isHeaderEditable, setIsHeaderEditable] = useState(false);
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
      clearConversation(index);
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
              setConfirmDeleteVisible={setConfirmDeleteVisible}
              openHoldPreview={openHoldPreview}
              holdPreviewFunctions={holdPreviewFunctions}
            />
          )}
          initialRouteName="Chat"
          screenOptions={{
            headerShown: false,
            swipeEdgeWidth: 60,
            drawerStyle: {
              backgroundColor: theme.drawerContent.backgroundColor,
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
      </PortalProvider>
    </GestureHandlerRootView>
  );
};
