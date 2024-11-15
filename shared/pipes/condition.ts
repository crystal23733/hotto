/**
 * 입력 필드의 유효성을 검사하는 함수 모음입니다.
 */
export const conditional = {
  /**
   * 이름의 유효성을 검사하고 인젝션 공격을 방지합니다.
   * 특수 문자가 포함되지 않고 영문 또는 한글로만 이루어진 이름이어야 합니다.
   * @param name 이름
   * @returns 유효성 여부
   */
  nameCon: (name: string): boolean => {
    const isEnglish = /^[A-Za-z]+$/.test(name);
    const isKorean = /^[가-힣]+$/.test(name);
    const hasNoSpecialChars = /^[A-Za-z가-힣]+$/.test(name); // 특수 문자 금지

    if (!hasNoSpecialChars) {
      return false;
    }

    if (isEnglish) {
      return name.length >= 8;
    } else if (isKorean) {
      return name.length >= 2;
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
   * 비밀번호의 복잡성을 검사합니다. 비밀번호는 최소 8자 이상이어야 하며, 
   * 대문자, 소문자, 숫자, 특수 문자가 하나씩 포함되어야 합니다.
   * @param pwd 비밀번호
   * @returns 유효성 여부
   */
  passwordComplexity: (pwd: string): boolean => {
    const hasUpperCase = /[A-Z]/.test(pwd);     // 대문자
    const hasLowerCase = /[a-z]/.test(pwd);     // 소문자
    const hasNumber = /\d/.test(pwd);           // 숫자
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(pwd); // 특수문자
    const isValidLength = pwd.length >= 8;      // 최소 길이

    return hasUpperCase && hasLowerCase && hasNumber && hasSpecialChar && isValidLength;
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