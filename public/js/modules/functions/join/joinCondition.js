export const conditional = {
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
  }
}