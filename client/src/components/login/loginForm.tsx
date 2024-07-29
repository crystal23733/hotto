import React, { useState } from "react";
import IInputFieldProps from "../interface/IInputFieldProps";
import InputField from "../inputField";

const LoginForm: React.FC = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  return (
    <form id="login-form">
      <InputField
        label="이메일"
        type="email"
        name="email"
        placeholder="이메일"
        value={formData.email}
      />
      <InputField
        label="로그인"
        type="password"
        name="password"
        placeholder="비밀번호"
        value={formData.password}
      />
      <input type="submit" value="로그인" />
    </form>
  );
};

export default LoginForm;
