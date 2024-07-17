// *이번주 번호 선택자 / this-week
const thisWeekNumber = document.getElementById(
  "this-week__number",
) as HTMLDivElement | null;

const numberAll = {
  homeNumber: Array.from(
    document.querySelectorAll("#this-week__number div"),
  ) as HTMLDivElement[],
};

type ThisNumber = {
  [key in "one" | "two" | "three" | "four" | "five" | "six" | "bonus"]:
    | HTMLDivElement
    | undefined;
};

const thisNumber: ThisNumber = {
  one: thisWeekNumber?.children[0] as HTMLDivElement | undefined,
  two: thisWeekNumber?.children[1] as HTMLDivElement | undefined,
  three: thisWeekNumber?.children[2] as HTMLDivElement | undefined,
  four: thisWeekNumber?.children[3] as HTMLDivElement | undefined,
  five: thisWeekNumber?.children[4] as HTMLDivElement | undefined,
  six: thisWeekNumber?.children[5] as HTMLDivElement | undefined,
  bonus: thisWeekNumber?.children[7] as HTMLDivElement | undefined,
};

export { thisWeekNumber, numberAll, thisNumber };
