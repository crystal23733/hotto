import React, { useState } from "react";

/**
 * LottoRoundSelect 컴포넌트에 전달되는 props 인터페이스
 * @typedef {Object} LottoRoundSelectProps
 * @property {function} onSelectRound - 회차 선택 시 호출되는 콜백 함수
 * @property {number} maxRound - 선택할 수 있는 최대 회차 번호
 */
interface IRoundSelectOption {
  onSelectRound: (round: string) => void;
  maxRound: number;
}

/**
 * LottoRoundSelect 컴포넌트
 *
 * 사용자가 특정 회차를 선택할 수 있는 드롭다운 메뉴를 제공하는 컴포넌트입니다.
 * maxRound 값에 따라 옵션을 동적으로 생성하며, 회차가 선택되면 onSelectRound 콜백 함수가 호출됩니다.
 *
 * @component
 * @param {LottoRoundSelectProps} props - 컴포넌트에 전달되는 props
 * @returns {JSX.Element} LottoRoundSelect 컴포넌트
 * @example
 * return (
 *   <LottoRoundSelect onSelectRound={(round) => console.log(round)} maxRound={1134} />
 * )
 */
const RoundSelectOption: React.FC<IRoundSelectOption> = ({
  onSelectRound,
  maxRound,
}) => {
  const [selectRound, setSelectRound] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  /**
   * handleChange - 사용자가 드롭다운에서 다른 회차를 선택할 때 호출되는 함수
   *
   * @param {React.ChangeEvent<HTMLSelectElement>} e - 드롭다운에서 발생한 change 이벤트 객체
   */
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value;
    setSelectRound(selectedValue);
    onSelectRound(selectedValue);
  };

  /**
   * handleSearchChange - 사용자가 검색 입력란에 텍스트를 입력할 때 호출되는 함수
   *
   * @param {React.ChangeEvent<HTMLInputElement>} e - 검색 입력란에서 발생한 change 이벤트 객체
   */
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // * 검색어에 따라 필터링 된 회차 목록을 생성
  const filteredRounds = [...Array(maxRound)]
    .map((_, index) => maxRound - index)
    .filter((roundNumber) =>
      roundNumber.toString().includes(searchTerm.trim()),
    );

  return (
    <div id="select-option-container">
      <div className="field">
        <label htmlFor="lottoRoundSearch" className="label">
          회차 검색
        </label>
        <div className="control">
          <input
            type="text"
            id="lottoRoundSearch"
            className="input"
            placeholder="찾고싶은 회차를 입력해주세요."
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </div>
      <div className="field">
        <label htmlFor="lottoRoundSelect">회차 선택</label>
        <div className="select">
          <select
            id="lottoRoundSelect"
            value={selectRound}
            onChange={handleChange}
          >
            <option value="">회차를 선택하세요.</option>
            {filteredRounds.map((roundNumber) => (
              <option value={`history${roundNumber}`} key={roundNumber}>
                {roundNumber} 회차
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default RoundSelectOption;
