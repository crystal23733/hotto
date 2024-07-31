/**
 * 입력 필드의 유효성을 검사하는 함수 모음입니다.
 */
export const conditional = {
  /**
   * 이름의 유효성을 검사합니다.
   * @param name 이름
   * @returns 유효성 여부
   */
  nameCon: (name: string): boolean => {
    const isEnglish = /^[A-Za-z]/.test(name);
    const isKorean = /^[가-힣]/.test(name);

    if (isEnglish) {
      return /^[A-Za-z]+$/.test(name) && name.length >= 8;
    } else if (isKorean) {
      return /^[가-힣]+$/.test(name) && name.length >= 2;
    } else {
      return false;
    }
  },
  /**
   * 이메일의 유효성을 검사합니다.
   * @param email 이메일
   * @returns 유효성 여부
   */
  emailCon: (email: string): boolean => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
    return emailRegex.test(email);
  },
  /**
   * 비밀번호 길이의 유효성을 검사합니다.
   * @param pwd 비밀번호
   * @returns 유효성 여부
   */
  passwordLength: (pwd: string): boolean => {
    return pwd.length > 4;
  },
  /**
   * 비밀번호와 확인 비밀번호의 일치 여부를 검사합니다.
   * @param pwd 비밀번호
   * @param checkPwd 확인 비밀번호
   * @returns 유효성 여부
   */
  passwordCon: (pwd: string, checkPwd: string): boolean => {
    return pwd === checkPwd;
  },
  /**
   * 전화번호의 유효성을 검사합니다.
   * @param p 전화번호
   * @returns 유효성 여부
   */
  phoneCon: (p: string): boolean => {
    return p.length === 11 && p.startsWith("010");
  },
};

/**
 * 상태 배열의 모든 값이 true인지 확인하는 함수입니다.
 * @param statusArr 상태 배열
 * @returns 모든 값이 true인지 여부
 */
export const joinCondition = {
  trueStatus: (statusArr: boolean[]): boolean => {
    return statusArr.every((status) => status);
  },
};
