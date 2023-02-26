import {
  StyleSheet,
  View,
  TouchableOpacity,
  TextInput,
  Dimensions,
} from "react-native";
import { BlurView } from "expo-blur";
import { useEffect } from "react";
import { Send, Refresh, Loading, Close } from "../icons";
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
  setError,
  setRetry,
  setEditMessage,
}) => {
  const windowWidth = Dimensions.get("window").width;
  const showSendIcon = isResultValid;
  const showRefreshIcon =
    (!isResultValid && !loading && result?.length > 0) || error;
  const showLoadingIcon = loading;

  const showInputIcon = () => {
    if (showRefreshIcon) {
      return <Refresh width="18px" height="18px" stroke="#fff" />;
    } else if (showLoadingIcon) {
      return <Loading width="18px" height="18px" stroke="#fff" />;
    } else if (showSendIcon) {
      return <Send width="18px" height="18px" stroke="#fff" />;
    }
    return <Send width="18px" height="18px" stroke="#fff" />;
  };
  const getInputIconColor = () => {
    if (showLoadingIcon || (result?.length == 0 && !isResultValid)) {
      return { backgroundColor: "#A3A3A3" };
    } else if (showRefreshIcon || showSendIcon) {
      return {};
    }
    return {};
  };

  const getInputDisabled = () => {
    if (showRefreshIcon && error) {
      return false;
    } else if (showLoadingIcon || error) {
      return true;
    } else if (showRefreshIcon || showSendIcon) {
      return false;
    }
    return false;
  };

  const getInputOnPress = () => {
    if (showRefreshIcon && !result[0]?.isInput) {
      setRegen(true);
      setError(false);
    } else if (showRefreshIcon) {
      setRetry({ ...result[0], isError: false });
      setError(false);
    } else if (isResultValid) {
      onSubmit();
    }
  };

  return (
    <View>
      <View
        style={[
          styles.inputBottomBackground,
          { height: height / 2, width: windowWidth - 16 },
        ]}
      />
      <View style={styles.container} onLayout={(event) => onLayout(event)}>
        <View style={{ overflow: "hidden", borderRadius: 32 }}>
          <BlurView style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={styles.inputContainer}>
              {editMessage && (
                <TouchableOpacity
                  style={styles.closeIcon}
                  onPress={() => {
                    setEditMessage(null);
                    setInput("");
                  }}
                >
                  <Close width="18px" height="18px" />
                </TouchableOpacity>
              )}
              <View style={{ flex: 1, paddingTop: 12, paddingBottom: 12 }}>
                <TextInput
                  ref={textInputRef}
                  placeholder={error ? "Regenerate response" : "Enter prompt"}
                  style={[styles.input, editMessage ? {marginLeft: 8} : {}]}
                  multiline={true}
                  value={input}
                  editable={!error}
                  onChangeText={(s) => setInput(s)}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  getInputOnPress();
                  setEditMessage(null);
                }}
                style={[styles.button, getInputIconColor()]}
                disabled={getInputDisabled()}
              >
                {showInputIcon()}
              </TouchableOpacity>
            </View>
          </BlurView>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  inputBottomBackground: {
    position: "absolute",
    backgroundColor: "white",
    bottom: 0,
  },
  container: {
    paddingVertical: 16,
    paddingHorizontal: 16,
    position: "absolute",
    width: "100%",
    bottom: 0,
    overflow: "hidden",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingRight: 6,
    backgroundColor: "rgba(235, 235, 235,0.4)",
    flex: 1,
    maxHeight: 120,
    borderRadius: "50%",
  },
  button: {
    backgroundColor: "#10a37f",
    borderRadius: "50%",
    alignItems: "center",
    width: 32,
    height: 32,
    justifyContent: "center",
  },
  closeIcon: {
    borderRadius: "50%",
    alignItems: "center",
    marginLeft: 12,
  },
  input: {
    fontSize: 16,
    marginLeft: 16,
    alignItems: "center",
    paddingTop: 0,
    paddingBottom: 0,
    paddingRight: 6,
  },
});
