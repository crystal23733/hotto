import React from "react";
import "../../scss/pick.scss";
import useGenerateNumbers from "client/src/hook/pick/useGenerateNumbers";
import NumberList from "client/src/components/pick/NumbersList";
import OptionSelector from "client/src/components/pick/OptionSelector";
import useLottoOptions from "client/src/hook/pick/useLottoOptions";
import Loading from "client/src/components/common/Loading";
import useBuyModal from "client/src/hook/pick/useBuyModal";
import BuyModal from "client/src/components/content/Pick/BuyModal";

const Pick: React.FC = () => {
  const { numberListRef, generateNumbers, error, loading } =
    useGenerateNumbers();
  const { selectedOption, handleOptionChange } = useLottoOptions();
  const { isPayActive, closePayModal, handleBuyModal } = useBuyModal();

  const handleClick = async () => {
    if (selectedOption === process.env.NEXT_PUBLIC_API_UNIQUE_ENDPOINT) {
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
      {error && <div className="error-message">{error}</div>}
      {loading && <Loading />}
      <NumberList numberListRef={numberListRef} />
      <input
        type="button"
        value="번호 생성"
        id="create"
        onClick={handleClick}
      />
      {/* 결제 모달 */}
      <BuyModal isActive={isPayActive} closeModal={closePayModal} />
    </div>
  );
};

export default Pick;
