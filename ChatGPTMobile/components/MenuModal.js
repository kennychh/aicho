import { View, Text, StyleSheet } from "react-native";
import { useState, useEffect } from "react";
import { Delete, Refresh } from "../icons";
import { Button } from "./Button";
import { PopUpModal } from "./PopUpModal";
export const MenuModal = ({
  modalVisible,
  setModalVisible,
  fadeAnim,
  slideAnim,
  animate,
  setAnimate,
  deleteConvo,
}) => {
  const [closeModal, setCloseModal] = useState(false);
  return (
    <PopUpModal
      animate={animate}
      modalVisible={modalVisible}
      fadeAnim={fadeAnim}
      slideAnim={slideAnim}
      setAnimate={setAnimate}
      setModalVisible={setModalVisible}
      closeModal={closeModal}
      setCloseModal={setCloseModal}
      children={
        <View style={styles.modalOptionsContainer}>
          <Button
            onPress={closeModal}
            child={
              <View style={styles.modalOption}>
                <Refresh />
                <Text style={styles.modalOptionText}>Refresh Response</Text>
              </View>
            }
          />
          <View style={styles.modalOptionDivider} />
          <Button
            onPress={() => {
              deleteConvo();
              setCloseModal(true);
            }}
            child={
              <View style={styles.modalOption}>
                <Delete stroke={"#FF0000"} />
                <Text style={[styles.modalOptionText, { color: "#FF0000" }]}>
                  Delete Conversation
                </Text>
              </View>
            }
          />
        </View>
      }
    />
  );
};

const styles = StyleSheet.create({
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
    justifyContent: "center",
    padding: 16,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  modalOptionsContainer: {
    marginTop: 16,
    backgroundColor: "#F6F6F6",
    width: "100%",
    borderRadius: 16,
  },
});
