import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent, HoldPreview } from "../components";
import { ChatScreen } from "./ChatScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";
import { TouchableOpacity } from "react-native";
import { useRef, useState } from "react";
import { useSharedValue } from "react-native-reanimated";

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
  const [origin, setOrigin] = useState({ x: 0, y: 0, width: 0, height: 0 });

  const openHoldPreview = (layout) => {
    setOrigin({
      x: layout.x,
      y: layout.y,
      width: layout.width,
      height: layout.height,
    });
    showPreview.value = true;
    translateX.value = 0;
    translateY.value = 0;
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
            />
          )}
          initialRouteName="Chat"
          screenOptions={{
            headerShown: false,
            swipeEdgeWidth: 60,
            drawerStyle: {
              backgroundColor: theme.drawerContent.backgroundColor,
            },
            // overlayColor: theme.drawerContent.overlayColor,
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
              />
            )}
          </Drawer.Screen>
        </Drawer.Navigator>
        <HoldPreview
          showPreview={showPreview}
          translateX={translateX}
          translateY={translateY}
          origin={origin}
        />
      </PortalProvider>
    </GestureHandlerRootView>
  );
};
