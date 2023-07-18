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
import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
  useContext,
} from "react";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import {
  Header,
  Input,
  BottomToast,
  ScrollToButton,
  PanModal,
  ChatMenuModal,
} from "../components";
import MessageList from "../components/MessageList";
import * as Device from "expo-device";
import { getTheme } from "../theme";
import { useSharedValue } from "react-native-reanimated";
import * as Clipboard from "expo-clipboard";
import { AppContext } from "../context";

export const ChatScreen = ({
  navigation,
  isHeaderEditable,
  setIsHeaderEditable,
  deleteChatFromModal,
}) => {
  const {
    chats,
    chatIndex,
    handleChats,
    chatDetails,
    setChatDetails,
    theme,
    input,
    editMessage,
    key,
    keyChanged,
    setKeyChanged,
    timeout,
    model,
    maxTokens,
    retainContext,
    temperature,
    presencePenalty,
    frequencyPenalty,
  } = useContext(AppContext);
  const API_URL = "https://chatgpt-api-blue.vercel.app/api";
  const result =
    chats.current && chats.current.length >= chatIndex
      ? chats?.current[chatIndex]
      : [[{}]];
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [showBottomToast, setShowBottomToast] = useState(false);
  // const [message, setMessage] = useState(null);
  const [retry, setRetry] = useState(null);
  const [regen, setRegen] = useState(false);
  const [inputHeight, setInputHeight] = useState(0);
  const [deviceType, setDeviceType] = useState(0);
  const modalizeRef = useRef(null);
  const messageModalizeRef = useRef(null);
  const textInputRef = useRef(null);
  const headerTextInputRef = useRef(null);
  const [showEditMessage, setShowEditMessage] = useState(false);
  const listRef = useRef(null);
  const [showScrollToButton, setShowScrollToButton] = useState(false);
  const panModalVisible = useSharedValue(false);
  const headerTitle = useMemo(
    () =>
      typeof chatDetails[chatIndex] === "string" ||
      typeof chatDetails[chatIndex] === "undefined"
        ? chatDetails[chatIndex]
        : chatDetails[chatIndex][0],
    [chatDetails, chatIndex]
  );

  const onLayout = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setInputHeight(height);
  };

  const onOpen = (modalizeRef) => {
    modalizeRef.current?.open();
  };

  const ChatMenuModalOnPressOptions = {
    copy: () => {
      panModalVisible.value = false;
      const chatTexts = result
        .map((chat) => chat.result?.text + "*#")
        .reverse()
        .toString()
        .split("*#,")
        .join("\n\n")
        .replace("*#", "");
      Clipboard.setStringAsync(chatTexts);
    },
    rename: () => {
      panModalVisible.value = false;
      setTimeout(() => {
        setIsHeaderEditable(true);
      }, 200);
    },
    delete: () => {
      panModalVisible.value = false;
      setTimeout(() => {
        deleteChatFromModal();
      }, 200);
    },
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

  // useEffect(() => {
  //   if (message) {
  //     onOpen(messageModalizeRef);
  //   }
  // }, [message]);

  // useEffect(() => {
  //   const errorFound = chats?.current[chatIndex][0]?.isError;
  //   if (errorFound != error) {
  //     setError(errorFound);
  //   }
  // }, [chats, chatIndex]);

  useEffect(() => {
    if (retry != null) {
      toggleExpandMessage();
      handleChats([
        ...chats?.current?.slice(0, chatIndex),
        [
          ...chats?.current[chatIndex].filter(
            (message) => message?.result?.id !== retry?.result?.id
          ),
        ],
        ...chats?.current?.slice(chatIndex + 1),
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
      const editMessageIndex = editMessage?.current
        ? result.findIndex(
            (message) => message.result?.id == editMessage?.current?.result?.id
          )
        : 0;
      if (regen && result?.length > 1) {
        return result[regenIndex + 1];
      } else if (retry && result?.length > 1) {
        return result[1];
      } else if (editMessage?.current != null && editMessageIndex >= 1) {
        return result[editMessageIndex + 1];
      }
      return result[0];
    },
    [editMessage?.current, retry, regen]
  );

  const getInput = useCallback(
    (res) => {
      const inputId = generateInputId();
      if (regen) {
        return res;
      } else if (retry != null) {
        return retry;
      } else if (editMessage?.current != null) {
        return {
          result: {
            text: input,
            id: editMessage?.current?.result?.id,
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
    [input, editMessage?.current, regen, retry]
  );

  const onSubmit = useCallback(async () => {
    if (loading) {
      return;
    }
    setLoading(true);
    const editMessageIndex = editMessage?.current
      ? result.findIndex(
          (message) => message.result?.id == editMessage?.current?.result?.id
        )
      : -1;
    const regenIndex = regen
      ? result.findIndex((message) => message.result?.id == regen?.result?.id)
      : -1;
    const res = getResult(result, regenIndex);
    const inputText = getInput(res);
    const shouldCreateTitle =
      chats?.current[chatIndex].length == 0 ||
      editMessageIndex + 1 == chats?.current[chatIndex].length ||
      regenIndex + 2 == chats?.current[chatIndex].length;
    if (editMessage?.current != null) {
      toggleExpandMessage();
      handleChats([
        ...chats?.current?.slice(0, chatIndex),
        [inputText, ...chats?.current[chatIndex].slice(editMessageIndex + 1)],
        ...chats?.current?.slice(chatIndex + 1),
      ]);
    } else if (!regen) {
      toggleExpandMessage();
      handleChats([
        ...chats?.current?.slice(0, chatIndex),
        [inputText, ...chats?.current[chatIndex]],
        ...chats?.current?.slice(chatIndex + 1),
      ]);
    } else if (regen) {
      toggleExpandMessage();
      handleChats([
        ...chats?.current?.slice(0, chatIndex),
        [...chats?.current[chatIndex].slice(regenIndex + 1)],
        ...chats?.current?.slice(chatIndex + 1),
      ]);
    } else if (retry != null) {
      toggleExpandMessage();
      handleChats([
        ...chats?.current?.slice(0, chatIndex),
        [
          ...chats?.current[chatIndex].filter(
            (message) => message?.result?.id !== retry?.result?.id
          ),
          ...chats?.current?.slice(chatIndex + 1),
        ],
      ]);
    }
    const regenId =
      result?.length > 2 ? result[regenIndex + 2]?.result?.id : null;
    try {
      const bearer = `Bearer ${key}`;
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
          handleChats([
            ...chats?.current?.slice(0, chatIndex),
            [errorInputText, ...chats?.current[chatIndex].slice(1)],
            ...chats?.current?.slice(chatIndex + 1),
          ]);
        } else {
          handleChats([
            ...chats?.current?.slice(0, chatIndex),
            [
              { ...chats?.current[chatIndex][0], isError: true },
              ...chats?.current[chatIndex].slice(1),
            ],
            ...chats?.current?.slice(chatIndex + 1),
          ]);
        }
        setError(true);
      } else {
        toggleExpandMessage();
        handleChats([
          ...chats?.current?.slice(0, chatIndex),
          [data, ...chats?.current[chatIndex]],
          ...chats?.current?.slice(chatIndex + 1),
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
        handleChats([
          ...chats?.current?.slice(0, chatIndex),
          [errorInputText, ...chats?.current[chatIndex].slice(1)],
          ...chats?.current?.slice(chatIndex + 1),
        ]);
      } else {
        handleChats([
          ...chats?.current?.slice(0, chatIndex),
          [
            { ...chats?.current[chatIndex][0], isError: true },
            ...chats?.current[chatIndex].slice(1),
          ],
          ...chats?.current?.slice(chatIndex + 1),
        ]);
      }
      setError(true);
    } finally {
      setLoading(false);
    }
  }, [chats, input, regen, retry, chatIndex, editMessage, chatDetails]);
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
              setRegen={setRegen}
              setRetry={setRetry}
              setError={setError}
              listRef={listRef}
              showScrollToButton={showScrollToButton}
              setShowScrollToButton={setShowScrollToButton}
              showEditMessage={showEditMessage}
              setShowEditMessage={setShowEditMessage}
            />
            <Input
              textInputRef={textInputRef}
              onSubmit={onSubmit}
              loading={loading}
              onLayout={onLayout}
              height={inputHeight}
              error={error}
              result={result}
              setRegen={setRegen}
              setError={setError}
              setRetry={setRetry}
              listRef={listRef}
              showEditMessage={showEditMessage}
              setShowEditMessage={setShowEditMessage}
            />
          </View>
          <Header
            onOpen={onOpen}
            modalizeRef={modalizeRef}
            panModalVisible={panModalVisible}
            navigation={navigation}
            headerTitle={`${headerTitle}`}
            textInputRef={headerTextInputRef}
            isHeaderEditable={isHeaderEditable}
            setIsHeaderEditable={setIsHeaderEditable}
          />
        </KeyboardAvoidingView>
        <BottomToast isEnabled={showBottomToast} />
        <ChatMenuModal
          visible={panModalVisible}
          onPressOptions={ChatMenuModalOnPressOptions}
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
