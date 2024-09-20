import urlJoin from "url-join";

export default (...path: string[]): string =>
  urlJoin(process.env.NEXT_PUBLIC_CONTENT_ENDPOINT as string, ...path);
