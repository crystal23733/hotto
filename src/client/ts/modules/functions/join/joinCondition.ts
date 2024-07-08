export const conditional = {
  nameCon: (name:string):boolean => {
    if (name.length > 1) {
      if (name.length < 30) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  emailCon: (email:string):boolean => {
    if (
      email.endsWith(".com") ||
      email.endsWith(".co.kr") ||
      email.endsWith(".net")
    ) {
      return true;
    } else {
      return false;
    }
  },
  passwordLength: (pwd:string):boolean => {
    if (pwd.length > 4) {
      return true;
    } else {
      return false;
    }
  },
  passwordCon: (pwd:string, checkPwd:string) => {
    if (pwd === checkPwd) {
      return true;
    } else if (pwd !== checkPwd) {
      return false;
    }
  },
  phoneCon: (p:string):boolean => {
    if (p.length === 11) {
      if (p.startsWith("010")) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
};

export const joinCondition = {
  trueStatus: (statusArr:boolean[]) => {
    const isValue = (currentValue:boolean) => currentValue === true;
    console.log(statusArr.every(isValue));
    return statusArr.every(isValue);
  },
};
