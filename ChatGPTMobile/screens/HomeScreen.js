import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "../components";
import { ChatScreen } from "./ChatScreen";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PortalProvider } from "@gorhom/portal";

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
      </PortalProvider>
    </GestureHandlerRootView>
  );
};
