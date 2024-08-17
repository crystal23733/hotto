import urlJoin from "url-join";

export default (...path: string[]): string =>
  urlJoin(process.env.NEXT_PUBLIC_AUTH_ENDPOINT as string, ...path);