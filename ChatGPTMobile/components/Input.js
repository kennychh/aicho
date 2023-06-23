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
import { useEffect, useState } from "react";
import { Send, Refresh, Loading, Close } from "../icons";
import { getTheme } from "../theme";
export const Input = ({
  textInputRef,
  input,
  setInput,
  onSubmit,
  loading,
  isResultValid,
  editMessage,
  onLayout,
  height,
  error,
  result,
  setRegen,
  setRegenIndex,
  setError,
  setRetry,
  setEditMessage,
  theme,
  color,
}) => {
  const windowWidth = Dimensions.get("window").width;
  const showSendIcon = isResultValid;
  const showRefreshIcon =
    (!isResultValid && !loading && result[0]?.isInput) || error;
  const showLoadingIcon = loading;
  const [editable, setEditable] = useState(!error);

  const showInputIcon = () => {
    if (showLoadingIcon) {
      return <ActivityIndicator size="small" color="#fff" />;
    } else if (editMessage) {
      return <Send width="20px" height="20px" stroke="#fff" />;
    } else if (showRefreshIcon) {
      return <Refresh width="20px" height="20px" stroke="#fff" />;
    } else if (showSendIcon) {
      return <Send width="20px" height="20px" stroke="#fff" />;
    }
    return <Send width="20px" height="20px" stroke="#fff" />;
  };
  const getInputIconColor = () => {
    if (showLoadingIcon || (!error && !isResultValid)) {
      return { backgroundColor: theme.input.button.disabled.backgroundColor };
    }
    return {};
  };

  const getInputDisabled = () => {
    if (editMessage) {
      return !isResultValid;
    } else if (showRefreshIcon && error) {
      return false;
    } else if (showLoadingIcon || error) {
      return true;
    } else if (showRefreshIcon) {
      return false;
    } else if (!isResultValid) {
      return true;
    }
    return false;
  };

  const getInputOnPress = () => {
    setError(false);
    if (editMessage) {
      onSubmit();
    } else if (showRefreshIcon) {
      setRetry({ ...result[0], isError: false });
    } else if (isResultValid) {
      onSubmit();
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
          value={input}
          editable={editable}
          onChangeText={(s) => setInput(s)}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          getInputOnPress();
          setEditMessage(null);
        }}
        style={[styles.button(color), getInputIconColor()]}
        disabled={getInputDisabled()}
      >
        {showInputIcon()}
      </TouchableOpacity>
    </View>
  );

  useEffect(() => {
    setEditable(!!editMessage || !error);
  }, [editMessage, error]);

  useEffect(() => {
    if (editable && !!editMessage) {
      textInputRef.current.focus();
    }
  }, [editable, editMessage]);

  return (
    <View style={{ zIndex: 6 }}>
      <View
        style={[
          styles.inputBottomBackground(theme),
          { height: height / 2 + 4, width: windowWidth - 16 },
        ]}
      />
      <View style={styles.container} onLayout={(event) => onLayout(event)}>
        <View
          style={[
            { overflow: "hidden", borderRadius: 24 },
            editMessage && { backgroundColor: theme.backgroundColor },
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
    marginLeft: 12,
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 8,
    color: theme.input.fontColor,
  }),
});
