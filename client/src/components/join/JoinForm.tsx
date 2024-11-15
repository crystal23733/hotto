import React from "react";
import FormInput from "../common/FormInput";
import ErrorMessage from "../common/atoms/error/ErrorMessage";

/**
 * 24.08.08
 * @interface JoinFormProps
 * @property {formData} - 회원정보가 들어가야할 데이터
 * @property {error} - 에러 내용
 * @property {status} - 상태
 * @property {(e) => void} onInputChange - input값을 바꿔주는 함수
 * @property {(e) => void} onSubmit - 입력하면 실행되는 함수
 */
interface JoinFormProps {
  formData: {
    name: string;
    email: string;
    password: string;
    checkPassword: string;
  };
  errors: string[];
  status: boolean[];
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

/**
 * 24.08.08
 * @returns {JSX.Element} - 회원가입 컴포넌트
 */
const JoinForm: React.FC<JoinFormProps> = ({
  formData,
  errors,
  status,
  onInputChange,
  onSubmit,
}) => {
  return (
    <div className="card">
      <div className="card-content">
        <h1 className="title has-text-centered">회원가입</h1>
        <form id="join-form" onSubmit={onSubmit}>
          <FormInput
            label="이름"
            type="text"
            id="name"
            placeholder="이름"
            minLength={2}
            value={formData.name}
            onChange={onInputChange}
            status={status[0]}
          />
          <FormInput
            label="이메일"
            type="email"
            id="email"
            placeholder="이메일"
            value={formData.email}
            onChange={onInputChange}
            status={status[1]}
          />
          <FormInput
            label="비밀번호"
            type="password"
            id="password"
            placeholder="비밀번호"
            minLength={5}
            value={formData.password}
            onChange={onInputChange}
            status={status[2]}
          />
          <FormInput
            label="비밀번호 확인"
            type="password"
            id="checkPassword"
            placeholder="비밀번호 확인"
            minLength={5}
            value={formData.checkPassword}
            onChange={onInputChange}
            status={status[3]}
          />
          {errors.length > 0 && (
            <div className="mt-3">
              {errors.map((error, index) => (
                <ErrorMessage key={index}>{error}</ErrorMessage>
              ))}
            </div>
          )}
          <div className="field mt-5">
            <div className="control">
              <button
                type="submit"
                className="button is-primary is-fullwidth"
                disabled={!status.every((s) => s)}
              >
                회원가입
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default JoinForm;
