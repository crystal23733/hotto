import { useState } from "react";

/**
 * 다양한 탭 전환을 위한 커스텀 훅
 *
 * @template T - 탭의 타입을 제네릭으로 지정
 * @param {T} initialTab - 초기 활성화 된 탭 값
 * @returns {object} - 현재 활성 탭과 탭 변경 함수
 */
export default <T extends string>(initialTab: T) => {
  const [activeTab, setActiveTab] = useState<T>(initialTab);

  /**
   * 탭을 변경하는 함수
   *
   * @param {T} tab - 전환할 탭 값
   */
  const handleTabChange = (tab: T) => {
    setActiveTab(tab);
  };
  return { activeTab, handleTabChange };
};
