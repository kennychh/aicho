import { Pressable, View } from "react-native";
export const Button = ({ style, onPress, child }) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [pressed ? { opacity: 0.5 } : {}, style]}
    >
      {child}
    </Pressable>
  );
};
