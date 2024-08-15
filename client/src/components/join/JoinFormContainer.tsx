import React, { useEffect, useState } from "react";
import useJoinStatus from "../../pipes/joinStatus";
import { useRouter } from "next/router";
import JoinForm from "./JoinForm";
import joinRequest from "client/src/api/join/joinRequest";
import FetchApi from "client/src/api/lib/FetchApi";

const fetchApi = new FetchApi(process.env.NEXT_PUBLIC_SERVER_URL as string);

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

  useEffect(() => {
    return () => {
      // 컴포넌트가 언마운트될 때 요청 취소
      fetchApi.abortRequest();
    };
  }, []);

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
        const response = await joinRequest(formData);

        if (!response.error) {
          router.push("/Login");
        } else {
          setErrors([response.error || "회원가입 실패"]);
        }
      } catch (error) {
        console.error("회원가입 중 오류 발생:", error);
        setErrors(["회원가입 중 오류가 발생했습니다."]);
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
