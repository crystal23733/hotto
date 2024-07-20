import React, { useState } from 'react';
import useJoinStatus from './hooks/joinStatus';
import InputField from './inputField';

const JoinForm: React.FC = () => {
  // useState 훅을 사용하여 폼 데이터를 관리합니다.
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    checkPassword: '',
    phone: '',
  });

  // 커스텀 훅을 사용하여 입력 값의 유효성을 검사하고 상태를 업데이트합니다.
  const { status, handleChange } = useJoinStatus(formData);

  // 폼 제출을 처리하는 함수입니다.
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (status.every(s => s)) {
      console.log('Form submitted successfully');
      // handle form submission
    } else {
      console.error('Form has errors');
    }
  };

  // 입력 필드의 변경을 처리하는 함수입니다.
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    handleChange(name, value);
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
    </form>
  );
};

export default JoinForm;