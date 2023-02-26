import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Delete, Plus, Save, Edit } from "../icons";
import { Modalize } from "react-native-modalize";
export const MenuModal = ({ deleteConvo, modalizeRef, onClose, setChats }) => {
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
        <TouchableOpacity
          onPress={() => {
            onClose(modalizeRef);
            setChats((oldChats) => [...oldChats, []]);
          }}
        >
          <View style={styles.modalOption}>
            <Edit />
            <Text style={styles.modalOptionText}>Edit title</Text>
          </View>
        </TouchableOpacity>
        <View style={styles.modalOptionDivider} />
        <TouchableOpacity onPress={() => onClose(modalizeRef)}>
          <View style={styles.modalOption}>
            <Save />
            <Text style={styles.modalOptionText}>Pin conversation</Text>
          </View>
        </TouchableOpacity>
      </View>
      <View
        style={[
          styles.modalOptionsContainer,
          { marginTop: 16, marginBottom: 52 },
        ]}
      >
        <TouchableOpacity
          onPress={() => {
            deleteConvo();
            onClose(modalizeRef);
          }}
        >
          <View style={styles.modalOption}>
            <Delete stroke={"#FF0000"} />
            <Text style={[styles.modalOptionText, { color: "#FF0000" }]}>
              Delete conversation
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
    backgroundColor: "#DBDBDB",
  },
  modalOption: {
    width: "100%",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  modalOptionsContainer: {
    marginTop: 40,
    backgroundColor: "#EFEFEF",
    width: "100%",
    borderRadius: 16,
  },
});
