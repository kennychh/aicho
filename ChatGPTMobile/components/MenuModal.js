import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Delete, Refresh } from "../icons";
import { Modalize } from "react-native-modalize";
export const MenuModal = ({ deleteConvo, modalizeRef, onClose }) => {
  return (
    <Modalize
      ref={modalizeRef}
      modalStyle={styles.modalStyle}
      handleStyle={styles.handleStyle}
      handlePosition={"inside"}
      childrenStyle={styles.childrenStyle}
      adjustToContentHeight={true}
    >
      <View style={styles.modalOptionsContainer}>
        <TouchableOpacity onPress={onClose}>
          <View style={styles.modalOption}>
            <Refresh />
            <Text style={styles.modalOptionText}>Regenerate Response</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.modalOptionDivider} />
        <TouchableOpacity
          onPress={() => {
            deleteConvo();
            onClose();
          }}
        >
          <View style={styles.modalOption}>
            <Delete stroke={"#FF0000"} />
            <Text style={[styles.modalOptionText, { color: "#FF0000" }]}>
              Delete Conversation
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </Modalize>
  );
};

const styles = StyleSheet.create({
  childrenStyle: {},
  handleStyle: {
    width: 40,
    height: 4,
    backgroundColor: "#D9D9D9",
  },
  modalStyle: {
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
  },
  modalOptionText: {
    paddingLeft: 16,
    fontSize: 16,
    alignSelf: "center",
  },
  modalOptionDivider: {
    width: "100%",
    height: 1,
    backgroundColor: "#e0e0e0",
  },
  modalOption: {
    width: "100%",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  modalOptionsContainer: {
    marginTop: 40,
    marginBottom: 52,
    backgroundColor: "#F6F6F6",
    width: "100%",
    borderRadius: 16,
  },
});
