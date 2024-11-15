import React, { useEffect, useState } from "react";
import useJoinStatus from "../../pipes/joinStatus";
import { useRouter } from "next/router";
import JoinForm from "./JoinForm";
import joinRequest from "client/src/api/join/joinRequest";
import FetchApi from "client/src/api/lib/FetchApi";
import { ERROR_UNKNOWN } from "client/src/constants/error/errorMessage";

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
  });

  const [errors, setErrors] = useState<string[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);
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
    if (!status[0])
      newErrors.push("이름은 한글 2자 이상 또는 영문 8자 이상이어야 합니다.");
    if (!status[1]) newErrors.push("유효한 이메일 형식이 아닙니다.");
    if (!status[2])
      newErrors.push(
        "비밀번호는 8자 이상이어야 하며, 대소문자, 숫자, 특수문자가 포함되어야 합니다.",
      );
    if (!status[3]) newErrors.push("비밀번호 확인이 일치하지 않습니다.");

    setErrors(newErrors);
    setServerError(null); // 서버 에러 초기화

    if (newErrors.length === 0) {
      try {
        const response = await joinRequest(formData);

        if (!response.error) {
          router.push("/Login");
        } else {
          setServerError(response.error || "회원가입 실패");
        }
      } catch (error) {
        console.error("회원가입 중 오류 발생:", error);
        setServerError(ERROR_UNKNOWN);
      }
    }
  };

  return (
    <JoinForm
      formData={formData}
      errors={errors}
      serverError={serverError}
      status={status}
      onInputChange={handleInputChange}
      onSubmit={handleSubmit}
    />
  );
};

export default JoinFormContainer;
