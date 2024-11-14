import React from "react";

/**
 * FormInput 컴포넌트의 Props 인터페이스입니다.
 *
 * @interface FormInputProps
 *
 * @property {string} id - 입력 필드의 고유 ID입니다.
 * @property {string} type - 입력 필드의 타입 (예: "text", "password" 등)입니다.
 * @property {string} value - 입력 필드의 현재 값입니다.
 * @property {(e: React.ChangeEvent<HTMLInputElement>) => void} onChange - 입력 필드 값이 변경될 때 호출되는 함수입니다.
 * @property {string} placeholder - 입력 필드의 플레이스홀더 텍스트입니다.
 * @property {string} label - 입력 필드에 대한 레이블 텍스트입니다.
 * @property {number} [minLength] - (선택적) 비밀번호 입력 필드에서 최소 길이를 설정합니다.
 * @property {boolean} [required=true] - (선택적) 필수 입력 필드 여부를 설정합니다. 기본값은 true입니다.
 * @property {boolean} [status] - (선택적) 상태를 나타내는 boolean 값입니다. true인 경우 초록색, false인 경우 빨간색 배경이 표시됩니다.
 */
interface FormInputProps {
  id: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  label: string;
  minLength?: number; // optional prop for password input
  required?: boolean; // optional prop for required field
  status?: boolean; // optional prop for status indication
}

/**
 * 입력 필드를 렌더링하는 컴포넌트입니다.
 * 레이블, 플레이스홀더, 상태 등을 설정할 수 있으며, 입력 필드의 변경 이벤트를 처리하는 핸들러를 받습니다.
 *
 * @param {FormInputProps} props - 컴포넌트에 전달되는 속성입니다.
 * @param {string} props.id - 입력 필드의 고유 ID입니다.
 * @param {string} props.type - 입력 필드의 타입 (예: "text", "password" 등)입니다.
 * @param {string} props.value - 입력 필드의 현재 값입니다.
 * @param {(e: React.ChangeEvent<HTMLInputElement>) => void} props.onChange - 입력 필드 값이 변경될 때 호출되는 함수입니다.
 * @param {string} props.placeholder - 입력 필드의 플레이스홀더 텍스트입니다.
 * @param {string} props.label - 입력 필드에 대한 레이블 텍스트입니다.
 * @param {number} [props.minLength] - (선택적) 비밀번호 입력 필드에서 최소 길이를 설정합니다.
 * @param {boolean} [props.required=true] - (선택적) 필수 입력 필드 여부를 설정합니다. 기본값은 true입니다.
 * @param {boolean} [props.status] - (선택적) 상태를 나타내는 boolean 값입니다.
 *
 * @returns {JSX.Element} 렌더링된 입력 필드와 상태 표시 요소입니다.
 *
 * @date 24.08.08
 */
const FormInput: React.FC<FormInputProps> = ({
  id,
  type,
  value,
  onChange,
  placeholder,
  label,
  minLength,
  required = true,
  status,
}) => {
  return (
    <div className="field">
      <label className="label" htmlFor={id}>
        {label}
      </label>
      <div className="control">
        <input
          className={`input ${
            status !== undefined ? (status ? "is-success" : "is-danger") : ""
          }`}
          type={type}
          id={id}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          minLength={minLength}
          required={required}
          name={id}
        />
        {status !== undefined && (
          <span
            className={`icon ${status ? "has-text-success" : "has-text-danger"}`}
          >
            <i
              className={`fas ${status ? "fa-check" : "fa-exclamation-triangle"}`}
            ></i>
          </span>
        )}
      </div>
      {status === false && (
        <p className="help is-danger">올바른 형식이 아닙니다</p>
      )}
    </div>
  );
};

export default FormInput;
