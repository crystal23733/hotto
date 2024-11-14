import UseAlertModal from "client/src/hook/common/modal/interface/useAlertModal.interface";
import { useState, useEffect } from "react";

const useAlertModal = (): UseAlertModal => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  useEffect(() => {
    const modalLastClosed = localStorage.getItem("modalLastClosed");
    if (
      !modalLastClosed ||
      Date.now() - parseInt(modalLastClosed) > 24 * 60 * 60 * 1000
    ) {
      setIsModalVisible(true);
    }
  }, []);

  const handleModalClose = () => {
    setIsModalVisible(false);
  };

  const handleDoNotShowAgain = () => {
    localStorage.setItem("modalLastClosed", Date.now().toString());
    setIsModalVisible(false);
  };

  return { isModalVisible, handleModalClose, handleDoNotShowAgain };
};

export default useAlertModal;
