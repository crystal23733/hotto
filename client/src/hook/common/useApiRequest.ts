import { useState } from "react";

interface IUseApiRequestResult<T> {
  data: T | null;
  loading: boolean;
  error : Error | null;
  setData : React.Dispatch<React.SetStateAction<T | null>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<Error | null>>;
}

/**
 * API 요청 시 공통으로 사용하는 상태(loading, error, data)를 관리하는 커스텀 훅
 * @returns {{data: T | null, loading: boolean, error: Error | null, setData: Function, setLoading: Function, setError: Function}}
 */
const useApiRequest = <T,>(): IUseApiRequestResult<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  return { data, loading, error, setData, setLoading, setError };
};

export default useApiRequest;