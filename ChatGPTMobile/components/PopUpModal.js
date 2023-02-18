import {
  Modal,
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from "react-native";
import { Button } from "./Button";
import { useEffect, useState } from "react";

export const PopUpModal = ({
  animate,
  modalVisible,
  fadeAnim,
  slideAnim,
  setAnimate,
  setModalVisible,
  children,
  closeModal = false,
  setCloseModal,
  enableButton = true,
  props,
}) => {
  const [modalHeight, setModalHeight] = useState(0);
  const onLayout = (event) => {
    const { x, y, height, width } = event.nativeEvent.layout;
    setModalHeight(height);
  };

  const onPress = () => {
    setAnimate(false);
    setTimeout(() => {
      setModalVisible(false);
    }, 200);
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 0.7,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const fadeOut = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const slideUp = () => {
    Animated.timing(slideAnim, {
      toValue: -modalHeight,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.sin),
    }).start();
  };

  const slideDown = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 200,
      useNativeDriver: true,
      easing: Easing.inOut(Easing.sin),
    }).start();
  };

  useEffect(() => {
    if (closeModal) {
      onPress();
      setCloseModal(false);
    }
  }, [closeModal]);
  useEffect(() => {
    if (modalHeight != 0) {
      if (animate) {
        fadeIn();
        slideUp();
      } else {
        fadeOut();
        slideDown();
      }
    }
  }, [animate, modalHeight]);
  return (
    <View>
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={onPress}
        {...props}
      >
        <Animated.View style={[styles.container, { opacity: fadeAnim }]}>
          <TouchableOpacity
            style={{ width: "100%", height: "100%" }}
            onPress={onPress}
          ></TouchableOpacity>
        </Animated.View>
        <Animated.View
          onLayout={(event) => onLayout(event)}
          style={[
            styles.modalView,
            { transform: [{ translateY: slideAnim }], bottom: -modalHeight },
          ]}
        >
          <View style={styles.modalHeaderContainer}>
            <View style={styles.headerLine} />
          </View>
          {children}
          {enableButton && (
            <Button
              onPress={onPress}
              style={[styles.closeButtonContainer, { marginBottom: 24 }]}
              child={
                <View style={styles.closeButton}>
                  <View style={{ height: 24, justifyContent: "center" }}>
                    <Text style={{ fontSize: 16 }}>Close</Text>
                  </View>
                </View>
              }
            />
          )}
        </Animated.View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  closeButton: {
    paddingVertical: 16,
    alignSelf: "center",
  },
  closeButtonContainer: {
    marginTop: 16,
    backgroundColor: "#F6F6F6",
    width: "100%",
    borderRadius: 16,
  },
  headerLine: {
    width: 48,
    height: 2,
    borderWidth: 2,
    borderColor: "#D9D9D9",
    borderRadius: "50%",
  },
  modalHeaderContainer: {
    height: 16,
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  container: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "black",
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingBottom: 24,
    paddingTop: 8,
    alignItems: "center",
    width: "100%",
    position: "absolute",
  },
});
