import { FlatList, View } from "react-native";
import { Message } from "./Message";
export const MessageList = ({data}) => {
  return (
    <View style={{ flex: 1, width: "100%" }}>
      <FlatList
        inverted
        data={data}
        renderItem={({ item, index }) => <Message item={item} />}
        style={{ paddingHorizontal: 24,}}
        keyExtractor={(item) => {
          return item.result.id;
        }}
      />
    </View>
  );
};
