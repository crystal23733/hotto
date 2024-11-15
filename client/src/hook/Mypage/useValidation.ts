import { conditional } from "@shared/pipes/condition";
import { useState, useEffect } from "react";

/**
 * 비밀번호 유효성을 검사하는 커스텀 훅
 *
 * @param {string} changePassword - 새 비밀번호
 * @param {string} changePasswordConfirm - 새 비밀번호 확인
 * @returns {Object} 유효성 검사 상태 객체 { lengthValid, matchValid }
 */
export default (changePassword: string, changePasswordConfirm: string) => {
  const [validations, setValidations] = useState({
    lengthValid: false,
    matchValid: false,
  });

  useEffect(() => {
    setValidations({
      lengthValid: conditional.passwordComplexity(changePassword),
      matchValid: conditional.passwordCon(
        changePassword,
        changePasswordConfirm,
      ),
    });
  }, [changePassword, changePasswordConfirm]);

  return validations;
};
