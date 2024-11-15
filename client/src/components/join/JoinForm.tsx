import React from "react";
import FormInput from "../common/FormInput";

/**
 * 24.08.08
 * @interface JoinFormProps
 * @property {formData} - 회원정보가 들어가야할 데이터
 * @property {errors} - 각 필드와 관련된 에러 메시지 배열
 * @property {serverError} - 서버에서 발생한 에러 메시지
 * @property {status} - 각 필드의 상태
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
  serverError: string | null;
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
  serverError,
  status,
  onInputChange,
  onSubmit,
}) => {
  return (
    <div className="card">
      <div className="card-content">
        <h1 className="title has-text-centered">회원가입</h1>
        <form id="join-form" onSubmit={onSubmit}>
          {/* 이름 입력 */}
          <FormInput
            label="이름"
            type="text"
            id="name"
            placeholder="이름 (한글 2자 이상 또는 영문 8자 이상)"
            minLength={2}
            value={formData.name}
            onChange={onInputChange}
            status={status[0]}
          />
          {errors[0] && <p className="help is-danger">{errors[0]}</p>}

          {/* 이메일 입력 */}
          <FormInput
            label="이메일"
            type="email"
            id="email"
            placeholder="이메일"
            value={formData.email}
            onChange={onInputChange}
            status={status[1]}
          />
          {errors[1] && <p className="help is-danger">{errors[1]}</p>}

          {/* 비밀번호 입력 */}
          <FormInput
            label="비밀번호"
            type="password"
            id="password"
            placeholder="비밀번호 (8자 이상, 대소문자, 숫자, 특수문자 포함)"
            minLength={8}
            value={formData.password}
            onChange={onInputChange}
            status={status[2]}
          />
          {errors[2] && <p className="help is-danger">{errors[2]}</p>}

          {/* 비밀번호 확인 입력 */}
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
          {errors[3] && <p className="help is-danger">{errors[3]}</p>}

          {/* 서버 에러 메시지 */}
          {serverError && (
            <div className="notification is-danger is-light mt-3">
              {serverError}
            </div>
          )}

          {/* 회원가입 버튼 */}
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
