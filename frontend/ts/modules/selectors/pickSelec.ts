// *pick페이지 셀렉터
const numberList = document.getElementById("number__list") as HTMLDivElement;

export const numberListArr: HTMLElement[] = Array.from(
  numberList?.children ?? [],
) as HTMLElement[];

export const createBtn = document.getElementById("create") as HTMLInputElement;
