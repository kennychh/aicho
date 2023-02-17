import { StyleSheet, View, Pressable, TextInput } from "react-native";

export const HeaderButton = ({ icon, onPress }) => {
  return <Pressable onPress={() => onPress ? onPress() : null}>{icon}</Pressable>;
};
