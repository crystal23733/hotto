export const conditional = {
  nameCon : (name) => {
    if(name.length > 1){
      if(name.length < 10){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
  emailCon : (email) => {
    if(email.endsWith('.com') || email.endsWith('.co.kr') || email.endsWith('.net')){
      return true;
    } else {
      return false;
    }
  },
  passwordLength : (pwd) => {
    if(pwd.length > 4){
      return true;
    } else {
      return false;
    }
  },
  passwordCon : (pwd, checkPwd) => {
    if(pwd === checkPwd){
      return true;
    } else if(pwd !== checkPwd){
      return false;
    }
  },
  phoneCon : (p) => {
    if(p.length === 11){
      if(p.startsWith('010')){
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  },
}