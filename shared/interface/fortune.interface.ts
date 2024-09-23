export default interface FortuneResponse {
    fortune: {
      content: string;
      refusal: string | null;
      role: string;
      function_call: string | null;
      tool_calls: string | null;
    };
  }