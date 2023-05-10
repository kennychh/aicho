import { createDrawerNavigator } from "@react-navigation/drawer";
import { DrawerContent } from "../components";
import { ChatScreen } from "./ChatScreen";

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
  confirmDeleteConvosModalizeRef,
  clearConversation,
  input,
  editMessage,
}) => {
  return (
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
          confirmDeleteConvosModalizeRef={confirmDeleteConvosModalizeRef}
        />
      )}
      initialRouteName="Chat"
      screenOptions={{
        headerShown: false,
        drawerStyle: {
          backgroundColor: theme.drawerContent.backgroundColor,
        },
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
          />
        )}
      </Drawer.Screen>
    </Drawer.Navigator>
  );
};
