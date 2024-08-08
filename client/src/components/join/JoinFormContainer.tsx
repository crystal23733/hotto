import React, { useState } from "react";
import useJoinStatus from "../../pipes/joinStatus";
import { useRouter } from "next/router";
import JoinForm from "./JoinForm";

/**
 * 24.08.08
 * @returns {JSX.Element} - 회원가입에 필요한 함수
 */
const JoinFormContainer: React.FC = () => {
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
    e.preventDefault();
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
          router.push("/");
        } else {
          setErrors([result.error || "Form submission failed"]);
        }
      } catch (error) {
        console.error("An error occurred during form submission:", error);
        setErrors(["An error occurred during form submission."]);
      }
    }
  };

  return (
    <JoinForm
      formData={formData}
      errors={errors}
      status={status}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
    />
  );
};

export default JoinFormContainer;
