/**
 * Fortune API 응답 형식
 * 
 * @interface
 * @property {string} content 운세 내용
 * @property {string | null} refusal 거절 사유 (있을 경우)
 * @property {string} role AI 역할 (assistant 등)
 * @property {string | null} function_call 함수 호출 정보 (있을 경우)
 * @property {string | null} tool_calls 도구 호출 정보 (있을 경우)
 * @date 2024.09.23
 */
export interface FortuneResponse {
    fortune: {
      content: string;
      refusal: string | null;
      role: string;
      function_call: string | null;
      tool_calls: string | null;
    };
  }

  export interface ErrorResponse {
    error:{
      message:string;
      status:number;
    }
  }