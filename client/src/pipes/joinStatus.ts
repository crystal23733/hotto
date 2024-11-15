import { conditional } from "@shared/pipes/condition";
import { useState } from "react";

/**
 * 폼 데이터와 입력 필드의 유효성을 관리하는 커스텀 훅입니다.
 *
 * @param formData 입력 폼의 데이터 객체로, 각 필드의 값을 포함합니다.
 * @returns {Object} 상태와 핸들러 함수를 포함하는 객체입니다.
 * @returns {boolean[]} status - 각 입력 필드의 유효성 상태 배열입니다.
 * @returns {(name: string, value: string) => void} handleChange - 입력 필드의 변경을 처리하는 함수입니다.
 *
 * @date 24.08.08
 */
const useJoinStatus = (formData: Record<string, string>) => {
  const [status, setStatus] = useState([false, false, false, false]);
  /**
   * 입력 필드의 값을 변경하고 유효성을 업데이트하는 함수입니다.
   *
   * @param {string} name - 입력 필드의 이름 (예: "name", "email", "password", "checkPassword", "phone")
   * @param {string} value - 입력 필드의 새로운 값
   */
  const handleChange = (name: string, value: string) => {
    const newStatus = [...status];

    switch (name) {
      case "name":
        newStatus[0] = conditional.nameCon(value);
        break;
      case "email":
        newStatus[1] = conditional.emailCon(value);
        break;
      case "password":
        newStatus[2] = conditional.passwordLength(value);
        break;
      case "checkPassword":
        newStatus[3] = conditional.passwordCon(formData.password, value);
        break;
      default:
        break;
    }

    setStatus(newStatus);
  };

  return { status, handleChange };
};

export default useJoinStatus;
