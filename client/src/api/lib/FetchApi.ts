/**
 * @date 24.08.09
 * * API 요청을 처리하는 클래스
 */

export default class {
  private baseUrl: string;
  private defaultHeaders: object;

  /**
   * API 클라이언트 생성자 함수입니다.
   * @param {string} baseUrl - API의 기본 URL
   * @param {object} [defaultHeaders={}] - 기본 요청 헤더 (선택 사항)
   */
  constructor(
    baseUrl: string,
    defaultHeaders: object = { "Content-Type": "application/json" },
  ) {
    this.baseUrl = baseUrl;
    this.defaultHeaders = defaultHeaders;
  }

  /**
   * API 요청을 처리하는 메서드입니다.
   * @param {string} endpoint - API 요청 엔드포인트 (baseUrl 뒤에 붙습니다)
   * @param {string} method - HTTP 메서드 (GET, POST, etc.)
   * @param {object} [body] - 요청 본문 (선택 사항)
   * @param {object} [headers] - 추가 요청 헤더 (선택 사항)
   * @param {boolean} [credentials] - 쿠키 요청
   * @returns {Promise<any>} - 서버의 응답 데이터
   * @throws {Error} - 응답이 성공적이지 않을 경우 에러를 발생시킴
   */
  async request(
    endpoint: string,
    method: string,
    body?: object,
    headers?: object,
    credentials?: boolean,
  ): Promise<any> {
    try {
      const response = await fetch(this.baseUrl + endpoint, {
        method,
        headers: { ...this.defaultHeaders, ...headers },
        body: body ? JSON.stringify(body) : undefined,
        credentials: credentials ? "include" : "same-origin",
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "요청 실패");
      }
      return await response.json();
    } catch (error) {
      throw error;
    }
  }
}
