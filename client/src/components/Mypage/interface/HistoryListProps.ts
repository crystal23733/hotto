import { IHistoryItem } from "./IHistoryItem";

export default interface HistoryListProps {
  data: IHistoryItem[];
  loading: boolean;
  error: Error | null;
  type: "payment" | "order";
}
