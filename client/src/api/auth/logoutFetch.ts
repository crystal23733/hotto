/**
 * 24.08.06
 * @returns {response} - 로그아웃 요청
 */
export default async () => {
  try {
    const response = await fetch("http://localhost:8080/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    if (!response.ok) {
      throw new Error("로그아웃 요청이 실패했습니다");
    }
  } catch (error) {
    console.error("로그아웃 중 오류 발생:", error);
  }
};
