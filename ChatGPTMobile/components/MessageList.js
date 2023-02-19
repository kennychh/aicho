import { FlatList, View, Keyboard } from "react-native";
import { Message } from "./Message";
export const MessageList = ({ data, inputOffset }) => {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList
        inverted
        data={data}
        onScrollBeginDrag={Keyboard.dismiss}
        contentContainerStyle={{ paddingTop: inputOffset }} 
        renderItem={({ item, index }) => <Message item={item} />}
        style={{ paddingHorizontal: 24 }}
        keyExtractor={(item) => {
          return item.result.id;
        }}
      />
    </View>
  );
};
