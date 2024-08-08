/**
 * 24.08.06
 * @returns {response} - 세션 상태 확인
 */
export default async (): Promise<{ isAuthenticated: boolean }> => {
  const response = await fetch("http://localhost:8080/auth/status", {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("로그인 상태 확인 실패");
  }
  return await response.json();
};
