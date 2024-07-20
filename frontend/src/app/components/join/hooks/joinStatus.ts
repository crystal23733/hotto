import { useState, useEffect } from 'react';
import { conditional } from './joinCondition';

/**
 * 폼 데이터와 상태를 관리하는 커스텀 훅입니다.
 * @param formData 입력 폼의 데이터
 * @returns status 상태 배열과 handleChange 함수
 */
const useJoinStatus = (formData: Record<string, string>) => {
  const [status, setStatus] = useState([false, false, false, false, false]);

  /**
   * 입력 필드의 변경을 처리하는 함수입니다.
   * @param name 입력 필드의 이름
   * @param value 입력 필드의 값
   */
  const handleChange = (name: string, value: string) => {
    let newStatus = [...status];

    switch (name) {
      case 'name':
        newStatus[0] = conditional.nameCon(value);
        break;
      case 'email':
        newStatus[1] = conditional.emailCon(value);
        break;
      case 'password':
        newStatus[2] = conditional.passwordLength(value);
        break;
      case 'checkPassword':
        newStatus[3] = conditional.passwordCon(formData.password, value);
        break;
      case 'phone':
        newStatus[4] = conditional.phoneCon(value);
        break;
      default:
        break;
    }

    setStatus(newStatus);
  };

  useEffect(() => {
    console.log('Status updated:', status);
  }, [status]);

  return { status, handleChange };
};

export default useJoinStatus;