import React from "react";
import "../../scss/pick.scss";
import useGenerateNumbers from "client/src/hook/pick/useGenerateNumbers";
import NumberList from "client/src/components/pick/NumbersList";
import OptionSelector from "client/src/components/pick/OptionSelector";
import useLottoOptions from "client/src/hook/pick/useLottoOptions";
import useBuyModal from "client/src/hook/pick/useBuyModal";
import BuyModal from "client/src/components/content/Pick/BuyModal";
import useGeneratePaidNumbers from "client/src/hook/pick/useGeneratePaidNumbers";
import ErrorMessage from "client/src/components/common/atoms/error/ErrorMessage";

const Pick: React.FC = () => {
  const { numberListRef: freeNumberListRef, generateNumbers } =
    useGenerateNumbers();
  const { selectedOption, handleOptionChange } = useLottoOptions();
  const { isPayActive, closePayModal, handleBuyModal } = useBuyModal();
  const {
    numberListRef: paidNumberListRef,
    generatePaidNumbers,
    error,
  } = useGeneratePaidNumbers();

  const handleClick = async () => {
    if (selectedOption === "unique") {
      handleBuyModal();
    } else {
      await generateNumbers(selectedOption); // 무료 옵션일 경우 바로 번호 생성
    }
  };

  return (
    <div id="number">
      <div id="number__header">
        <header>번호 생성</header>
      </div>
      <OptionSelector
        selectedOption={selectedOption}
        onChange={handleOptionChange}
      />
      <NumberList
        numberListRef={
          selectedOption === "unique" ? paidNumberListRef : freeNumberListRef
        }
      />
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <input
        type="button"
        value="번호 생성"
        id="create"
        onClick={handleClick}
      />
      {/* 결제 모달 */}
      <BuyModal
        isActive={isPayActive}
        closeModal={closePayModal}
        generatePaidNumbers={generatePaidNumbers}
      />
    </div>
  );
};

export default Pick;
