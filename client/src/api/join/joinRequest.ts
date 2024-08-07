export default async (formData: {
  name: string;
  email: string;
  password: string;
  checkPassword: string;
  phone: string;
}) => {
  const response = await fetch("http://localhost:8080/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  if (!response.ok) {
    throw new Error("회원가입에 실패했습니다.");
  }

  return await response.json();
};
