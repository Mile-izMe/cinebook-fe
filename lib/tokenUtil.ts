import { jwtDecode } from "jwt-decode";

interface JwtPayload {
  exp: number;
}

export const isTokenExpiringSoon = (
  token: string,
  thresholdSeconds = 120,
): boolean => {
  try {
    const { exp } = jwtDecode<JwtPayload>(token);

    const now = Math.floor(Date.now() / 1000);

    return exp - now <= thresholdSeconds;
  } catch {
    return true;
  }
};
