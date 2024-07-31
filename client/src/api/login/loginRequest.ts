/**
 * * 로그인데이터
 * @param email
 * @param password
 * @return response.json
 */
export default async (email: string, password: string) => {
  try {
    const response = await fetch("http://localhost:8080/login", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData || "로그인 실패");
    }

    return await response.json();
  } catch (error) {
    throw error;
  }
};
