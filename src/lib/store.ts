import { Cookies } from "typescript-cookie";

export function getCookies(key: string) {
  try {
    const serializedState: any = Cookies.get(key);

    if (!serializedState) return undefined;

    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

export function setCookies(key: string, state: string) {
  try {
    const serializedState = JSON.stringify(state);
    Cookies.set(key, serializedState);
  } catch (e) {}
}
