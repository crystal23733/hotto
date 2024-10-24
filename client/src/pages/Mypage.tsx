import React from "react";
import "../scss/myPage.scss";
import MypageInfoContainer from "../components/Mypage/MypageInfoContainer";
import useModal from "../hook/Modal/useMyModal";
import MypageFormModal from "../components/Mypage/MypageFormModal";
import useTabSwitcher from "../hook/Mypage/useTabSwitcher";
import PaymentHistory from "../components/Mypage/PaymentHistory";

const Mypage: React.FC = () => {
  const { isActive, handleMypageModal, closeModal } = useModal();
  const { activeTab, handleTabChange } = useTabSwitcher<"payment" | "order">(
    "payment",
  );

  return (
    <div id="mypage-container">
      <div className="box" id="mypage-container__content">
        <MypageInfoContainer />
        <MypageFormModal isActive={isActive} closeModal={closeModal} />
        <div className="change-password-box">
          <button onClick={handleMypageModal}>비밀번호 변경</button>
        </div>
        <div className="tabs is-centered is-boxed">
          <ul>
            <li className={activeTab === "payment" ? "is-active" : ""}>
              <a onClick={() => handleTabChange("payment")}>결제 내역</a>
            </li>
            <li className={activeTab === "order" ? "is-active" : ""}>
              <a onClick={() => handleTabChange("order")}>주문 내역</a>
            </li>
          </ul>
        </div>
        <div className="tab-content">
          {activeTab === "payment" && <PaymentHistory />}
          {activeTab === "order" && <p>주문 내역이 여기 표시됩니다.</p>}
        </div>
      </div>
    </div>
  );
};

export default Mypage;
