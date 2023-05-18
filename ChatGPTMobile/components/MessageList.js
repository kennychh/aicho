import { FlatList, View, Keyboard } from "react-native";
import { useRef } from "react";
import { Message } from "./Message";
import { getTheme } from "../theme";

export const MessageList = ({
  data,
  inputOffset,
  setMessage,
  regen,
  theme,
  color,
}) => {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList
        inverted
        data={data}
        keyboardShouldPersistTaps="always"
        onScrollBeginDrag={Keyboard.dismiss}
        indicatorStyle={theme == getTheme("dark") ? "white" : "black"}
        renderItem={({ item, index }) => (
          <Message
            item={item}
            index={index}
            setMessage={setMessage}
            regen={regen}
            theme={theme}
            color={color}
          />
        )}
        style={{
          paddingHorizontal: 16,
          overflow: "visible",
          marginBottom: inputOffset,
        }}
        keyExtractor={(item) => {
          return item?.result?.id;
        }}
      />
    </View>
  );
};
