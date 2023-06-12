import { Modal, StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export const AlertModal = ({
  visible,
  setVisible,
  onPress,
  theme,
  title,
  buttonText,
}) => {
  return (
    visible && (
      <View style={styles.centeredView}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={visible}
          onRequestClose={() => {
            setVisible(false);
          }}
        >
          <View style={styles.modal}>
            <View style={styles.container(theme)}>
              <Text style={[styles.title(theme)]}>{title}</Text>
              <TouchableOpacity onPress={onPress}>
                <View style={styles.button(theme)}>
                  <Text style={[styles.text(theme), { color: "#FF0000" }]}>
                    {buttonText}
                  </Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setVisible(false);
                }}
              >
                <View style={styles.button(theme)}>
                  <Text style={styles.text(theme)}>Cancel</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    )
  );
};

const styles = StyleSheet.create({
  childrenStyle: {},
  handleStyle: (theme) => ({
    width: 40,
    height: 4,
    backgroundColor: theme.modal.divider.backgroundColor,
  }),
  modalStyle: (theme) => ({
    paddingHorizontal: 16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: theme.modal.backgroundColor,
  }),
  text: (theme) => ({
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "500",
    color: theme.fontColor,
  }),
  title: (theme) => ({
    fontSize: 16,
    alignSelf: "center",
    fontWeight: "500",
    color: theme.fontColor,
    paddingBottom: 32,
  }),
  button: (theme) => ({
    width: "100%",
    paddingVertical: 16,
    paddingHorizontal: 64,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: theme.modal.divider.backgroundColor,
    borderTopWidth: 1,
  }),
  container: (theme) => ({
    backgroundColor: theme.modal.container.backgroundColor,
    borderRadius: 16,
    paddingTop: 32,
  }),
  modal: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
  },
  centeredView: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    margin: "auto",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
});
