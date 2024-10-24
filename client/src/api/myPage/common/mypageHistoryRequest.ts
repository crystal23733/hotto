import payServer from "client/src/module/payServer"
import FetchApi from "../../lib/FetchApi"

/**
 * 공통으로 데이터내역을 가져오는 api
 * @param {string} endpoint - 엔드포인트
 * @returns {Promise} API응답 결과
 */
export default <T>(endpoint:string) => {
  const fetchApi = new FetchApi<T>(payServer);
  return fetchApi.request(endpoint, "GET");
}