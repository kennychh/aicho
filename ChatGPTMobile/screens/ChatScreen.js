import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  View,
  Keyboard,
} from "react-native";
import { useState, useEffect, useRef } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  Header,
  MessageList,
  Input,
  MenuModal,
  MessageModal,
} from "../components";
import { getTheme } from "../theme";

export const ChatScreen = ({
  navigation,
  chats,
  index,
  chatIndex,
  clearConversation,
  setChats,
  chatTitles,
  setChatTitles,
  input,
  setInput,
  editMessage,
  setEditMessage,
  theme,
  apiKey,
  keyChanged,
  setKeyChanged,
  timeout,
  model,
  maxTokens,
  color,
  retainContext,
}) => {
  const API_URL = "https://chatgpt-api-blue.vercel.app/api";
  const result = chats[index];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [message, setMessage] = useState(null);
  const [retry, setRetry] = useState(null);
  const [regen, setRegen] = useState(false);
  const [isResultValid, setResultValid] = useState(false);
  const [inputHeight, setInputHeight] = useState(0);
  const [isHeaderEditable, setIsHeaderEditable] = useState(false);
  const modalizeRef = useRef(null);
  const messageModalizeRef = useRef(null);
  const textInputRef = useRef(null);
  const headerTextInputRef = useRef(null);

  const onLayout = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setInputHeight(height);
  };

  const onOpen = (modalizeRef) => {
    modalizeRef.current?.open();
  };

  const onClose = (modalizeRef) => {
    modalizeRef.current?.close();
  };

  const removeData = () => {
    clearConversation(chatIndex);
  };

  useEffect(() => {
    if (input.replace(/\s+/g, "") != "") {
      setResultValid(true);
    } else {
      setResultValid(false);
    }
  }, [input]);

  useEffect(() => {
    if (message) {
      onOpen(messageModalizeRef);
    }
  }, [message]);

  useEffect(() => {
    const errorFound = chats[chatIndex][0]?.isError;
    if (errorFound != error) {
      setError(errorFound);
    }
  }, [chats, chatIndex]);

  useEffect(() => {
    if (retry != null) {
      setChats((oldResult) => [
        ...oldResult?.slice(0, index),
        [
          ...oldResult[index].filter(
            (message) => message?.result?.id !== retry?.result?.id
          ),
          ...oldResult?.slice(index + 1),
        ],
      ]);
      onSubmit();
      setRetry(null);
    }
  }, [retry]);

  useEffect(() => {
    if (regen) {
      onSubmit();
      setRegen(false);
    }
  }, [regen]);

  useEffect(() => {
    if (isHeaderEditable) {
      headerTextInputRef.current.focus();
    }
  }, [isHeaderEditable]);

  useEffect(() => {
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setIsHeaderEditable(false); // or some other action
        if (chatTitles[chatIndex] == "") {
          setChatTitles((oldChatTitles) => [
            ...oldChatTitles.slice(0, chatIndex),
            "New chat",
            ...oldChatTitles.slice(chatIndex + 1),
          ]);
        }
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, [chatTitles]);

  const generateInputId = () => {
    const char =
      "AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz1234567890";
    const random = Array.from(
      { length: 6 },
      () => char[Math.floor(Math.random() * char.length)]
    );
    const randomString = random.join("");
    return randomString;
  };

  const getResult = (result) => {
    const editMessageIndex = editMessage
      ? result.findIndex(
          (message) => message.result?.id == editMessage?.result?.id
        )
      : 0;
    if (regen && result?.length > 1) {
      return result[1];
    } else if (retry && result?.length > 1) {
      return result[1];
    } else if (editMessage != null && editMessageIndex >= 1) {
      return result[editMessageIndex + 1];
    }
    return result[0];
  };

  const getInput = (res) => {
    const inputId = generateInputId();
    if (regen) {
      return res;
    } else if (retry != null) {
      return retry;
    } else if (editMessage != null) {
      return {
        result: {
          text: input,
          id: editMessage?.result?.id,
        },
        isInput: true,
        isError: false,
      };
    }
    return {
      result: {
        text: input,
        id: inputId,
      },
      isInput: true,
    };
  };

  const onSubmit = async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const editMessageIndex = editMessage
      ? result.findIndex(
          (message) => message.result?.id == editMessage?.result?.id
        )
      : 0;
    const res = getResult(result);
    const inputText = getInput(res);
    if (editMessage != null) {
      setChats((oldResult) => [
        ...oldResult?.slice(0, index),
        [inputText, ...oldResult[index].slice(editMessageIndex + 1)],
        ...oldResult?.slice(index + 1),
      ]);
    } else if (!regen) {
      setChats((oldResult) => [
        ...oldResult?.slice(0, index),
        [inputText, ...oldResult[index]],
        ...oldResult?.slice(index + 1),
      ]);
    }
    const regenId = result?.length > 2 ? result[2]?.result?.id : null;
    setInput("");
    try {
      const bearer = `Bearer ${apiKey}`;
      const response = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
        body: JSON.stringify({
          input:
            retry != null
              ? retry.result?.text
              : regen
              ? inputText.result?.text
              : input,
          conversationId: res?.result?.conversationId,
          id: regen ? regenId : res?.result?.id,
          keyChanged: keyChanged,
          timeout: parseInt(timeout),
          model: model,
          maxTokens: parseInt(maxTokens),
          retainContext: retainContext,
        }),
      });
      const data = await response.json();
      setKeyChanged(false);
      if (data.error) {
        const errorInputText = {
          ...inputText,
          isError: true,
        };
        if (!regen) {
          setChats((oldResult) => [
            ...oldResult?.slice(0, index),
            [errorInputText, ...oldResult[index].slice(1)],
            ...oldResult?.slice(index + 1),
          ]);
        } else {
          setChats((oldResult) => [
            ...oldResult?.slice(0, index),
            [
              { ...oldResult[index][0], isError: true },
              inputText,
              ...oldResult[index].slice(2),
            ],
            ...oldResult?.slice(index + 1),
          ]);
        }
        setError(true);
      } else {
        if (!error && regen) {
          setChats((oldResult) => [
            ...oldResult?.slice(0, index),
            [
              data,
              { ...oldResult[index][1], isError: false },
              ...oldResult[index].slice(2),
            ],
            ...oldResult?.slice(index + 1),
          ]);
        } else if (regen) {
          setChats((oldResult) => [
            ...oldResult?.slice(0, index),
            [
              data,
              { ...oldResult[index][1], isError: false },
              ...oldResult[index],
            ],
            ...oldResult?.slice(index + 1),
          ]);
        } else {
          setChats((oldResult) => [
            ...oldResult?.slice(0, index),
            [data, ...oldResult[index]],
            ...oldResult?.slice(index + 1),
          ]);
        }
      }
    } catch (e) {
      setKeyChanged(false);
      Alert.alert("Error occured", e.message);
      const errorInputText = {
        ...inputText,
        isError: true,
      };
      if (!regen) {
        setChats((oldResult) => [
          ...oldResult?.slice(0, index),
          [errorInputText, ...oldResult[index].slice(1)],
          ...oldResult?.slice(index + 1),
        ]);
      } else {
        setChats((oldResult) => [
          ...oldResult?.slice(0, index),
          [
            { ...oldResult[index][0], isError: true },
            inputText,
            ...oldResult[index].slice(2),
          ],
          ...oldResult?.slice(index + 1),
        ]);
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container(theme)}
        edges={["top", "left", "right", "bottom"]}
      >
        <StatusBar
          animated={true}
          style={theme === getTheme("dark") ? "light" : "dark"}
        />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.componentContainer}
        >
          <Header
            onOpen={onOpen}
            modalizeRef={modalizeRef}
            navigation={navigation}
            headerTitle={`${chatTitles[chatIndex]}`}
            textInputRef={headerTextInputRef}
            setChatTitles={setChatTitles}
            chatTitles={chatTitles}
            chatIndex={chatIndex}
            isHeaderEditable={isHeaderEditable}
            setIsHeaderEditable={setIsHeaderEditable}
            theme={theme}
          />
          <View style={{ flex: 1, overflow: "hidden" }}>
            <MessageList
              data={result}
              inputOffset={inputHeight}
              setMessage={setMessage}
              theme={theme}
              color={color}
            />
            <Input
              textInputRef={textInputRef}
              input={input}
              onSubmit={onSubmit}
              loading={loading}
              isResultValid={isResultValid}
              onLayout={onLayout}
              height={inputHeight}
              error={error}
              result={result}
              editMessage={editMessage}
              setRegen={setRegen}
              setError={setError}
              setRetry={setRetry}
              setEditMessage={setEditMessage}
              setInput={setInput}
              theme={theme}
              color={color}
            />
          </View>
        </KeyboardAvoidingView>
        <MenuModal
          deleteConvo={removeData}
          modalizeRef={modalizeRef}
          onClose={onClose}
          setChats={setChats}
          headerTextInputRef={headerTextInputRef}
          setIsHeaderEditable={setIsHeaderEditable}
          theme={theme}
        />
        <MessageModal
          message={message}
          modalizeRef={messageModalizeRef}
          onClose={onClose}
          setMessage={setMessage}
          setEditMessage={setEditMessage}
          textInputRef={textInputRef}
          setInput={setInput}
          theme={theme}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};
const styles = StyleSheet.create({
  container: (theme) => ({
    backgroundColor: theme.backgroundColor,
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  }),
  componentContainer: {
    width: "100%",
    flex: 1,
  },
});
