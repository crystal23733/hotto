import urlJoin from "url-join";

export default (...path: string[]): string =>
  urlJoin(process.env.NEXT_PUBLIC_API_ENDPOINT as string, ...path);
