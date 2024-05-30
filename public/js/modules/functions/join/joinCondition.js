export const conditional = {
  passwordCon : (pwd, checkPwd) => {
    if(pwd === checkPwd){
      return true;
    } else if(pwd !== checkPwd){
      return false;
    }
  }
}