import { StyleSheet, View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Modal from "react-native-modal";

export const AlertModal = ({
  visible,
  setVisible,
  onPress,
  theme,
  title,
  subtext,
  buttonText,
}) => {
  return (
    <Modal
      isVisible={visible}
      animationIn={"fadeIn"}
      animationOut={"fadeOut"}
      animationInTiming={100}
      animationOutTiming={100}
      backdropTransitionOutTiming={0}
    >
      <View style={styles.modal}>
        <View style={styles.container(theme)}>
          <Text style={[styles.title(theme)]}>{title}</Text>
          <Text style={styles.subtext(theme)}>{subtext}</Text>
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
    lineHeight: 18,
    alignSelf: "center",
    // fontWeight: "500",
    color: theme.fontColor,
  }),
  subtext: (theme) => ({
    fontSize: 14,
    alignSelf: "center",
    color: theme.secondaryIconColor,
    paddingHorizontal: 16,
    paddingBottom: 32,
    textAlign: "center",
  }),
  title: (theme) => ({
    fontSize: 16,
    lineHeight: 18,
    alignSelf: "center",
    fontWeight: "600",
    color: theme.fontColor,
    paddingBottom: 16,
  }),
  button: (theme) => ({
    width: "100%",
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: theme.modal.divider.backgroundColor,
    borderTopWidth: 0.5,
  }),
  container: (theme) => ({
    backgroundColor: theme.modal.backgroundColor,
    borderRadius: 16,
    paddingTop: 32,
    width: 280,
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
  },
});
