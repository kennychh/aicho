import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  View,
  Keyboard,
  Animated,
  LayoutAnimation,
} from "react-native";
import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  Header,
  Input,
  MenuModal,
  MessageModal,
  BottomToast,
  ScrollToButton,
} from "../components";
import MessageList from "../components/MessageList";
import * as Device from "expo-device";
import { getTheme } from "../theme";

export const ChatScreen = ({
  navigation,
  chats,
  index,
  chatIndex,
  clearConversation,
  setChats,
  chatDetails,
  setChatDetails,
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
  temperature,
  presencePenalty,
  frequencyPenalty,
  holdMenuRef,
  isHeaderEditable,
  setIsHeaderEditable,
  deleteChatFromModal,
}) => {
  const API_URL = "https://chatgpt-api-blue.vercel.app/api";
  const result = chats[index];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showBottomToast, setShowBottomToast] = useState(false);
  const [message, setMessage] = useState(null);
  const [retry, setRetry] = useState(null);
  const [regen, setRegen] = useState(false);
  const [isResultValid, setResultValid] = useState(false);
  const [inputHeight, setInputHeight] = useState(0);
  const [deviceType, setDeviceType] = useState(0);
  const modalizeRef = useRef(null);
  const messageModalizeRef = useRef(null);
  const textInputRef = useRef(null);
  const headerTextInputRef = useRef(null);
  const listRef = useRef(null);
  const [showScrollToButton, setShowScrollToButton] = useState(false);
  const [editMessageHeight, setEditMessageHeight] = useState(0);
  const headerTitle =
    typeof chatDetails[chatIndex] === "string" ||
    typeof chatDetails[chatIndex] === "undefined"
      ? chatDetails[chatIndex]
      : chatDetails[chatIndex][0];

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

  const toggleExpandMessage = () => {
    // listRef?.current?.prepareForLayoutAnimationRender();
    LayoutAnimation.configureNext({
      duration: 300,
      create: { type: "easeInEaseOut", property: "opacity" },
      update: { type: "spring", springDamping: 10 },
      delete: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.opacity,
        springDamping: 1,
        duration: 150,
      },
    });
  };

  useEffect(() => {
    Device.getDeviceTypeAsync().then((deviceType) => {
      setDeviceType(deviceType);
    });
  }, []);

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

  // useEffect(() => {
  //   const errorFound = chats[chatIndex][0]?.isError;
  //   if (errorFound != error) {
  //     setError(errorFound);
  //   }
  // }, [chats, chatIndex]);

  useEffect(() => {
    if (retry != null) {
      toggleExpandMessage();
      setChats((oldResult) => [
        ...oldResult?.slice(0, chatIndex),
        [
          ...oldResult[chatIndex].filter(
            (message) => message?.result?.id !== retry?.result?.id
          ),
        ],
        ...oldResult?.slice(chatIndex + 1),
      ]);
      onSubmit();
      setRetry(null);
    }
  }, [retry]);

  useEffect(() => {
    if (regen) {
      onSubmit();
      setRegen(null);
    }
  }, [regen]);

  useEffect(() => {
    if (error) {
      setShowBottomToast(true);
    } else {
      setShowBottomToast(false);
    }
  }, [error]);

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
        if (chatDetails[chatIndex] == "") {
          setChatDetails((oldChatTitles) => [
            ...oldChatTitles.slice(0, chatIndex),
            ["New chat", oldChatTitles[chatIndex][1]],
            ...oldChatTitles.slice(chatIndex + 1),
          ]);
        }
      }
    );

    return () => {
      keyboardDidHideListener.remove();
    };
  }, [chatDetails]);

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

  const getResult = useCallback(
    (result, regenIndex) => {
      const editMessageIndex = editMessage
        ? result.findIndex(
            (message) => message.result?.id == editMessage?.result?.id
          )
        : 0;
      if (regen && result?.length > 1) {
        return result[regenIndex + 1];
      } else if (retry && result?.length > 1) {
        return result[1];
      } else if (editMessage != null && editMessageIndex >= 1) {
        return result[editMessageIndex + 1];
      }
      return result[0];
    },
    [editMessage, retry, regen]
  );

  const getInput = useCallback(
    (res) => {
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
    },
    [input, editMessage, regen, retry]
  );

  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const editMessageIndex = editMessage
      ? result.findIndex(
          (message) => message.result?.id == editMessage?.result?.id
        )
      : -1;
    const regenIndex = regen
      ? result.findIndex((message) => message.result?.id == regen?.result?.id)
      : -1;
    const res = getResult(result, regenIndex);
    const inputText = getInput(res);
    const shouldCreateTitle =
      chats[index].length == 0 ||
      editMessageIndex + 1 == chats[index].length ||
      regenIndex + 2 == chats[index].length;
    if (editMessage != null) {
      toggleExpandMessage();
      setChats((oldResult) => [
        ...oldResult?.slice(0, index),
        [inputText, ...oldResult[index].slice(editMessageIndex + 1)],
        ...oldResult?.slice(index + 1),
      ]);
    } else if (!regen) {
      toggleExpandMessage();
      setChats((oldResult) => [
        ...oldResult?.slice(0, index),
        [inputText, ...oldResult[index]],
        ...oldResult?.slice(index + 1),
      ]);
    } else if (regen) {
      toggleExpandMessage();
      setChats((oldResult) => [
        ...oldResult?.slice(0, index),
        [...oldResult[index].slice(regenIndex + 1)],
        ...oldResult?.slice(index + 1),
      ]);
    } else if (retry != null) {
      toggleExpandMessage();
      setChats((oldResult) => [
        ...oldResult?.slice(0, chatIndex),
        [
          ...oldResult[chatIndex].filter(
            (message) => message?.result?.id !== retry?.result?.id
          ),
          ...oldResult?.slice(chatIndex + 1),
        ],
      ]);
    }
    const regenId =
      result?.length > 2 ? result[regenIndex + 2]?.result?.id : null;
    setInput("");
    try {
      const bearer = `Bearer ${apiKey}`;
      const responseInput =
        retry != null
          ? retry.result?.text
          : regen
          ? inputText.result?.text
          : input;
      const response = await fetch(`${API_URL}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: bearer,
        },
        body: JSON.stringify({
          input: responseInput.concat(
            shouldCreateTitle
              ? ". at the end of the response, make a title for this conversation in 24 characters or fewer with the format: 'CT:'."
              : ""
          ),
          conversationId: res?.result?.conversationId,
          id: regen ? regenId : res?.result?.id,
          keyChanged: keyChanged,
          timeout: parseInt(timeout),
          model: model,
          maxTokens: parseInt(maxTokens),
          retainContext: retainContext,
          temperature: parseFloat(temperature),
          presence_penalty: parseFloat(presencePenalty),
          frequency_penalty: parseFloat(frequencyPenalty),
        }),
      });
      let data = await response.json();
      console.log(chats[index]);
      const ctIndex = data?.result?.text.indexOf("CT:");
      let chatTitle =
        data?.result?.text.substring(ctIndex).substring(3).trimStart() ||
        "New chat";
      if (ctIndex == -1) {
        chatTitle = "New chat";
      } else if (chatTitle.slice(-1) === ".") {
        chatTitle = chatTitle.slice(0, -1);
      }
      if (ctIndex != -1) {
        data = {
          ...data,
          result: {
            ...data.result,
            text: data?.result?.text.slice(0, ctIndex).trim(),
          },
        };
      }
      setKeyChanged(false);
      if (data.error) {
        console.log(data.error);
        const errorInputText = {
          ...inputText,
          isError: true,
        };
        toggleExpandMessage();
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
              ...oldResult[index].slice(1),
            ],
            ...oldResult?.slice(index + 1),
          ]);
        }
        setError(true);
      } else {
        toggleExpandMessage();
        setChats((oldResult) => [
          ...oldResult?.slice(0, index),
          [data, ...oldResult[index]],
          ...oldResult?.slice(index + 1),
        ]);
      }
      if (shouldCreateTitle) {
        setChatDetails((oldChatTitles) => [
          ...oldChatTitles.slice(0, chatIndex),
          [chatTitle, oldChatTitles[chatIndex][1]],
          ...oldChatTitles.slice(chatIndex + 1),
        ]);
      }
    } catch (e) {
      setKeyChanged(false);
      console.log(e);
      const errorInputText = {
        ...inputText,
        isError: true,
      };
      toggleExpandMessage();
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
            ...oldResult[index].slice(1),
          ],
          ...oldResult?.slice(index + 1),
        ]);
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [chats, input, regen, retry, index, editMessage, chatDetails]);
  return (
    <SafeAreaProvider>
      <SafeAreaView
        style={styles.container(theme)}
        edges={["left", "right", "bottom"]}
      >
        <StatusBar
          animated={true}
          style={theme === getTheme("dark") ? "light" : "dark"}
        />
        <KeyboardAvoidingView
          enabled={deviceType != 2}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.componentContainer}
        >
          <View style={{ flex: 1, overflow: "hidden" }}>
            <MessageList
              data={result}
              inputOffset={inputHeight}
              editMessage={editMessage}
              setMessage={setMessage}
              setEditMessage={setEditMessage}
              setInput={setInput}
              setRegen={setRegen}
              setRetry={setRetry}
              setError={setError}
              theme={theme}
              color={color}
              listRef={listRef}
              showScrollToButton={showScrollToButton}
              setShowScrollToButton={setShowScrollToButton}
              setEditMessageHeight={setEditMessageHeight}
              editMessageHeight={editMessageHeight}
              holdMenuRef={holdMenuRef}
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
              listRef={listRef}
            />
          </View>
          <Header
            onOpen={onOpen}
            modalizeRef={modalizeRef}
            navigation={navigation}
            headerTitle={`${headerTitle}`}
            textInputRef={headerTextInputRef}
            setChatDetails={setChatDetails}
            chatDetails={chatDetails}
            chatIndex={chatIndex}
            isHeaderEditable={isHeaderEditable}
            setIsHeaderEditable={setIsHeaderEditable}
            theme={theme}
            color={color}
          />
        </KeyboardAvoidingView>
        <BottomToast theme={theme} isEnabled={showBottomToast} />
        <MenuModal
          deleteConvo={deleteChatFromModal}
          modalizeRef={modalizeRef}
          onClose={onClose}
          setChats={setChats}
          headerTextInputRef={headerTextInputRef}
          setIsHeaderEditable={setIsHeaderEditable}
          theme={theme}
          chatInfo={chats[index]}
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
