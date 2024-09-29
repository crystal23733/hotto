import OptionSelectorProps from "@shared/interface/optionSelector.interface";
import React from "react";

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
          <option value="3000">3000원</option>
          <option value="5000">5000원</option>
          <option value="10000">10000원</option>
        </select>
      </div>
    </>
  );
};

export default PaymentLabel;
