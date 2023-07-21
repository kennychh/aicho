import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Text,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import { BlurView } from "expo-blur";
import { useCallback, useContext, useEffect, useState } from "react";
import { Send, Refresh, Loading, Close } from "../icons";
import { getTheme } from "../theme";
import { AppContext } from "../context";
export const Input = ({
  textInputRef,
  onSubmit,
  loading,
  onLayout,
  height,
  result,
  setError,
  setRetry,
  showEditMessage,
  setShowEditMessage,
  forceUpdate,
}) => {
  const {
    handleInput,
    handleEditMessage,
    theme,
    editMessage,
    color,
    chatIndex,
  } = useContext(AppContext);

  const windowWidth = Dimensions.get("window").width;
  const [tempInput, setTempInput] = useState("");
  const isInputValid = (str) => {
    return str.replace(/\s+/g, "") != "";
  };
  const showRefreshIcon =
    (!isInputValid(tempInput) && !loading && result && result[0]?.isInput) ||
    result[0]?.isError;

  const showLoadingIcon = loading;
  const [editable, setEditable] = useState(result && !result[0]?.isError);
  const showInputIcon = () => {
    if (showLoadingIcon) {
      return <ActivityIndicator size="small" color="#fff" />;
    } else if (showEditMessage) {
      return <Send width="20px" height="20px" stroke="#fff" />;
    } else if (showRefreshIcon) {
      return <Refresh width="20px" height="20px" stroke="#fff" />;
    } else if (isInputValid(tempInput)) {
      return <Send width="20px" height="20px" stroke="#fff" />;
    }
    return <Send width="20px" height="20px" stroke="#fff" />;
  };
  const getInputIconColor = () => {
    if (
      showLoadingIcon ||
      (!isInputValid(tempInput) && result && !result[0]?.isError)
    ) {
      return { backgroundColor: theme.input.button.disabled.backgroundColor };
    }
    return {};
  };

  // useEffect(() => {
  //   if (tempInput == input) {
  //     getInputOnPress();
  //     // handleEditMessage(null);
  //     setTempInput("");
  //   }
  // }, [input]);

  useEffect(() => {
    if (showEditMessage) {
      setTempInput(editMessage?.current.result?.text);
    } else {
      setTempInput("");
    }
  }, [showEditMessage]);

  useEffect(() => {
    setTempInput("");
  }, [chatIndex]);

  const getInputDisabled = () => {
    if (showEditMessage) {
      return !isInputValid(tempInput);
    } else if (showRefreshIcon) {
      return false;
    } else if (showLoadingIcon) {
      return true;
    } else if (!isInputValid(tempInput)) {
      return true;
    }
    return false;
  };

  const getInputOnPress = () => {
    setError(false);
    if (showEditMessage) {
      setShowEditMessage(false);
      onSubmit();
    } else if (isInputValid(tempInput)) {
      onSubmit();
    } else if (showRefreshIcon) {
      setRetry({ ...result[0], isError: false });
    }
  };

  const inputContainer = (
    <View style={styles.inputContainer(theme)}>
      <View style={{ flex: 1, paddingTop: 12, paddingBottom: 12 }}>
        <TextInput
          ref={textInputRef}
          keyboardAppearance={theme === getTheme("dark") ? "dark" : "light"}
          placeholder={editable ? "Enter prompt" : "Regenerate response"}
          placeholderTextColor={theme.input.placeholderFontColor}
          style={styles.input(theme)}
          multiline={true}
          value={tempInput}
          editable={editable}
          onChangeText={(s) => setTempInput(s)}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          handleInput(tempInput);
          getInputOnPress();
          handleEditMessage(null);
          setTempInput("");
        }}
        style={[styles.button(color), getInputIconColor()]}
        disabled={getInputDisabled()}
      >
        {showInputIcon()}
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    setEditable(!!showEditMessage || !result[0]?.isError);
  }, [showEditMessage, result]);

  useEffect(() => {
    if (editable && !!showEditMessage) {
      textInputRef.current.focus();
    }
  }, [editable, showEditMessage]);

  return (
    <View style={{ zIndex: 6 }}>
      <View
        style={[
          styles.inputBottomBackground(theme),
          { height: height / 2 + 4, width: windowWidth - 8 },
        ]}
      />
      <View style={styles.container} onLayout={(event) => onLayout(event)}>
        <View
          style={[
            { overflow: "hidden", borderRadius: 24 },
            showEditMessage && { backgroundColor: theme.backgroundColor },
          ]}
        >
          <BlurView
            style={{ flexDirection: "row", alignItems: "center" }}
            tint={theme === getTheme("dark") ? "dark" : "light"}
            intensity={100}
          >
            {inputContainer}
          </BlurView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBottomBackground: (theme) => ({
    position: "absolute",
    backgroundColor: theme.backgroundColor,
    bottom: 0,
  }),
  container: {
    // paddingTop: 8,
    paddingBottom: 8,
    paddingHorizontal: 16,
    position: "absolute",
    width: "100%",
    bottom: 0,
    overflow: "hidden",
  },
  inputContainer: (theme) => ({
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    // backgroundColor: theme.input.backgroundColor,
    flex: 1,
    maxHeight: 120,
    borderRadius: 24,
  }),
  button: (color) => ({
    backgroundColor: color,
    borderRadius: "50%",
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    marginVertical: 4,
    marginRight: 4,
  }),

  input: (theme) => ({
    fontSize: 16,
    lineHeight: 18,
    marginLeft: 12,
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 8,
    color: theme.input.fontColor,
  }),
});
