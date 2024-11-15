import { useState } from "react";

/**
 * 입력 필드에서 애니메이션 효과를 주기 위한 커스텀 훅
 *
 * @returns {Object} shake 상태와 상태를 재설정하는 resetShake 함수
 */
export default () => {
  const [shake, setShake] = useState({
    oldPassword: false,
    newPassword: false,
    confirmPassword: false,
  });

  /**
   * 특정 입력 필드에 애니메이션 효과를 주고 지정된 시간 후에 초기화
   *
   * @param {string} field - 애니메이션을 적용할 필드 이름
   */
  const triggerShake = (field: keyof typeof shake) => {
    setShake((prev) => ({ ...prev, [field]: true }));
    setTimeout(() => {
      setShake((prev) => ({ ...prev, [field]: false }));
    }, 500); // 애니메이션 지속 시간
  };

  return { shake, triggerShake };
};
