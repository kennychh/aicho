import { FlatList, View, Keyboard } from "react-native";
import { Message } from "./Message";
export const MessageList = ({ data, inputOffset }) => {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList
        inverted
        data={data}
        onScrollBeginDrag={Keyboard.dismiss}
        renderItem={({ item, index }) => <Message item={item} index={index} />}
        style={{
          paddingHorizontal: 24,
          overflow: "visible",
          marginBottom: inputOffset,
        }}
        keyExtractor={(item) => {
          return item.result.id;
        }}
      />
    </View>
  );
};
