import React from "react";

const MypageFormContainer: React.FC = () => {
  return (
    <form action="">
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className="input"
            type="password"
            placeholder="비밀번호를 입력해주세요"
          />
        </div>
      </div>
    </form>
  );
};

export default MypageFormContainer;
