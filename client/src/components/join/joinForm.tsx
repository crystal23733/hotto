//todo 추후 mvvm방식으로 모듈화 필요

import React, { useState } from "react";
import useJoinStatus from "../../pipes/joinStatus";
import InputField from "../inputField";
import { useRouter } from "next/router";

const JoinForm: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    checkPassword: "",
    phone: "",
  });

  const [errors, setErrors] = useState<string[]>([]);

  const { status, handleChange } = useJoinStatus(formData);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    handleChange(name, value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // 기본 폼 제출 동작을 방지합니다.
    const newErrors: string[] = [];
    if (!status[0]) newErrors.push("아이디가 유효하지 않습니다.");
    if (!status[1]) newErrors.push("이메일이 유효하지 않습니다.");
    if (!status[2]) newErrors.push("비밀번호가 유효하지 않습니다.");
    if (!status[3]) newErrors.push("비밀번호 확인이 유효하지 않습니다.");
    if (!status[4]) newErrors.push("전화번호가 유효하지 않습니다.");

    setErrors(newErrors);

    if (newErrors.length === 0) {
      try {
        const response = await fetch("http://localhost:8080/join", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        const result = await response.json();

        if (response.ok && !result.error) {
          // 제출이 성공하고 서버에서 에러가 반환되지 않은 경우에만 다른 페이지로 리다이렉트합니다.
          router.push("/");
        } else {
          // 서버로부터의 에러 메시지를 설정합니다.
          setErrors([result.error || "Form submission failed"]);
        }
      } catch (error) {
        console.error("An error occurred during form submission:", error);
        setErrors(["An error occurred during form submission."]);
      }
    }
  };

  return (
    <form id="join-form" onSubmit={handleSubmit}>
      <InputField
        label="아이디"
        type="text"
        name="name"
        placeholder="아이디"
        minLength={2}
        value={formData.name}
        onChange={handleInputChange}
        status={status[0]}
      />
      <InputField
        label="이메일"
        type="email"
        name="email"
        placeholder="이메일"
        value={formData.email}
        onChange={handleInputChange}
        status={status[1]}
      />
      <InputField
        label="비밀번호"
        type="password"
        name="password"
        placeholder="비밀번호"
        minLength={5}
        value={formData.password}
        onChange={handleInputChange}
        status={status[2]}
      />
      <InputField
        label="비밀번호 확인"
        type="password"
        name="checkPassword"
        placeholder="비밀번호 확인"
        minLength={5}
        value={formData.checkPassword}
        onChange={handleInputChange}
        status={status[3]}
      />
      <InputField
        label="전화번호"
        type="text"
        name="phone"
        placeholder="전화번호"
        value={formData.phone}
        onChange={handleInputChange}
        status={status[4]}
      />
      <input type="submit" value="회원가입" />
      {errors.length > 0 && (
        <div>
          {errors.map((error, index) => (
            <p key={index} style={{ color: "red" }}>
              {error}
            </p>
          ))}
        </div>
      )}
    </form>
  );
};

export default JoinForm;
