import useApiRequest from "./api/useApiRequest";

export default () => {
  const { data, setData, loading, setLoading, error, setError } =
    useApiRequest();
};
