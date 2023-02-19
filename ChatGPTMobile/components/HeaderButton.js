import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";

export const HeaderButton = ({ icon, onPress }) => {
  return (
    <TouchableOpacity onPress={() => (onPress ? onPress() : null)}>
      {icon}
    </TouchableOpacity>
  );
};
