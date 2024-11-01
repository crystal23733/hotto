import OptionSelectorProps from "client/src/pipes/interface/optionSelector.interface";
import React from "react";

/**
 * 결제 모달창 옵션 컴포넌트
 * @param {selectedOption} string - 옵션 값
 * @param {(e: React.ChangeEvent<HTMLSelectElement>) => void} - 옵션 변경 이벤트
 * @returns {JSX.Element} - 결제 옵션 컴포넌트
 */
const PaymentLabel: React.FC<OptionSelectorProps> = ({
  selectedOption,
  onChange,
}) => {
  return (
    <>
      <label htmlFor="paymentOption" className="label">
        충전 금액
      </label>
      <div className="select">
        <select id="paymentOption" value={selectedOption} onChange={onChange}>
          <option value={3000}>3000원</option>
          <option value={5000}>5000원</option>
          <option value={10000}>10000원</option>
        </select>
      </div>
    </>
  );
};

export default PaymentLabel;
