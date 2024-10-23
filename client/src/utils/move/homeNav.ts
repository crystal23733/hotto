import { useRouter } from "next/router";

/**
 * 홈화면으로 리다이렉트 시켜주는 모듈
 */
export default () => {
  const router = useRouter();

  const handleHome = () => {
    router.push("/");
  };

  return { handleHome };
};
