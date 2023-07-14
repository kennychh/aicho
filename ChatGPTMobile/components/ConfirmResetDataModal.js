import { useContext } from "react";
import { BottomModal } from "./BottomModal";
import { AppContext } from "../context";

export const ConfirmResetDataModal = ({}) => {
  const { theme, resetData, confirmResetVisible } = useContext(AppContext);
  return (
    <BottomModal
      visible={confirmResetVisible}
      onPress={resetData}
      theme={theme}
      title={"Reset data?"}
      buttonText={"Reset"}
      description={"This will reset your conversation and preference data."}
    />
  );
};
